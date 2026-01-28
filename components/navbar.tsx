"use client";

import { BriefcaseIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
import SignOutBtn from "./SignOutBtn";
import { useSession } from "@/lib/auth/auth-client";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 bg-background/60 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link href={"/"} className="flex items-center gap-2 text-xl font-bold">
          <BriefcaseIcon />
          Job Tracker
        </Link>
        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <Link href={"/dashboard"}>
                <Button>Dashboard</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    className="rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {session.user.name?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                    <DropdownMenuLabel>{session.user.email}</DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <SignOutBtn />
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href={"/sign-in"}>
                <Button variant={"ghost"}>Log In</Button>
              </Link>
              <Link href={"/sign-up"}>
                <Button>Start for free</Button>
              </Link>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
      <Separator />
    </nav>
  );
};

export default Navbar;
