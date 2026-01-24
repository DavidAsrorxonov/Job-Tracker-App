import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto px-4 py-32">
          <div>
            <h1>A better way to track your job applications</h1>
            <p>Capture, organize and manage your job search in one place!</p>
          </div>
          <ModeToggle />
        </section>
      </main>
    </div>
  );
}
