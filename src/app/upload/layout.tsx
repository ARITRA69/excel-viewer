import Profile from "@/components/profile";
import { Bell, Github } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

interface Types {
  children: ReactNode;
}

const UploadLayout = ({ children }: Types) => {
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex justify-end lg:justify-between items-center">
        <h1 className="text-xl hidden lg:inline-block">Upload</h1>
        <div className="flex items-center gap-6">
          <Link
            href="https://github.com/ARITRA69/excel-viewer"
            target="_blank"
            className="py-2 px-5 rounded-full bg-foreground text-background flex items-center justify-center gap-1"
          >
            <span className="text-sm hidden sm:block">Source Code</span>
            <Github />
          </Link>
          <Bell />
          <Profile />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default UploadLayout;
