"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

const DocsToc = () => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll("main h2, main h3"),
    ) as HTMLHeadingElement[];

    const tocItems: TocItem[] = headings
      .filter((h) => h.id)
      .map((h) => ({
        id: h.id,
        text: h.textContent ?? "",
        level: Number(h.tagName[1]) as 2 | 3,
      }));

    setItems(tocItems);
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0% 0% -80% 0%",
        threshold: 1,
      },
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="flex flex-col gap-1">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        On this page
      </p>

      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(item.id)?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            setActiveId(item.id);
          }}
          className={cn(
            "text-xs leading-relaxed transition-colors duration-150 py-0.5",
            item.level === 3 && "pl-3",
            activeId === item.id
              ? "text-primary font-medium"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
};

export default DocsToc;
