import Profile from "@/components/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
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
          <Bell />
          <Profile />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default UploadLayout;
