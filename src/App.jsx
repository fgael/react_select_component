import Select from "./components/Select";

const options = ["Option1", "Option2", "Option3"];
const objectOptions = [
  { id: "1", value: "apple", label: "Apple" },
  { id: "2", value: "banana", label: "Banana" },
  { id: "3", value: "cherry", label: "Cherry" },
];

const App = () => {
  const handleChange = (value) => {
    console.log("Selected value:", value);
  };

  return (
    <>
      <Select options={options} valueKey="value" onChange={handleChange} />
      <Select
        options={objectOptions}
        valueKey="value"
        displayKey="label"
        onChange={handleChange}
      />
    </>
  );
};

export default App;
