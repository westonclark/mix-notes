import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export const Header = () => {
  return (
    <header className="sticky top-0 flex items-center justify-between border-b bg-neutral-900 border-neutral-400 text-white-1 px-10 py-4">
      <p className="text-xl">MIX NOTES</p>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  );
};
