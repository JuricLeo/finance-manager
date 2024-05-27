import create from 'zustand';

interface CurrencyState {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
}

const useCurrencyStore = create<CurrencyState>((set) => ({
  selectedCurrency: localStorage.getItem('selectedCurrency') || '$',
  setSelectedCurrency: (currency) => {
    set({ selectedCurrency: currency });
    localStorage.setItem('selectedCurrency', currency);
  },
}));

export default useCurrencyStore;
