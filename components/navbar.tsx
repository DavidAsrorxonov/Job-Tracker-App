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
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SignOutBtn from "./SignOutBtn";
import { useSession } from "@/lib/auth/auth-client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-colors",
        isScrolled
          ? "backdrop-blur-lg bg-background/60 border-b border-border/20"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Image
            src="/images/ascendio-glowing-cropped.png"
            alt="Ascendio"
            width={150}
            height={150}
          />
        </Link>

        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
              <Link href="/dashboard/upload">
                <Button variant="outline">My Documents</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={session.user.image ?? undefined}
                        alt={session.user.name ?? "User"}
                      />
                      <AvatarFallback>
                        {session.user.name?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                    <DropdownMenuLabel className="font-normal text-muted-foreground">
                      {session.user.email}
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <SignOutBtn />
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/sign-in">
              <Button>Get started</Button>
            </Link>
          )}
          <ModeToggle />
        </div>
      </div>
      <Separator className={cn(isScrolled ? "opacity-100" : "opacity-0")} />
    </nav>
  );
};

export default Navbar;
