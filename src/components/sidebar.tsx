"use client";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Navigation } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavTypes {
  id: number;
  navs: string;
  href: string;
  icon: ReactNode;
}

const navLinks = [
  {
    id: 1,
    navs: "Dashboard",
    href: "/dashboard",
    icon: "",
  },
  {
    id: 2,
    navs: "Upload",
    href: "/upload",
    icon: "",
  },
  {
    id: 3,
    navs: "Invoice",
    href: "/invoice",
    icon: "",
  },
  {
    id: 4,
    navs: "Schedule",
    href: "/schedule",
    icon: "",
  },
  {
    id: 5,
    navs: "Calendar",
    href: "/calendar",
    icon: "",
  },
  {
    id: 6,
    navs: "Notification",
    href: "/notification",
    icon: "",
  },
  {
    id: 7,
    navs: "Settings",
    href: "/settings",
    icon: "",
  },
];

const Sidebar = () => {
  const activePath = usePathname();

  return (
    <>
      <div className="hidden lg:block w-1/5 min-h-screen p-6 border-r space-y-12">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            height={500}
            width={500}
            alt=""
            className="h-12 w-12"
          />
          <h1 className="text-xl font-semibold">Base</h1>
        </Link>
        <div className="flex flex-col gap-5">
          {navLinks.map((nav: NavTypes) => (
            <Link
              key={nav.id}
              href={nav.href}
              className={cn(
                "flex gap-1 p-3 max-w-52 rounded",
                activePath === nav.href
                  ? "bg-gradient-to-l from-indigo-500"
                  : ""
              )}
            >
              <h5>{nav.navs}</h5>
            </Link>
          ))}
        </div>
      </div>

      {/* mobile and tab view */}
      <div className="block lg:hidden absolute top-8 left-8">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-full min-h-screen border-r space-y-12"
          >
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                height={500}
                width={500}
                alt=""
                className="h-12 w-12"
              />
              <h1 className="text-xl font-semibold">Base</h1>
            </Link>
            <div className="flex flex-col gap-5">
              {navLinks.map((nav: NavTypes) => (
                <Link
                  key={nav.id}
                  href={nav.href}
                  className={cn(
                    "flex gap-1 p-3 max-w-52 rounded",
                    activePath === nav.href
                      ? "bg-gradient-to-l from-indigo-500"
                      : ""
                  )}
                >
                  <h5>{nav.navs}</h5>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Sidebar;
