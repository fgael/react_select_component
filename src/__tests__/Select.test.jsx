import { render, screen, fireEvent } from "@testing-library/react";
import Select from "../components/Select";
import { describe, test, expect, vi } from "vitest";

describe("Select Component", () => {
  test("renders without crashing", () => {
    render(<Select options={[]} />);
    const selectElement = screen.getByRole("combobox");
    // Check if the select element is present in the document
    expect(selectElement).toBeInTheDocument();
  });

  test("renders options correctly for a simple list", () => {
    const options = ["Option 1", "Option 2", "Option 3"];
    render(<Select options={options} />);
    options.forEach((option) => {
      // Ensure each option text is present in the document
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  test("renders options correctly for an object list", () => {
    const options = [
      { id: "1", display: "Option 1" },
      { id: "2", display: "Option 2" },
      { id: "3", display: "Option 3" },
    ];
    render(<Select options={options} valueKey="id" displayKey="display" />);
    options.forEach((option) => {
      // Ensure each option display text is present in the document
      expect(screen.getByText(option.display)).toBeInTheDocument();
    });
  });

  test("calls onChange function when an option is selected", () => {
    const options = [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ];
    const handleChange = vi.fn();
    render(
      <Select
        options={options}
        onChange={handleChange}
        valueKey="value"
        displayKey="label"
      />
    );

    // Simulate selecting the option with value "2"
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "2" },
    });
    // Verify that handleChange was called with the expected value
    expect(handleChange).toHaveBeenCalledWith("2");
  });

  test("sets the correct default value for a simple list", () => {
    const options = ["Option 1", "Option 2", "Option 3"];
    render(<Select options={options} />);
    const selectElement = screen.getByRole("combobox");
    // Verify that the select element has the default value set to the first option
    expect(selectElement.value).toBe("1"); // value "1" is the ID generated for the first option
  });

  test("sets the correct default value for an object list", () => {
    const options = [
      { id: "1", display: "Option 1" },
      { id: "2", display: "Option 2" },
      { id: "3", display: "Option 3" },
    ];
    render(<Select options={options} valueKey="id" displayKey="display" />);
    const selectElement = screen.getByRole("combobox");
    // Verify that the select element has the default value set to the ID of the first option
    expect(selectElement.value).toBe("1"); // ID of the first option
  });

  test("handles mixed options and logs an error", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const mixedOptions = ["Option 1", { id: "2", display: "Option 2" }];
    render(<Select options={mixedOptions} />);

    // Verify that console.error was called to log the error
    expect(consoleError).toHaveBeenCalledWith(
      "Options should be either all strings or all objects, not a mix."
    );

    consoleError.mockRestore();
  });
});
