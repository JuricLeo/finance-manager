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
    <div className="text-lg items-center xl:items-start flex flex-1 p-6 h-40 shadow-xl rounded-md bg-gradient-to-r from-primary/40 to-primary/20">
      <p>
        {t("dashboard-card-message")} <span>{date}</span>:
      </p>
      <div className="mt-auto ml-auto">
        <p className="text-3xl text-[#d19b45] dark:text-[#E8B86B]">{Number(amount.toPrecision(4))} {currency}</p>
      </div>
    </div>
  );
}
