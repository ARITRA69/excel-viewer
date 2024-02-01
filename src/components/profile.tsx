"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { LogOut, RefreshCw } from "lucide-react";
import { signOut } from "next-auth/react";

const Profile = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-11/12 sm:w-[300px] space-y-3">
          <div className="flex items-center gap-x-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-lg whitespace-nowrap">Name</span>
              <span className="text-opacity-70 whitespace-nowrap">@userid</span>
            </div>
          </div>
          <Button variant="outline" className="w-full flex items-center gap-3">
            Switch Account <RefreshCw />
          </Button>
          <Button
            onClick={() => signOut()}
            className="w-full flex items-center gap-3"
          >
            Sign out <LogOut />
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
