"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();

  return (
    <main>
      Landing
      <br />
      {!user ? (
        <>
          <SignInButton>
            <Button>Sign in</Button>
          </SignInButton>
        </>
      ) : (
        <>
          <Link href="/">
            <Button>Enter FinancialFocus</Button>
          </Link>
        </>
      )}
    </main>
  );
}
