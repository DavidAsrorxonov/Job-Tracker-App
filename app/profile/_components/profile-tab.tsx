"use client";

import { useSession } from "@/lib/auth/auth-client";
import { useState } from "react";

type EditState = "idle" | "editing" | "loading";

const ProfileTab = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [editState, setEditState] = useState<EditState>("idle");
  const [nameValue, setNameValue] = useState(user?.name ?? "");
  const [error, setError] = useState("");

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return <div>ProfileTab</div>;
};

export default ProfileTab;
