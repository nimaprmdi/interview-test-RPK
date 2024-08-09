// MyComponent.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../src/components/elements/Button.tsx";
import { test, expect, vi } from "vitest";

test("should have a child", () => {
  render(<Button onClick={() => {}}>Hello World</Button>);

  expect(screen.getByText("Hello World")).toBeInTheDocument();
});

test("should render the component", () => {
  const mockHandler = vi.fn();
  render(<Button onClick={mockHandler}>Click me</Button>);

  const buttonElement = screen.getByText("Click me");
  fireEvent.click(buttonElement);

  expect(mockHandler).toHaveBeenCalledTimes(1);
});
