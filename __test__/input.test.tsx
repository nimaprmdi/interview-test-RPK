import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../src/components/elements/Input";

describe("Input Component", () => {
  it("renders with correct attributes", () => {
    const mockOnChange = vi.fn();
    const props = {
      onChange: mockOnChange,
      value: "Test Value",
      name: "testInput",
      placeHolder: "Enter text here",
    };

    render(<Input {...props} />);

    const inputElement = screen.getByPlaceholderText("Enter text here") as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe("Test Value");
    expect(inputElement.name).toBe("testInput");
    expect(inputElement.id).toBe("testInput");
  });

  it("calls onChange when input value changes", () => {
    const mockOnChange = vi.fn();
    const props = {
      onChange: mockOnChange,
      value: "",
      name: "testInput",
      placeHolder: "Enter text here",
    };

    render(<Input {...props} />);

    const inputElement = screen.getByPlaceholderText("Enter text here");
    fireEvent.change(inputElement, { target: { value: "New Value" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it("applies the correct CSS classes", () => {
    const mockOnChange = vi.fn();
    const props = {
      onChange: mockOnChange,
      value: "",
      name: "testInput",
      placeHolder: "Enter text here",
    };

    render(<Input {...props} />);

    const inputElement = screen.getByPlaceholderText("Enter text here");
    expect(inputElement).toHaveClass(
      "w-64 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    );
  });
});
