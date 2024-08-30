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
      // Check if all options are strings or objects
      const allStrings = options.every((option) => typeof option === "string");
      const allObjects = options.every(
        (option) => typeof option === "object" && option !== null
      );

      // If all options are strings, treat the list as a simple list (array of strings)
      if (allStrings) {
        const updatedOptions = options.map((option, index) => ({
          id: generateId(index), // Generate a unique ID for each option
          value: option, // Use the option string itself as the value
          display: option, // Use the option string itself as the display text
        }));
        setIsSimpleList(true); // Indicate that the list is a simple list
        setProcessedOptions(updatedOptions); // Update the state with processed options
        setSelectedValue(updatedOptions[0][valueKey]); // Set the default selected value
      } else if (allObjects) {
        // If all options are objects, process as an object list
        const updatedOptions = options.map((option, index) => {
          // Use existing 'id' if available, otherwise generate a new ID
          const generatedId = option.id || generateId(index);
          // Merge the generated ID with other option properties
          return { id: generatedId, ...option };
        });
        setIsSimpleList(false); // Indicate that the list is a complex list
        setProcessedOptions(updatedOptions); // Update the state with processed options
        if (updatedOptions.length > 0) {
          setSelectedValue(updatedOptions[0][valueKey]); // Set the default selected value
        }
      } else {
        // If options are a mix of strings and objects, log an error
        console.error(
          "Options should be either all strings or all objects, not a mix."
        );
        return;
      }
    }
  }, [options, valueKey]); // Dependency array: re-run effect when 'options' or 'valueKey' changes

  // Function to handle changes in the select input
  const handleChange = (event) => {
    const newValue = event.target.value; // Get the new selected value from the event
    setSelectedValue(newValue); // Update the state with the new selected value
    if (onChange) {
      onChange(newValue); // If 'onChange' prop is provided, call it with the new value
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
          key={option.id} // Unique key for each option based on its 'id'
          value={option[valueKey]} // The value attribute for the option element
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
