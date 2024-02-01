"use client";
import React, { useCallback } from "react";
import Dropzone from "@/components/upload/dropzone";

const Upload = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <Dropzone />
    </div>
  );
};

export default Upload;
