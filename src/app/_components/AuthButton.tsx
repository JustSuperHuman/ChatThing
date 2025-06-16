"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input/input";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function AuthButton() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  if (status === "loading") {
    return null;
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSigningIn(true);
    try {
      await signIn("email", { email, callbackUrl: "/" });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsSigningIn(false);
    }
  };

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        {!showEmailInput ? (
          <>
            <Button onClick={() => setShowEmailInput(true)} className="w-full">Create Account</Button>
            {process.env.NEXT_PUBLIC_GITHUB_ENABLED === "true" && (
              <Button variant="outline" onClick={() => signIn("github")}>GitHub</Button>
            )}
          </>
        ) : (
          <form onSubmit={handleEmailSignIn} className="flex items-center gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-64"
              required
            />
            <Button type="submit" disabled={isSigningIn || !email}>
              {isSigningIn ? "Sending..." : "Send Link"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setShowEmailInput(false);
                setEmail("");
              }}
            >
              Cancel
            </Button>
          </form>
        )}
      </div>
    );
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={session.user.image ?? undefined} />
          <AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span>{session.user.name}</span>
            <span className="text-xs font-normal text-gray-500">
              {session.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}