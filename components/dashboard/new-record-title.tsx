import axios from "axios";
import { useEffect, useState } from "react";

interface NewRecordTitleProps {
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

export default function NewRecordTitle({ fetchExpenses, currency }: NewRecordTitleProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await axios.get("/api/expense");
        setExpenses(response.data);
      } catch (error) {
        console.log("Error fetching expenses: ", error);
      }
    }

    fetchExpenses();
  }, [fetchExpenses]);

  const totalExpenses = () => {
    const today = new Date().toISOString().slice(0, 10);
    const todayExpenses = expenses.filter(
      (expense) => expense.date.slice(0, 10) === today
    );
    const total = todayExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );

    return total;
  };

  return (
    <div>
      <h2 className="text-center text-xl">Add a new expense</h2>
      <div className="text-center mt-12 flex items-center justify-center gap-x-4">
        <h2 className="text-muted-foreground">Total expenses today:</h2>
        <div className="flex gap-x-2 text-4xl text-[#d19b45] dark:text-[#E8B86B]">
          <h2>{totalExpenses()}</h2>
          <p>{currency}</p>
        </div>
      </div>
    </div>
  );
}
