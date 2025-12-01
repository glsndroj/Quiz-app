"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function Navbar() {
  return (
    <div className="w-screen h-[60px] flex justify-between items-center px-20 border-b fixed ">
      <h1 className="text-2xl font-semibold">Quiz app</h1>
      <div className="flex gap-5">
        {/* <SignedOut>
          <SignInButton>
            <button className="bg-gray-300 text-black rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn> */}
      </div>
    </div>
  );
}
