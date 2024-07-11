import { useState, useEffect } from "react";
import Select from "react-select";

const Multiselect = ({ options, setSelectedLabels }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  useEffect(() => {
    const labels = selectedOptions.map((option) => option.value);
    setSelectedLabels(labels.join(","));
  }, [selectedOptions]);

  return (
    <div style={{ margin: "20px" }}>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
      />
    </div>
  );
};

export default Multiselect;
