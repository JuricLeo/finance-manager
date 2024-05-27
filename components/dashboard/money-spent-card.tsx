"use client";

import useCurrencyStore from "@/store/useCurrencyStore";

interface MoneySpentCardProps {
  date: string;
  amount: number;
}

export default function MoneySpentCard({ date, amount }: MoneySpentCardProps) {
  const currency = useCurrencyStore((state) => state.selectedCurrency);

  return (
    <div className="text-lg items-center xl:items-start flex flex-1 p-6 h-40 shadow-xl rounded-md bg-gradient-to-r from-primary/40 to-primary/20">
      <p>
        Total money spent this <span>{date}</span>:
      </p>
      <div className="mt-auto ml-auto">
        <p className="text-3xl text-[#d19b45] dark:text-[#E8B86B]">{amount} {currency}</p>
      </div>
    </div>
  );
}
