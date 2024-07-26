import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Function to generate unique IDs for options
const generateId = (index) => `${index + 1}`;

const Select = ({
  options = [],
  valueKey = "id",
  displayKey = "display",
  onChange = null,
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [processedOptions, setProcessedOptions] = useState([]);
  const [isSimpleList, setIsSimpleList] = useState(true);

  useEffect(() => {
    if (options.length > 0) {
      let updatedOptions;

      if (typeof options[0] === "string") {
        // Handle simple list (array of strings)
        updatedOptions = options.map((option, index) => ({
          id: generateId(index),
          value: option,
          display: option,
        }));
        setIsSimpleList(true);
      } else if (typeof options[0] === "object") {
        // Handle object list
        updatedOptions = options.map((option, index) => {
          const generatedId = option.id || generateId(index);
          return { id: generatedId, ...option };
        });
        setIsSimpleList(false);
      } else {
        console.error("Options should be an array of strings or objects.");
        return;
      }

      setProcessedOptions(updatedOptions);

      // Set default selected value
      if (updatedOptions.length > 0) {
        setSelectedValue(updatedOptions[0][valueKey]);
      }
    }
  }, [options, valueKey]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <select
      className="react-select_list"
      value={selectedValue}
      onChange={handleChange}
    >
      {processedOptions.map((option) => (
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

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.string,
        [PropTypes.string]: PropTypes.any,
      }),
    ])
  ).isRequired,
  valueKey: PropTypes.string,
  displayKey: PropTypes.string,
  onChange: PropTypes.func,
};

export default Select;
