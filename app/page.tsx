import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto px-4 py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-6xl font-bold">
              A better way to track your job applications
            </h1>
            <p className="text-muted-foreground mb-10 text-xl">
              Capture, organize and manage your job search in one place
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link href={"/sign-up"}>
                <Button size="lg" className="h-12 px-8 text-lg font-medium">
                  Start for free
                  <ArrowRightIcon className="ml-2" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                Free forever! No credit card required
              </p>
            </div>
          </div>
        </section>

        <Separator />
        <section className="py-16 flex items-center justify-center">
          <div>
            <Tabs defaultValue="img1">
              <TabsList>
                <TabsTrigger value="img1">Organize Applications</TabsTrigger>
                <TabsTrigger value="img2">Get Hired</TabsTrigger>
                <TabsTrigger value="img3">Manage Boards</TabsTrigger>
              </TabsList>
              <TabsContent value="img1">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src={"/hero-images/hero1.png"}
                    alt="hero1"
                    width={1200}
                    height={800}
                  />
                </div>
              </TabsContent>
              <TabsContent value="img2">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src={"/hero-images/hero2.png"}
                    alt="hero2"
                    width={1200}
                    height={800}
                  />
                </div>
              </TabsContent>
              <TabsContent value="img3">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src={"/hero-images/hero3.png"}
                    alt="hero3"
                    width={1200}
                    height={800}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  );
}
