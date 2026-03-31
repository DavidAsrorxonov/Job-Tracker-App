"use client";

import Link from "next/link";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import {
  BookOpen,
  User,
  LogOut,
  Loader2,
  LayoutGrid,
  FolderOpen,
} from "lucide-react";
import { signOut, useSession } from "@/lib/auth/auth-client";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/sign-in";
          },
        },
      });
    } catch {
      setSigningOut(false);
    }
  };

  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-colors",
        isScrolled
          ? "border-b border-border/20 bg-background/60 backdrop-blur-lg"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Logo width={80} height={80} />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {session?.user ? (
            <>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="hidden sm:inline-flex"
              >
                <Link href="/docs">Documentation</Link>
              </Button>

              <Button
                asChild
                size="sm"
                variant="outline"
                className="hidden md:inline-flex"
              >
                <Link href="/dashboard/upload">My files</Link>
              </Button>

              <Button asChild size="sm" className="hidden md:flex">
                <Link href="/dashboard">Dashboard</Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={session.user.image ?? undefined}
                        alt={session.user.name ?? "User"}
                      />
                      <AvatarFallback className="text-xs font-medium">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-64" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-medium">
                      {session.user.name}
                    </DropdownMenuLabel>
                    <DropdownMenuLabel className="-mt-2 text-xs font-normal text-muted-foreground">
                      {session.user.email}
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/docs">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Documentation
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/upload">
                        <FolderOpen className="mr-2 h-4 w-4" />
                        My files
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="md:hidden">
                      <Link href="/dashboard">
                        <LayoutGrid className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      disabled={signingOut}
                      className="text-destructive focus:text-destructive"
                    >
                      {signingOut ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <LogOut className="mr-2 h-4 w-4" />
                      )}
                      {signingOut ? "Signing out..." : "Sign out"}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild size="sm">
              <Link href="/sign-in">Get started</Link>
            </Button>
          )}

          <ModeToggle />
        </div>
      </div>

      <Separator className={cn(isScrolled ? "opacity-100" : "opacity-0")} />
    </nav>
  );
};

export default Navbar;
