"use client";

interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
}

interface Category {
  name: string;
  emoji: string;
}

import useCurrencyStore from "@/store/useCurrencyStore";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ExpenseHistory() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get("api/category");
        const expensesResponse = await axios.get("/api/expense");
        setCategories(categoriesResponse.data);
        setExpenses(expensesResponse.data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const currency = useCurrencyStore((state) => state.selectedCurrency);

  const getCategoryEmoji = (categoryName: string) => {
    const matchedCategory = categories.find(
      (category) => category.name.toLowerCase() === categoryName.toLowerCase()
    );
    return matchedCategory ? matchedCategory.emoji : "✅";
  };

  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 7);

  const expensesLastThirtyDays = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= thirtyDaysAgo && expenseDate <= today;
  });

  return (
    <div className="shadow-xl dark:bg-slate-950 rounded-md">
      <h1 className="pl-8 pt-8 text-xl">
        History of expenses in the last 7 days:
      </h1>
      <div className="mx-auto py-12">
        {expensesLastThirtyDays.map((expense) => (
          <div className="flex items-center w-[26rem] mx-auto">
            <div className="flex mt-2 justify-center w-[24rem] mx-auto py-4 px-8 bg-black/15 dark:bg-white/15 rounded-sm">
              <div
                key={expense.id}
                className="flex justify-between w-full items-center"
              >
                <div className="flex items-center gap-x-4">
                  <p className="text-4xl">
                    {getCategoryEmoji(expense.category)}
                  </p>
                  <div className="flex flex-col">
                    <p className="capitalize">{expense.category}</p>
                    <p>{expense.date.split("T")[0]}</p>
                  </div>
                </div>
                <div className="flex items-center text-amber-500 text-3xl">
                  <p>{Number(expense.amount.toPrecision(4))}</p>
                  <p>{currency}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
