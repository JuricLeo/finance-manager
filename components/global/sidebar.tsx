"use client";

import Image from "next/image";
import { BarChart3, Layout, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!isMounted) {
    return null;
  }

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      icon: Layout,
    },
    {
      href: "/analytics",
      label: "Analytics",
      icon: BarChart3,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="shadow-sm border-r h-full">
      <Image
        width={150}
        height={150}
        alt="Logo"
        src="/logo.svg"
        className="m-auto mt-6"
      />
      <nav className="mt-8">
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.href}
            className={cn(
              "flex gap-x-2 p-6", 
              pathname === route.href ? "border-r-4 border-primary bg-primary/30" : ""
            )}
          >
            <route.icon />
            <span>{route.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
