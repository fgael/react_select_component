import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Function to generate unique IDs for options based on their index
const generateId = (index) => `${index + 1}`;

const Select = ({
  options = [], // Array of options for the select input, default is an empty array
  valueKey = "id", // The key used to identify the value of an option, default is "id"
  displayKey = "display", // The key used to identify the display text of an option, default is "display"
  onChange = null, // Function to be called when the selected value changes, default is null
}) => {
  // State for storing the currently selected value
  const [selectedValue, setSelectedValue] = useState("");
  // State for storing processed options based on the input 'options' prop
  const [processedOptions, setProcessedOptions] = useState([]);
  // State to determine if the options are in a simple list format (array of strings)
  const [isSimpleList, setIsSimpleList] = useState(true);

  // useEffect hook to process options whenever 'options' or 'valueKey' changes
  useEffect(() => {
    if (options.length > 0) {
      let updatedOptions;
      // If the first option is a string, treat the list as a simple list (array of strings)
      if (typeof options[0] === "string") {
        updatedOptions = options.map((option, index) => ({
          // Generate a unique ID for each option
          id: generateId(index),
          // Use the option string itself as the value
          value: option,
          // Use the option string itself as the display text
          display: option,
        }));
        setIsSimpleList(true);
        // If the first option is an object, process as an object list
      } else if (typeof options[0] === "object") {
        updatedOptions = options.map((option, index) => {
          // Use existing 'id' if available, otherwise generate a new ID
          const generatedId = option.id || generateId(index);
          // Merge the generated ID with other option properties
          return { id: generatedId, ...option };
        });
        setIsSimpleList(false);
      } else {
        console.error("Options should be an array of strings or objects.");
        return;
      }

      // Update the state with the processed options
      setProcessedOptions(updatedOptions);

      // Set the default selected value to the value of the first processed option
      if (updatedOptions.length > 0) {
        setSelectedValue(updatedOptions[0][valueKey]);
      }
    }
  }, [options, valueKey]); // Dependency array: re-run effect when 'options' or 'valueKey' changes

  // Function to handle changes in the select input
  const handleChange = (event) => {
    // Get the new selected value from the event
    const newValue = event.target.value;
    // Update the state with the new selected value
    setSelectedValue(newValue);
    // If 'onChange' prop is provided, call it with the new value
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    // Render a select element with the current selected value and change handler
    <select
      className="react-select_list"
      value={selectedValue}
      onChange={handleChange}
    >
      {/* Render an option element for each processed option */}
      {processedOptions.map((option) => (
        <option
          className="react-select_option"
          // Unique key for each option based on its 'id'
          key={option.id}
          // The value attribute for the option element
          value={option[valueKey]}
        >
          {/* Display the option text; use 'display' key for simple lists, 'displayKey' prop for complex lists */}
          {isSimpleList ? option.display : option[displayKey]}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      // Options can be strings
      PropTypes.string,
      PropTypes.shape({
        // If options are objects, they can have an 'id' string property
        id: PropTypes.string,
        // Options objects can have any other string properties
        [PropTypes.string]: PropTypes.any,
      }),
    ])
  ).isRequired,
  // The 'valueKey' prop must be a string
  valueKey: PropTypes.string,
  // The 'displayKey' prop must be a string
  displayKey: PropTypes.string,
  // The 'onChange' prop, if provided, must be a function
  onChange: PropTypes.func,
};

export default Select;
