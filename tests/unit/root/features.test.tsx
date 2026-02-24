import Features from "@/components/Features";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Features", () => {
  it("renders all feature titles", () => {
    render(<Features />);
    expect(screen.getByText("Organize Applications")).toBeInTheDocument();
    expect(screen.getByText("Track Progress")).toBeInTheDocument();
    expect(screen.getByText("Stay Organized")).toBeInTheDocument();
  });

  it("renders 3 cards", () => {
    const { container } = render(<Features />);
    expect(container.querySelectorAll('[data-slot="card"]')).toHaveLength(3);
  });
});
