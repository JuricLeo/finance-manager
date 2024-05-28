"use client";

import "chart.js/auto";
import useCurrencyStore from "@/store/useCurrencyStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import useLanguageStore from "@/store/useLanguageStore";

interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
}

export default function MostExpensesLine() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesResponse = await axios.get("/api/expense");
        setExpenses(expensesResponse.data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const groupExpensesByDate = (expenses: Expense[]) => {
    const groupedExpenses: { [key: string]: number } = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const formattedDate = date
        .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" })
        .replace(/\//g, "-");

      if (groupedExpenses[formattedDate]) {
        groupedExpenses[formattedDate] += expense.amount;
      } else {
        groupedExpenses[formattedDate] = expense.amount;
      }
    });

    return groupedExpenses;
  };

  const currency = useCurrencyStore((state) => state.selectedCurrency);

  const groupedExpenses = groupExpensesByDate(expenses);

  const getLast7Days = () => {
    const result = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      result.push(
        date
          .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" })
          .replace(/\//g, "-")
      );
    }
    return result;
  };

  const last7Days = getLast7Days();

  const labels = last7Days.filter(
    (date) => groupedExpenses[date] !== undefined
  );
  const data = labels.map((date) => groupedExpenses[date]);

  const { t } = useLanguageStore();

  const chartData = {
    labels,
    datasets: [
      {
        label: `${t("line-label")} ${currency}`,
        data,
        backgroundColor: ["#16a34a"],
      },
    ],
  };

  return (
    <div className="w-full shadow-xl dark:bg-slate-950 rounded-md">
      <h1 className="p-8 lg:pl-8 lg:pt-8 text-xl">
        {t("total-expenses-category")}
      </h1>
      <div className="mx-auto p-12">
        <Line data={chartData} />
      </div>
    </div>
  );
}
