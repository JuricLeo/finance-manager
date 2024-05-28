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
  const { t } = useLanguageStore();
  const currency = useCurrencyStore((state) => state.selectedCurrency);

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

  const groupExpensesByDay = (expenses: Expense[]) => {
    const groupedExpenses: { [key: string]: number } = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const day = date.toISOString().split("T")[0];

      if (groupedExpenses[day]) {
        groupedExpenses[day] += expense.amount;
      } else {
        groupedExpenses[day] = expense.amount;
      }
    });

    return groupedExpenses;
  };

  const groupedExpenses = groupExpensesByDay(expenses);

  const getLast7Days = () => {
    const result = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      result.push(date.toISOString().split("T")[0]);
    }
    return result.reverse();
  };

  const last7Days = getLast7Days();

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: "long" };
    const dayName = date.toLocaleDateString("en-US", options);
    return t(dayName.toLowerCase());
  };

  const labels = last7Days.map(getDayName);
  const data = last7Days.map((day) => groupedExpenses[day] || 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${t("line-label")} ${currency}`,
        data,
        backgroundColor: "#16a34a",
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
