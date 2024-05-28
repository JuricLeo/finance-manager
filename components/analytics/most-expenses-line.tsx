"use client";

import "chart.js/auto";
import useCurrencyStore from "@/store/useCurrencyStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

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

  const groupExpensesByDay = (expenses: Expense[]) => {
    const groupedExpenses: { [key: string]: number } = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const day = date.toLocaleDateString("en-US", { weekday: "long", day: "2-digit" });

      if (groupedExpenses[day]) {
        groupedExpenses[day] += expense.amount;
      } else {
        groupedExpenses[day] = expense.amount;
      }
    });

    return groupedExpenses;
  };

  const currency = useCurrencyStore((state) => state.selectedCurrency);

  const groupedExpenses = groupExpensesByDay(expenses);

  const getLast7Days = () => {
    const result = [];
    const today = new Date();
    for (let i = 7; i > 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      result.push(date.toLocaleDateString("en-US", { weekday: "long", day: "2-digit" }));
    }
    return result;
  };

  const last7Days = getLast7Days();

  const labels = last7Days.filter(day => groupedExpenses[day] !== undefined);
  const data = labels.map(day => groupedExpenses[day]);

  const chartData = {
    labels,
    datasets: [
      {
        label: `Total expenses of the day in ${currency}`,
        data,
        backgroundColor: [
          "#16a34a",
        ],
      },
    ],
  };

  return (
    <div className="w-full shadow-xl dark:bg-slate-950 rounded-md">
      <h1 className="p-8 lg:pl-8 lg:pt-8 text-xl">Total expenses in a day in the past 7 days:</h1>
      <div className="mx-auto p-12">
        <Line data={chartData} />
      </div>
    </div>
  );
}
