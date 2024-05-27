"use client";

import useLanguageStore from "@/store/useLanguageStore";
import { useUser } from "@clerk/nextjs";

export default function HelloUser() {
  const { user } = useUser();

  const { t } = useLanguageStore();

  return (
    <div>
      <h2 className="text-3xl">
        {t("dashboard-hello")}{" "}
        <span className="bg-gradient-to-r from-primary to-[#E8B86B] inline-block text-transparent bg-clip-text font-bold">
          {user?.firstName}
        </span>
        ,{t("dashboard-message")}
      </h2>
    </div>
  );
}
