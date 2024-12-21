import React from "react";

function InputField({ id, type = "text", placeholder, value, onChange }) {
  return (
    <input
      id={id}
      type={type}
      className="w-full p-3 border border-gray-300 rounded"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default InputField;
