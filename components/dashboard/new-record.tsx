"use client";

import { useState } from "react";
import AddNewRecord from "./add-new-record";
import NewRecordTitle from "./new-record-title";
import TodaysRecords from "./todays-records";

export default function NewRecord() {
  const [shouldRefreshExpenses, setShouldRefreshExpenses] = useState(false);

  const refreshExpenses = () => {
    setShouldRefreshExpenses(!shouldRefreshExpenses);
  };

  return (
    <div className="my-12 w-full rounded-sm bg-black/10 dark:bg-white/10 shadow-xl">
      <div className="py-12">
        <NewRecordTitle shouldRefreshExpenses={shouldRefreshExpenses} />
        <TodaysRecords shouldRefreshExpenses={shouldRefreshExpenses} />
        <AddNewRecord refreshExpenses={refreshExpenses} />
      </div>
    </div>
  );
}
