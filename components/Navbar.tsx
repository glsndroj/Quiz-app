"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function Navbar() {
  return (
    <div className="w-screen h-[60px] flex justify-between items-center px-20 border-b fixed ">
      <h1 className="text-2xl font-semibold">Quiz app</h1>
      <Avatar>
        <AvatarImage
          className="w-10 h-10 rounded-full"
          src="https://github.com/shadcn.png"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
