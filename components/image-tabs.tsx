"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabsContent } from "@/constants/tabs-content";

const ImageTabs = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("img1");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="preview" className="relative py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-100 w-175 -translate-x-1/2 rounded-full bg-primary opacity-[0.06] blur-[100px]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Badge
              variant="outline"
              className="rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground"
            >
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              See it in action
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mb-4 font-serif text-4xl font-semibold tracking-tight text-balance md:text-5xl"
          >
            Everything in <em className="text-primary italic">one place</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-base font-light leading-relaxed text-muted-foreground"
          >
            From the first wishlist to the final offer — every step of your
            search, beautifully organized.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mx-auto max-w-5xl"
        >
          <Tabs
            defaultValue="img1"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="mb-8 flex justify-center">
              <TabsList className="h-auto rounded-full border border-border/50 bg-muted/40 p-1 backdrop-blur-sm">
                {tabsContent.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="rounded-full px-5 py-2 text-sm font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Image panels */}
            {tabsContent.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="mt-0 outline-none"
              >
                <AnimatePresence mode="wait">
                  {activeTab === tab.value && (
                    <motion.div
                      key={tab.value}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="relative"
                    >
                      <div className="absolute inset-x-8 -bottom-6 h-16 rounded-full bg-primary opacity-20 blur-2xl" />

                      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl shadow-black/10">
                        <div className="flex items-center gap-2 border-b border-border/50 bg-muted/60 px-4 py-3">
                          <span className="h-3 w-3 rounded-full bg-red-400/70" />
                          <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                          <span className="h-3 w-3 rounded-full bg-green-400/70" />
                          <div className="mx-auto flex h-6 w-56 items-center justify-center rounded-md bg-background/60 px-3">
                            <span className="text-[11px] text-muted-foreground/60 tracking-wide">
                              ascendio.app
                            </span>
                          </div>
                        </div>

                        <Image
                          src={
                            resolvedTheme === "dark"
                              ? tab.imageDark!
                              : tab.imageLight
                          }
                          alt={tab.alt}
                          width={1200}
                          height={800}
                          className="w-full"
                          priority
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default ImageTabs;
