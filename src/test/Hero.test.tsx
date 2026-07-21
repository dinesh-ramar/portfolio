import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  beforeEach(() => {
    // Mock scrollIntoView which is not available in jsdom
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    // Mock document.getElementById for the scrollToProjects handler
    vi.spyOn(document, "getElementById").mockReturnValue(
      document.createElement("div"),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the role label and name", () => {
    render(<Hero />);

    expect(screen.getByText("React Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("Dinesh Ramar")).toBeInTheDocument();
  });

  it("renders tech stack items", () => {
    const TECH = ["React", "JavaScript", "TypeScript", "Redux Toolkit", "Tailwind CSS"];
    render(<Hero />);

    for (const tech of TECH) {
      expect(screen.getByText(tech)).toBeInTheDocument();
    }
  });

  it("renders the resume link with correct href and accessible name", () => {
    render(<Hero />);

    const resumeLink = screen.getByLabelText("Download Dinesh Ramar resume PDF");
    expect(resumeLink).toBeInTheDocument();
    expect(resumeLink).toHaveAttribute("href", "/Dinesh_Ramar_ReactJS_Resume.pdf");
    expect(resumeLink).toHaveAttribute("download");
  });

  it("renders the projects CTA with correct accessible name", () => {
    render(<Hero />);

    const workCta = screen.getByLabelText("View my work");
    expect(workCta).toBeInTheDocument();
  });
});
