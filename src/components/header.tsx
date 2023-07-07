import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="sticky top-0 flex items-center justify-between border-b border-neutral-400 bg-neutral-900 md:px-40 p-4 text-white-1">
      <Link className="text-xl" href="/">
        MIX NOTES
      </Link>
      <SignedIn>
        <UserButton showName={true} afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  );
};
