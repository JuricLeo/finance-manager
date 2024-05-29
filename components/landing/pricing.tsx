import { Check } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function Pricing() {
  const { user } = useUser();

  const link = user ? "/" : "/sign-in";

  return (
    <section className="flex flex-col mt-36">
      <h1 className="text-4xl mb-2 text-center">Plans & Pricing</h1>
      <h2 className="text-lg mb-8 text-center text-muted-foreground">
        The application is 100% free! This is just a generic section.
      </h2>
      <div className="flex flex-col lg:flex-row justify-around gap-y-4">
        <div className="text-center flex flex-col justify-between bg-[#090202] min-h-[40rem] p-6 rounded-sm min-w-[25rem] lg:min-w-[15rem] mx-auto lg:w-[18rem]">
          <div>
            <h2 className="text-3xl">Basic</h2>
            <h2 className="text-md my-6">Free</h2>
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-3">
                <Check size={28} className="text-primary" />
                <p>View all graphs</p>
              </div>
              <div className="flex items-center gap-x-3">
                <Check size={28} className="text-primary" />
                <p>Unlimited expense count</p>
              </div>
            </div>
          </div>
          <Link href={link}>
            <Button className="mt-24">Enter FinancialFocus</Button>
          </Link>
        </div>
        <div className="text-center flex flex-col justify-between bg-primary/40 min-h-[40rem] p-6 rounded-sm min-w-[25rem] lg:min-w-[15rem] mx-auto lg:w-[18rem]">
          <div>
            <h2 className="text-3xl">Pro</h2>
            <h2 className="text-md my-6">$0.00 / month</h2>
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-3">
                <Check size={28} className="text-primary" />
                <p>View all graphs</p>
              </div>
              <div className="flex items-center gap-x-3">
                <Check size={28} className="text-primary" />
                <p>Unlimited expense count</p>
              </div>
              <div className="flex items-center gap-x-3">
                <Check size={28} className="text-primary" />
                <p>Unlimited categories count</p>
              </div>
              <div className="flex items-center gap-x-3">
                <Check size={28} className="text-primary" />
                <p>Dark and Light theme</p>
              </div>
            </div>
          </div>
          <Link href={link}>
            <Button variant="outline" className="mt-24 bg-black">
              Enter FinancialFocus
            </Button>
          </Link>
        </div>
        <div className="text-center flex flex-col justify-between bg-[#090202] min-h-[40rem] p-6 rounded-sm min-w-[25rem] lg:min-w-[15rem] mx-auto lg:w-[18rem]">
          <div>
            <h2 className="text-3xl">Enterprise</h2>
            <h2 className="text-md my-6">$0.00 / month</h2>
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-3">
                <Check size={28} className="text-primary" />
                <p>View all graphs</p>
              </div>
              <div className="flex items-center gap-x-3">
                <Check size={28} className="text-primary" />
                <p>Unlimited expense count</p>
              </div>
              <div className="flex items-center gap-x-3">
                <Check size={28} className="text-primary" />
                <p>Unlimited categories count</p>
              </div>
              <div className="flex items-center gap-x-3">
                <Check size={28} className="text-primary" />
                <p>Dark and Light theme</p>
              </div>
              <div className="flex items-center gap-x-3">
                <Check size={28} className="text-primary" />
                <p>Get access to dashboard</p>
              </div>
            </div>
          </div>
          <Link href={link}>
            <Button className="mt-24">Enter FinancialFocus</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
