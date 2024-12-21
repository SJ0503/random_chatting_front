import React from "react";

function SelectField({ id, options, placeholder, value, onChange }) {
  return (
    <select
      id={id}
      className="w-full p-3 border border-gray-300 rounded bg-white"
      value={value}
      onChange={onChange}
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default SelectField;
