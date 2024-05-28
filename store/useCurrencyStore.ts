import { create } from "zustand";

interface CurrencyState {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
}

const useCurrencyStore = create<CurrencyState>((set) => {
  // Default to "$" initially to prevent mismatch during SSR
  let initialCurrency = "$";

  // Function to update the currency once we're on the client
  const updateCurrencyFromLocalStorage = () => {
    const storedCurrency = localStorage.getItem("selectedCurrency") || "$";
    set({ selectedCurrency: storedCurrency });
  };

  // Check if window is defined (i.e., if we are running on the client side)
  if (typeof window !== "undefined") {
    // Run the update function immediately
    updateCurrencyFromLocalStorage();

    // Also run the update function on subsequent renders to ensure it stays in sync
    window.addEventListener('storage', updateCurrencyFromLocalStorage);
  }

  return {
    selectedCurrency: initialCurrency,
    setSelectedCurrency: (currency) => {
      set({ selectedCurrency: currency });
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedCurrency", currency);
      }
    },
  };
});

export default useCurrencyStore;
