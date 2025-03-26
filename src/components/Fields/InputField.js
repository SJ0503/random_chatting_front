import React from "react";

function InputField({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled,
  min,
  max,
  required,
}) {
  return (
    <input
      id={id}
      type={type}
      className={`w-full p-3 border border-gray-300 rounded ${
        disabled ? "bg-gray-200 cursor-not-allowed" : ""
      }`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      min={min}        // ✅ 수정
      max={max}        // ✅ 수정
      required={required}
/>
  );
}


export default InputField;

