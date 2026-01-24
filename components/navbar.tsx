import { BriefcaseIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav>
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link
          href={"/"}
          className="flex items-center gap-2 text-xl font-bold text-primary"
        >
          <BriefcaseIcon />
          Job Tracker
        </Link>
        <div>
          <Link href={"/sign-in"}>
            <Button variant={"ghost"}>Log In</Button>
          </Link>
          <Link href={"/sign-up"}>
            <Button>Start for free</Button>
          </Link>
        </div>
      </div>
      <Separator />
    </nav>
  );
};

export default Navbar;
