"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { DataTable } from "@/components/settings/data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import axios from "axios";
import ChangeCurrency from "@/components/settings/change-currency";
import useLanguageStore from "@/store/useLanguageStore";
import ChangeLanguage from "@/components/settings/change-language";

const SettingsPage = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/category");
      setCategories(response.data);
    } catch (error) {
      console.log("Error fetching the categories: ", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleNewCategoryAdded = () => {
    fetchCategories();
  };

  const handleCategoryUpdated = () => {
    fetchCategories();
  };

  const handleCategoryDeleted = () => {
    fetchCategories();
  };

  const { t } = useLanguageStore();

  return (
    <main className="p-8 space-y-6">
      <div className="flex items-center gap-x-2">
        <h2>{t("change-theme")}</h2>
        <ModeToggle />
      </div>
      <div className="flex items-center gap-x-2">
        <h2>{t("change-currency")}</h2>
        <ChangeCurrency />
      </div>
      <div className="flex items-center gap-x-2">
        <h2>{t("change-language")}</h2>
        <ChangeLanguage />
      </div>
      <div className="pt-4">
        <DataTable
          columns={columns({
            onCategoryUpdated: handleCategoryUpdated,
            onCategoryDeleted: handleCategoryDeleted,
          })}
          data={categories}
          onCategoryAdded={handleNewCategoryAdded}
        />
      </div>
    </main>
  );
};

export default SettingsPage;
