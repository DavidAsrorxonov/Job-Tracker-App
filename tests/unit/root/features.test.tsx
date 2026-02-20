import Features from "@/components/Features";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Features", () => {
  it("renders the three feature headings", () => {
    render(<Features />);
    expect(
      screen.getByRole("heading", { name: /Organize Applications/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /Track Progress/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /Stay Organized/i }),
    ).toBeInTheDocument();
  });

  it("renders the feature descriptions", () => {
    render(<Features />);
    expect(
      screen.getByText(/Create custom boards and columns/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Monitor your application status/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Never lose track of an application/i),
    ).toBeInTheDocument();
  });

  it("renders 3 cards", () => {
    render(<Features />);

    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(3);
  });
});
