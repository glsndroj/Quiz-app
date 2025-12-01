import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div className="w-full h-[60px] flex justify-between items-center px-20 border-b fixed ">
      <h1 className="text-2xl font-semibold">Quiz app</h1>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
