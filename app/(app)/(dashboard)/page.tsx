"use client";
import HelloUser from "@/components/dashboard/hello-user";
import MoneySpentCard from "@/components/dashboard/money-spent-card";
import NewRecord from "@/components/dashboard/new-record";
import useLanguageStore from "@/store/useLanguageStore";
import axios from "axios";
import { useEffect, useState } from "react";

interface Expense {
  id: string;
  userId: string;
  amount: number;
  category: string;
  date: string;
}

const DashboardPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("/api/expense");
      setExpenses(response.data);
    } catch (error) {
      console.log("Error fetching the expenses: ", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const weekExpenses = expenses.filter(
    (expense) =>
      new Date(expense.date) >= startOfWeek && new Date(expense.date) < today
  );
  const monthExpenses = expenses.filter(
    (expense) =>
      new Date(expense.date) >= startOfMonth && new Date(expense.date) < today
  );

  const weekTotal = weekExpenses.reduce((total, expense) => total + expense.amount, 0);
  const monthTotal = monthExpenses.reduce((total, expense) => total + expense.amount, 0);

  const { t } = useLanguageStore();

  return (
    <main className="p-8">
      <HelloUser />
      <div className="flex flex-col xl:flex-row mt-6 gap-y-6 gap-x-4">
        <MoneySpentCard date={t("dashboard-month")} amount={monthTotal} />
        <MoneySpentCard date={t("dashboard-week")} amount={weekTotal} />
      </div>
      <NewRecord fetchExpenses={fetchExpenses} />
    </main>
  );
};

export default DashboardPage;