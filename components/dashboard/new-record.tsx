"use client";

import AddNewRecord from "./add-new-record";
import NewRecordTitle from "./new-record-title";
import TodaysRecords from "./todays-records";

interface NewRecordProps {
  fetchExpenses: () => void;
}

export default function NewRecord({ fetchExpenses }: NewRecordProps) {
  return (
    <div className="my-12 w-full rounded-sm bg-black/10 dark:bg-white/10 shadow-xl">
      <div className="py-12">
        <NewRecordTitle fetchExpenses={fetchExpenses} />
        <TodaysRecords fetchExpenses={fetchExpenses} />
        <AddNewRecord refreshExpenses={fetchExpenses} />
      </div>
    </div>
  );
}
