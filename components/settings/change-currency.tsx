import { useEffect } from 'react';
import { useState } from 'react';
import useCurrencyStore from '@/store/useCurrencyStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const currencyOptions = [
  { label: 'US Dollar ($)', value: '$' },
  { label: 'Euro (€)', value: '€' },
  { label: 'British Pound (£)', value: '£' },
];

export default function ChangeCurrency() {
  const setSelectedCurrency = useCurrencyStore((state) => state.setSelectedCurrency);
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      const storedCurrency = localStorage.getItem('selectedCurrency');
      if (storedCurrency) {
        setSelectedCurrency(storedCurrency);
      }
      setInitialized(true);
    }
  }, [initialized, setSelectedCurrency]);

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
  };

  return (
    <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        {currencyOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
