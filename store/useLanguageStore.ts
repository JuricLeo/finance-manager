import { create } from "zustand";

interface LanguageState {
  selectedLanguage: string;
  translations: Record<string, Record<string, string>>;
  setSelectedLanguage: (language: string) => void;
  t: (key: string) => string;
}

const useLanguageStore = create<LanguageState>((set) => {
  const translations = require("@/constants/languages.json");
  let initialLanguage = "en";

  const updateLanguageFromLocalStorage = () => {
    const storedLanguage = localStorage.getItem("selectedLanguage") || "en";
    set({ selectedLanguage: storedLanguage });
  };

  if (typeof window !== "undefined") {
    updateLanguageFromLocalStorage();

    window.addEventListener('storage', updateLanguageFromLocalStorage);
  }

  return {
    selectedLanguage: initialLanguage,
    translations: translations,
    setSelectedLanguage: (language) => {
      set({ selectedLanguage: language });
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedLanguage", language);
      }
    },
    t: (key) => translations[initialLanguage][key] || key,
  };
});

export default useLanguageStore;
