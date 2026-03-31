"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
};

export default function Logo({
  width = 120,
  height = 40,
  className,
}: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <div className={className}>
      <Image
        src={
          isDark ? "/images/ascendio-white.png" : "/images/ascendio-black.png"
        }
        alt="Ascendio Logo"
        width={width}
        height={height}
        loading="eager"
      />
    </div>
  );
}
