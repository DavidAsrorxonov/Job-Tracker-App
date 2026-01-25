"use client";
import { signOut } from "@/lib/auth/auth-client";
import { DropdownMenuItem } from "./ui/dropdown-menu";

const SignOutBtn = () => {
  return (
    <DropdownMenuItem onClick={async () => await signOut()}>
      Log Out
    </DropdownMenuItem>
  );
};

export default SignOutBtn;
