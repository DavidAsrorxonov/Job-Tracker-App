"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import Image from "next/image";
import { tabsContent } from "@/constants/tabs-content";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ImageTabs = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="py-16 flex items-center justify-center">
      <div>
        <Tabs defaultValue="img1">
          <TabsList>
            <TabsTrigger value="img1">Organize Applications</TabsTrigger>
            <TabsTrigger value="img2">Get Hired</TabsTrigger>
            <TabsTrigger value="img3">Manage Boards</TabsTrigger>
          </TabsList>
          {tabsContent.map((tabContent) => (
            <TabsContent value={tabContent.value} key={tabContent.value}>
              <Card className="flex items-center justify-center h-full">
                <Image
                  src={
                    resolvedTheme === "dark"
                      ? tabContent.imageDark!
                      : tabContent.imageLight
                  }
                  alt={tabContent.alt}
                  width={1200}
                  height={800}
                />
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ImageTabs;
