"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useUser,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <nav className="p-4 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        
        <Link href="/">
          <Image src="/logo.svg" alt="Vibe" width={32} height={32} prioritystyle={{ width: "auto", height: "auto" }} className="shrink-0 invert dark:invert-0" />
        </Link>

        {!isSignedIn ? (
          <div className="flex gap-2">
            <SignInButton>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton>
              <Button size="sm">
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        ) : (
          <UserButton />
        )}
      </div>
    </nav>
  );
};

export default Navbar;