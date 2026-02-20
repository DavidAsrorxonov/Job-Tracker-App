import Footer from "@/components/Footer";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock("next/link", () => {
  return {
    default: ({ href, children, ...props }: any) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  };
});

describe("Footer", () => {
  it("renders Contact, Connect, and Subscribe", () => {
    render(<Footer />);

    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Connect")).toBeInTheDocument();
    expect(screen.getByText("Subscribe")).toBeInTheDocument();
  });

  it("renders the contact email link", () => {
    render(<Footer />);

    const links = screen.getAllByRole("link", { name: "info@jobtracker.com" });
    expect(
      links.some(
        (a) => a.getAttribute("href") === "mailto:info@jobtracker.com",
      ),
    ).toBe(true);
  });

  it("renders the social links", () => {
    render(<Footer />);

    const instagramLinks = screen.getAllByRole("link", { name: "Instagram" });
    expect(
      instagramLinks.some(
        (a) =>
          a.getAttribute("href") === "https://www.instagram.com/adovudkhan",
      ),
    ).toBe(true);

    const telegramLinks = screen.getAllByRole("link", { name: "Telegram" });
    expect(
      telegramLinks.some(
        (a) => a.getAttribute("href") === "https://t.me/whoisdave01",
      ),
    ).toBe(true);

    const githubLinks = screen.getAllByRole("link", { name: "GitHub" });
    expect(
      githubLinks.some(
        (a) => a.getAttribute("href") === "https://github.com/DavidAsrorxonov",
      ),
    ).toBe(true);
  });

  it("renders the email input", () => {
    render(<Footer />);

    const inputs = screen.getAllByPlaceholderText("Email");
    expect(inputs.length).toBeGreaterThan(0);
    expect(inputs[0]).toHaveAttribute("type", "email");
  });

  it("shows the copyright", () => {
    render(<Footer />);

    const copies = screen.getAllByText("© 2026 Job Tracker");
    expect(copies.length).toBeGreaterThan(0);
  });
});
