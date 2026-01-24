import { BriefcaseIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";

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
        <div></div>
      </div>
      <Separator />
    </nav>
  );
};

export default Navbar;
