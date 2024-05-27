"use client";

import useCurrencyStore from "@/store/useCurrencyStore";
import AddNewRecord from "./add-new-record";
import NewRecordTitle from "./new-record-title";
import TodaysRecords from "./todays-records";

interface NewRecordProps {
  fetchExpenses: () => void;
}

export default function NewRecord({ fetchExpenses }: NewRecordProps) {
  const currency = useCurrencyStore((state) => state.selectedCurrency);

  return (
    <div className="my-12 w-full rounded-sm bg-black/10 dark:bg-white/10 shadow-xl">
      <div className="py-12">
        <NewRecordTitle fetchExpenses={fetchExpenses} currency={currency} />
        <TodaysRecords fetchExpenses={fetchExpenses} currency={currency} />
        <AddNewRecord refreshExpenses={fetchExpenses} currency={currency} />
      </div>
    </div>
  );
}
