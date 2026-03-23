"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const THEMES = [
  { id: "light", label: "Light", icon: Sun, description: "Clean and bright" },
  { id: "dark", label: "Dark", icon: Moon, description: "Easy on the eyes" },
  {
    id: "system",
    label: "System",
    icon: Monitor,
    description: "Follows your OS",
  },
] as const;

const PREVIEW_TABS = [
  {
    id: 1,
    label: "Kanban Board",
    light: "/hero-images/hero1-light.png",
    dark: "/hero-images/hero1-dark.png",
  },
  {
    id: 2,
    label: "Timeline",
    light: "/hero-images/hero2-light.png",
    dark: "/hero-images/hero2-dark.png",
  },
  {
    id: 3,
    label: "Analytics",
    light: "/hero-images/hero3-light.png",
    dark: "/hero-images/hero3-dark.png",
  },
] as const;

const PreferencesTab = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [activePreview, setActivePreview] = useState(1);

  const effectiveTheme =
    (theme === "system" ? resolvedTheme : theme) ?? "light";
  const activeTab = PREVIEW_TABS.find((t) => t.id === activePreview)!;
  const previewSrc =
    effectiveTheme === "dark" ? activeTab.dark : activeTab.light;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Preferences</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Customize how Ascendio looks and feels.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Appearance</CardTitle>
          <CardDescription>
            Choose your preferred color theme. System follows your device
            setting.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-3">
            {THEMES.map((t) => {
              const Icon = t.icon;
              const isActive = theme === t.id;

              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  className={cn(
                    "group relative flex flex-col items-center gap-3 rounded-xl border p-5 text-center transition-all duration-200",
                    isActive
                      ? "border-primary bg-primary/5"
                      : "border-border/60 bg-card hover:border-border hover:bg-muted/40",
                  )}
                >
                  {isActive && (
                    <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-primary" />
                  )}

                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-lg transition-colors",
                      isActive
                        ? "bg-primary/10"
                        : "bg-muted/60 group-hover:bg-muted",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5 transition-colors",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span
                      className={cn(
                        "text-sm font-medium transition-colors",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                    >
                      {t.label}
                    </span>
                    <span className="text-xs text-muted-foreground/70">
                      {t.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Preview
            </p>

            <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/20">
              <div className="flex items-center gap-2 border-b border-border/50 bg-muted/60 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />

                <div className="ml-3 flex items-center gap-1">
                  {PREVIEW_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActivePreview(tab.id)}
                      className={cn(
                        "rounded-md px-2.5 py-1 text-[11px] font-medium transition-all duration-150",
                        activePreview === tab.id
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="ml-auto flex h-5 w-32 items-center justify-center rounded bg-background/60 px-2">
                  <span className="text-[10px] text-muted-foreground/50 tracking-wide">
                    ascendio.app
                  </span>
                </div>
              </div>

              <div className="relative aspect-video w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${previewSrc}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={previewSrc}
                      alt={`${activeTab.label} ${effectiveTheme} preview`}
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreferencesTab;
