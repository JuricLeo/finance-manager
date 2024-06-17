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
import useLanguageStore from "@/store/useLanguageStore";
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
  today.setHours(0, 0, 0, 0);

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const expensesLastSevenDays = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= sevenDaysAgo && expenseDate <= today;
  });

  const { t } = useLanguageStore();

  return (
    <div className="shadow-xl dark:bg-slate-950 rounded-md">
      <h1 className="pl-4 pt-8 md:pl-8 md:pt-8 text-xl">{t("expense-history")}</h1>
      <div className="mx-auto py-12 px-2">
        {expensesLastSevenDays.map((expense) => (
          <div
            key={expense.id}
            className="w-full max-w-xs md:max-w-md lg:max-w-lg mx-auto"
          >
            <div className="flex mt-2 justify-center py-4 px-4 bg-black/15 dark:bg-white/15 rounded-sm">
              <div className="flex justify-between w-full items-center">
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
