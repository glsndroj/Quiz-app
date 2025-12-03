import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full h-[60px] flex justify-between items-center px-20 border-b fixed ">
      <Link href={"http://localhost:3000"}>
        <h1 className="text-2xl font-semibold cursor-pointer">Quiz app</h1>
      </Link>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
