"use client";

import "chart.js/auto";
import useCurrencyStore from "@/store/useCurrencyStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

interface Expense {
  id: string;
  amount: number;
  category: string;
}

interface CategoryExpenses {
  [key: string]: number;
}

export default function MostExpensesPie () {
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

  const categoryExpenses: CategoryExpenses = {};

  expenses.forEach((expense) => {
    const category = expense.category;
    if (categoryExpenses[category]) {
      categoryExpenses[category] += expense.amount;
    } else {
      categoryExpenses[category] = expense.amount;
    }
  });

  const labels = Object.keys(categoryExpenses);
  const data = Object.values(categoryExpenses);

  const currency = useCurrencyStore((state) => state.selectedCurrency);

  const chartData = {
    labels,
    datasets: [
      {
        label: `Amount of money spent in ${currency}`,
        data,
        backgroundColor: [
          "#16a34a",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };


  return (
    <div className="w-full shadow-xl dark:bg-slate-950 rounded-md">
      <h1 className="pl-8 pt-8 text-xl">Most expenses by category:</h1>
      <div className="w-[350px] md:w-[460px] mx-auto py-12">
        <Pie data={chartData} />
      </div>
    </div>
  );
};