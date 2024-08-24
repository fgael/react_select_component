import { render, screen, fireEvent } from "@testing-library/react";
import Select from "../components/Select";
import { describe, test, expect, vi } from "vitest";

describe("Select Component", () => {
  test("renders without crashing", () => {
    render(<Select options={[]} />);
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
  });

  test("renders options correctly for a simple list", () => {
    const options = ["Option 1", "Option 2", "Option 3"];
    render(<Select options={options} />);
    options.forEach((option) => {
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

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "2" },
    });

    expect(handleChange).toHaveBeenCalledWith("2");
  });

  test("sets the correct default value", () => {
    const options = ["Option 1", "Option 2", "Option 3"];
    render(<Select options={options} />);
    const selectElement = screen.getByRole("combobox");
    expect(selectElement.value).toBe("1");
  });
});
