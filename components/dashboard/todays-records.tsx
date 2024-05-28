"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import DeleteRecord from "./delete-record";

interface TodaysRecordsProps {
  fetchExpenses: () => void;
  currency: string;
}

interface Expense {
  id: string;
  userId: string;
  amount: number;
  category: string;
  date: string;
}

interface Category {
  name: string;
  emoji: string;
}

export default function TodaysRecords({
  fetchExpenses,
  currency,
}: TodaysRecordsProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await axios.get("/api/expense");
        setExpenses(response.data);
      } catch (error) {
        console.log("Error fetching expenses: ", error);
      }
    }

    async function fetchCategories() {
      try {
        const response = await axios.get("api/category");
        setCategories(response.data);
      } catch (error) {
        console.log("Error fetching categories: ", error);
      }
    }

    fetchExpenses();
    fetchCategories();
  }, [fetchExpenses]);

  const getCategoryEmoji = (categoryName: string) => {
    const matchedCategory = categories.find(
      (category) => category.name.toLowerCase() === categoryName.toLowerCase()
    );
    return matchedCategory ? matchedCategory.emoji : "✅";
  };

  const today = new Date().toISOString().split("T")[0];

  const date = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const todaysExpenses = expenses.filter(
    (expense) => expense.date.split("T")[0] === today
  );

  return (
    <div className="mt-12">
      {todaysExpenses.map((expense) => (
        <div className="flex items-center w-[26rem] mx-auto">
          <div className="flex mt-2 justify-center w-[24rem] mx-auto py-4 px-8 bg-black/15 dark:bg-white/15 rounded-sm">
            <div
              key={expense.id}
              className="flex justify-between w-full items-center"
            >
              <div className="flex items-center gap-x-4">
                <p className="text-4xl">{getCategoryEmoji(expense.category)}</p>
                <div className="flex flex-col">
                  <p className="capitalize">{expense.category}</p>
                  <p>{date(expense.date)}</p>
                </div>
              </div>
              <div className="flex items-center text-amber-500 text-3xl">
                <p>{Number(expense.amount.toPrecision(4))}</p>
                <p>{currency}</p>
              </div>
            </div>
          </div>
          <DeleteRecord
            expenseId={expense.id}
            onExpenseDeleted={fetchExpenses}
          />
        </div>
      ))}
    </div>
  );
}
