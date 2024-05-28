import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="relative z-10 flex justify-between items-center py-8 bg-[hsl(0.7,0.55,0.06)] text-white">
      <Image src="/logo-light.svg" width={100} height={100} alt="" />
      <h1 className="text-2xl md:text-3xl">FinancialFocus</h1>
      <div>
        {!user ? (
          <>
            <SignInButton>
              <Button className="relative z-20">Sign in</Button>
            </SignInButton>
          </>
        ) : (
          <>
            <Link href="/">
              <Button className="relative z-20">Enter</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
