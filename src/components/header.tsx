import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export const Header = () => {
  return (
    <header className="sticky top-0 flex items-center text-xl justify-between border-b border-slate-400 bg-neutral-900 p-4">
      <p>MIX NOTES</p>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  );
};
