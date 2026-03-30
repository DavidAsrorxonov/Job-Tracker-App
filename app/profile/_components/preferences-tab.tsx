"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
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
import { THEMES } from "@/constants/themes";
import { PREVIEW_TABS } from "@/constants/preview-tabs";

const PreferencesTab = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [activePreview, setActivePreview] = useState(1);

  const effectiveTheme =
    (theme === "system" ? resolvedTheme : theme) ?? "light";
  const activeTab = PREVIEW_TABS.find((t) => t.id === activePreview)!;
  const previewSrc =
    effectiveTheme === "dark" ? activeTab.dark : activeTab.light;

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground sm:text-xl">
          Preferences
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Customize how Ascendio looks and feels.
        </p>
      </div>

      <Card>
        <CardHeader className="px-4 pt-5 sm:px-6">
          <CardTitle className="text-sm sm:text-base">Appearance</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Choose your preferred color theme. System follows your device
            setting.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {THEMES.map((t) => {
              const Icon = t.icon;
              const isActive = theme === t.id;

              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  className={cn(
                    "group relative flex flex-col items-center gap-3 rounded-xl border p-4 text-center transition-all duration-200 sm:p-5",
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
                      "flex h-10 w-10 items-center justify-center rounded-lg transition-colors sm:h-12 sm:w-12",
                      isActive
                        ? "bg-primary/10"
                        : "bg-muted/60 group-hover:bg-muted",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 transition-colors sm:h-5 sm:w-5",
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
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground sm:text-xs">
              Preview
            </p>

            <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/20">
              <div className="flex flex-wrap items-center gap-2 border-b border-border/50 bg-muted/60 px-3 py-2 sm:px-4 sm:py-2.5">
                <div className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                </div>

                <div className="flex flex-1 items-center gap-1 overflow-x-auto">
                  {PREVIEW_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActivePreview(tab.id)}
                      className={cn(
                        "shrink-0 rounded-md px-2 py-1 text-[10px] font-medium transition-all duration-150 sm:px-2.5 sm:text-[11px]",
                        activePreview === tab.id
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="hidden sm:flex h-5 w-32 items-center justify-center rounded bg-background/60 px-2">
                  <span className="text-[10px] tracking-wide text-muted-foreground/50">
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
