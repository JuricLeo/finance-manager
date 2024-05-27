"use client";

import { UserButton } from "@clerk/nextjs";
import { BarChart3, Layout, Menu, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { cn } from "@/lib/utils";
import useLanguageStore from "@/store/useLanguageStore";

export default function Navbar() {
  const pathname = usePathname();

  const { t } = useLanguageStore();

  const routes = [
    {
      href: "/",
      label: t("dashboard"),
      icon: Layout,
    },
    {
      href: "/analytics",
      label: t("analytics"),
      icon: BarChart3,
    },
    {
      href: "/settings",
      label: t("settings"),
      icon: Settings,
    },
  ];

  const currentRoute = routes.find((route) => route.href === pathname);

  return (
    <header className="flex items-center h-20 px-8 justify-between shadow-sm border-b">
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="flex flex-col h-full">
            <SheetTitle className="mb-12">{t("navigation")}</SheetTitle>
            <SheetDescription className="flex flex-col h-full">
              <div className="flex-grow flex flex-col gap-y-6">
                {routes.map((route) => (
                  <Link
                    href={route.href}
                    key={route.href}
                    className={cn(
                      "flex items-center gap-x-2 py-6 pr-6",
                      pathname === route.href ? "border-r-2 border-primary" : ""
                    )}
                  >
                    <route.icon />
                    <span>{route.label}</span>
                  </Link>
                ))}
              </div>
              <p className="text-center">
                Copyright © 2024
                <br />
                Leopold Jurić
              </p>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <h1 className="text-xl font-bold">
        {currentRoute ? currentRoute.label : ""}
      </h1>
      <UserButton afterSignOutUrl="/landing" />
    </header>
  );
}
