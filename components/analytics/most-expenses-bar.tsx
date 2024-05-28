"use client";

import "chart.js/auto";
import useCurrencyStore from "@/store/useCurrencyStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import useLanguageStore from "@/store/useLanguageStore";

interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
}

interface CategoryExpenses {
  [key: string]: number;
}

export default function MostExpensesBar() {
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

  const groupExpensesByDay = (expenses: Expense[]) => {
    const groupedExpenses: { [key: string]: Expense[] } = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const day = date.toLocaleDateString("en-US", { weekday: "long", day: "2-digit" });

      if (groupedExpenses[day]) {
        groupedExpenses[day].push(expense);
      } else {
        groupedExpenses[day] = [expense];
      }
    });

    return groupedExpenses;
  };

  const findHighestExpenseForEachDay = (groupedExpenses: {
    [key: string]: Expense[];
  }) => {
    const highestExpenses: { [key: string]: Expense } = {};

    Object.keys(groupedExpenses).forEach((day) => {
      const expenses = groupedExpenses[day];
      const highestExpense = expenses.reduce(
        (max, expense) => (expense.amount > max.amount ? expense : max),
        expenses[0]
      );
      highestExpenses[day] = highestExpense;
    });

    return highestExpenses;
  };

  expenses.forEach((expense) => {
    const category = expense.category;
    if (categoryExpenses[category]) {
      categoryExpenses[category] += expense.amount;
    } else {
      categoryExpenses[category] = expense.amount;
    }
  });

  const currency = useCurrencyStore((state) => state.selectedCurrency);

  const groupedExpenses = groupExpensesByDay(expenses);
  const highestExpenses = findHighestExpenseForEachDay(groupedExpenses);

  const { t } = useLanguageStore();

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

  const labels = last7Days.filter(day => highestExpenses[day] !== undefined);
  const data = labels.map(day => highestExpenses[day].amount);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${t("bar-label")} ${currency}`,
        data,
        backgroundColor: [
          "#16a34a",
        ],
      },
    ],
  };

  return (
    <div className="w-full shadow-xl dark:bg-slate-950 rounded-md">
      <h1 className="p-8 lg:pl-8 lg:pt-8 text-xl">{t("highest-expense")}</h1>
      <div className="mx-auto p-12">
        <Bar data={chartData} />
      </div>
    </div>
  );
}
