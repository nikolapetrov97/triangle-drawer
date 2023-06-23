import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<App />);
  });

  it("renders the container div", () => {
    render(<App />);
    expect(screen.getByTestId("box")).toBeInTheDocument();
  });

  it("renders the SVG component", () => {
    render(<App />);
    expect(screen.getByTestId("svg")).toBeInTheDocument();
  });

  it("renders the dot components", () => {
    render(<App />);
    const dotComponents = screen.getAllByTestId("dot");
    expect(dotComponents.length).toBe(3);
  });
});
