"use client";

import useCurrencyStore from "@/store/useCurrencyStore";
import useLanguageStore from "@/store/useLanguageStore";

interface MoneySpentCardProps {
  date: string;
  amount: number;
}

export default function MoneySpentCard({ date, amount }: MoneySpentCardProps) {
  const currency = useCurrencyStore((state) => state.selectedCurrency);

  const { t } = useLanguageStore();

  return (
    <div className="xl:items-start flex items-center flex-1 p-6 h-40 shadow-xl rounded-md bg-gradient-to-r from-primary/40 to-primary/20">
      <p className="text-md md:text-lg w-28 md:w-auto">
        {t("dashboard-card-message")} <span>{date}</span>:
      </p>
      <div className="ml-auto xl:mt-auto whitespace-nowrap">
        <p className="text-3xl text-[#d19b45] dark:text-[#E8B86B]">{Number(amount.toPrecision(4))} {currency}</p>
      </div>
    </div>
  );
}
