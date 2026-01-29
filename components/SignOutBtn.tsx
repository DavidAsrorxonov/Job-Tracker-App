"use client";
import { signOut } from "@/lib/auth/auth-client";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignOutBtn = () => {
  const router = useRouter();

  return (
    <DropdownMenuItem
      onClick={async () => {
        const result = await signOut();

        if (result.data?.success) {
          toast.success("Successfully signed out", {
            position: "top-center",
            description: "Redirecting to sign in...",
            duration: 2000,
          });
          router.push("/sign-in");
        } else {
          toast.error("Failed to sign out", {
            position: "top-center",
            description: "Please try again",
          });
        }
      }}
    >
      Log Out
    </DropdownMenuItem>
  );
};

export default SignOutBtn;
