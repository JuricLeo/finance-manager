"use client";

import { useUser } from "@clerk/nextjs";

export default function HelloUser() {
  const { user } = useUser();

  return (
    <div>
      <h2 className="text-3xl">
        Hello{" "}
        <span className="bg-gradient-to-r from-primary to-[#E8B86B] inline-block text-transparent bg-clip-text font-bold">
          {user?.firstName}
        </span>
        , nice to have you here!
      </h2>
    </div>
  );
}
