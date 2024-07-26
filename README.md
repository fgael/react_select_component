# `@fgael/react-select`

A flexible and reusable React select component that supports both simple string arrays and complex object arrays as options.

## Installation

To install the package, use npm or yarn:

```bash
npm install @fgael/react-select
```

or

```bash
yarn add @fgael/react-select
```

## Usage

Here's how to use the `Select` component in your React project:

```jsx
import React from "react";
import Select from "./components/Select";

const options = ["Option1", "Option2", "Option3"];

const objectOptions = [
  { id: "1", value: "apple", label: "Apple" },
  { id: "2", value: "banana", label: "Banana" },
  { id: "3", value: "cherry", label: "Cherry" },
];

const objectOptionsWithoutId = [
  { value: "france", label: "France", abbr: "FR" },
  { value: "germany", label: "Germany", abbr: "DE" },
  { value: "spain", label: "Spain", abbr: "ES" },
];

const App = () => {
  const handleChange = (value) => {
    console.log("Selected value:", value);
  };

  return (
    <>
      {/* Select with string options */}
      <Select options={options} valueKey="value" onChange={handleChange} />
      {/* Select with object options containing id, return value */}
      <Select
        options={objectOptions}
        valueKey="value"
        displayKey="label"
        onChange={handleChange}
      />
      {/* Select with object options not containing ids, return abbr */}
      <Select
        options={objectOptionsWithoutId}
        valueKey="abbr"
        displayKey="label"
        onChange={handleChange}
      />
    </>
  );
};

export default App;
```

## Props

- `options` (Array<string> | Array<object>, default: `[]`): An array of options to display in the select. Can be an array of strings or objects.

- `valueKey` (string, default: `'id'`): This key determines what value will be returned when an option is selected.

- `displayKey` (string, default: `'display'`): The key to use for the option display text when `options` is an array of objects.

- `onChange` (function, default: `null`): A callback function that is called when the selected value changes. It receives the new value as an argument.

## Features

1. **Flexible Options**: Supports both simple string arrays and complex object arrays as options.
2. **Automatic ID Generation**: Generates unique IDs for options if not provided.
3. **Customizable Keys**: Allows specifying custom keys for value and display text when using object options.
4. **Default Selection**: Automatically selects the first option when using object options and a `displayKey` is provided.
5. **onChange Callback**: Provides a callback function for handling value changes.

## How it Works

1. The component initializes with an empty selected value and processes the provided options.
2. For string arrays, it creates an internal representation with generated IDs.
3. For object arrays, it ensures each option has an ID and uses the specified `valueKey` and `displayKey`.
4. The component renders a standard HTML `<select>` element with `<option>` elements based on the processed options.
5. When a selection is made, the `onChange` callback is triggered with the new value.

## Notes

- The component will log an error if the `options` prop is neither an array of strings nor an array of objects.
