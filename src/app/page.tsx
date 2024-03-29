import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-[80vh] w-full">
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-5xl font-bold">Wellcome onboard...</h1>
        <Link href="/upload">
          <Button>{"<"} Go to Upload</Button>
        </Link>
      </div>
    </div>
  );
}
