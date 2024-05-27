"use client";

import { useEffect } from "react";
import { useState } from "react";
import useLanguageStore from "@/store/useLanguageStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const t = useLanguageStore.getState().t;

const languageOptions = [
  { label: `${t("croatian")} 🇭🇷`, value: "hr" },
  { label: `${t("english")} 🇺🇸`, value: "en" },
];

export default function ChangeLanguage() {
  const setSelectedLanguage = useLanguageStore(
    (state) => state.setSelectedLanguage
  );
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      const storedLanguage = localStorage.getItem("selectedLanguage");
      if (storedLanguage) {
        setSelectedLanguage(storedLanguage);
      }
      setInitialized(true);
    }
  }, [initialized, setSelectedLanguage]);

  const handleLanguageChange = (value: string) => {
    localStorage.setItem("selectedLanguage", value); 
    window.location.reload(); // for language and currency update
    setSelectedLanguage(value);
  };

  return (
    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {languageOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
