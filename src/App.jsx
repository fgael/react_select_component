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
