import Hero from "@/components/Hero";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={typeof href === "string" ? href : String(href)} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("motion/react", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("Hero", () => {
  it("renders the badge", () => {
    render(<Hero />);

    expect(screen.getByText(/Early Access/i)).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<Hero />);

    const titles = screen.getAllByRole("heading", { level: 1 });

    expect(
      titles.some(
        (h) => h.textContent === "A better way to track your job applications",
      ),
    ).toBe(true);
  });

  it("renders the subtitle", () => {
    render(<Hero />);

    const subtitles = screen.getAllByRole("paragraph");

    expect(
      subtitles.some(
        (p) =>
          p.textContent ===
          "Capture, organize and manage your job search in one place",
      ),
    ).toBe(true);
  });

  it("renders CTA button content", () => {
    render(<Hero />);

    const ctas = screen.getAllByRole("link", { name: /Start for free/i });
    expect(ctas.some((a) => a.getAttribute("href") === "/sign-up")).toBe(true);
  });

  it("renders the free forever note", () => {
    render(<Hero />);

    const notes = screen.getAllByRole("paragraph");

    expect(
      notes.some(
        (p) => p.textContent === "Free forever! No credit card required",
      ),
    ).toBe(true);
  });
});
