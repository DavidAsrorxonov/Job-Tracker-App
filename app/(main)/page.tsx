import FAQ from "@/components/FAQs";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/how-it-works";
import ImageTabs from "@/components/image-tabs";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Hero />

        <Separator />

        <HowItWorks />

        <Separator />

        <ImageTabs />

        <Separator />

        <Features />

        <Separator />

        <FAQ />

        <Separator />

        <Footer />
      </main>
    </div>
  );
}
