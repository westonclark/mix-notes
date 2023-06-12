import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export const Header = () => {
  return (
    <header className="sticky top-0 flex items-center justify-between border-b border-slate-400 bg-neutral-900 p-4">
      <p>MIX NOTES</p>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </header>
  );
};
