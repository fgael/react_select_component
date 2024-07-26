import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Function to generate unique IDs for options based on a prefix and index
const generateId = (prefix, index) => `${prefix}-${index + 1}`;

const Select = ({
  options = [], // Array of options for the select input
  valueKey = "id", // Key to use for the option's value attribute
  displayKey = "display", // Key to use for displaying the option's text
  defaultKey = "id", // Key to use for the default option
  onChange = null, // Callback function to call when the selected value changes
}) => {
  const [selectedValue, setSelectedValue] = useState(""); // State to keep track of the selected value
  const [optionsWithIds, setOptionsWithIds] = useState([]); // State to store options with generated IDs
  const [isSimpleList, setIsSimpleList] = useState(true); // State to determine if options are simple strings or objects

  useEffect(() => {
    if (options.length > 0) {
      if (typeof options[0] === "string") {
        // If the options array contains strings, treat it as a simple list
        setOptionsWithIds(
          options.map((option, index) => ({
            id: generateId("option", index), // Generate a unique ID
            value: option,
            display: option, // Use the string itself for both value and display
          }))
        );
        setIsSimpleList(true);
      } else if (typeof options[0] === "object") {
        // If the options array contains objects, treat it as an object list
        const updatedOptions = options.map((option, index) => {
          if (!option.id) {
            // If an object does not have an ID, generate one
            return { ...option, id: generateId("option", index) };
          }
          return option;
        });

        setOptionsWithIds(updatedOptions);
        setIsSimpleList(false);

        // Set the default selected value if provided and options are available
        if (defaultKey && updatedOptions.length > 0) {
          const defaultOption = updatedOptions[0];
          setSelectedValue(defaultOption[valueKey]);
        }
      } else {
        console.error("Options should be an array of strings or objects.");
      }
    }
  }, [options, valueKey, displayKey, defaultKey]);

  // Handler function for when the select input value changes
  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue); // Update the selected value state
    if (onChange) {
      onChange(newValue); // Call the onChange callback if provided
    }
  };

  return (
    <select
      className="react-select_list"
      value={selectedValue}
      onChange={handleChange}
    >
      {optionsWithIds.map((option) => (
        <option
          className="react-select_option"
          key={option.id}
          value={option[valueKey]}
        >
          {isSimpleList ? option.display : option[displayKey]}
        </option>
      ))}
    </select>
  );
};

// Define the expected prop types for the Select component
Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string, // Option can be a string
      PropTypes.shape({
        id: PropTypes.string, // Option can be an object with an ID
        [PropTypes.string]: PropTypes.any, // Object can have other properties
      }),
    ])
  ).isRequired,
  valueKey: PropTypes.string, // Key for option value attribute
  displayKey: PropTypes.string, // Key for option display text
  defaultKey: PropTypes.string, // Key for default option value
  onChange: PropTypes.func, // Optional callback for value change
};

export default Select;
