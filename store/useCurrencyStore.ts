import { create } from "zustand";

interface CurrencyState {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
}

const useCurrencyStore = create<CurrencyState>((set) => ({
  selectedCurrency:
    typeof window !== "undefined"
      ? localStorage.getItem("selectedCurrency") || "$"
      : "$",
  setSelectedCurrency: (currency) => {
    set({ selectedCurrency: currency });
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCurrency", currency);
    }
  },
}));

export default useCurrencyStore;
