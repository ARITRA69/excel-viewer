import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-[80vh] w-full">
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-5xl font-bold">ERROR 404</h1>
        <p className="font-bold opacity-70 text-xl">PAGE NOT FOUND</p>
        <Link href="/upload">
          <Button>{"<"} Go to Upload</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
