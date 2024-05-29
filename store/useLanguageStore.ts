import { create } from "zustand";

interface LanguageState {
  selectedLanguage: string;
  translations: Record<string, Record<string, string>>;
  setSelectedLanguage: (language: string) => void;
  t: (key: string) => string;
}

const useLanguageStore = create<LanguageState>((set) => {
  const translations = require("@/constants/languages.json");
  let selectedLanguage = localStorage.getItem("selectedLanguage") || "en";

  return {
    selectedLanguage,
    translations: translations,
    setSelectedLanguage: (language) => {
      selectedLanguage = language;
      set({ selectedLanguage: language });
      localStorage.setItem("selectedLanguage", language);
    },
    t: (key) => translations[selectedLanguage][key] || key,
  };
});

export default useLanguageStore;
