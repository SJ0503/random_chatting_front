import React from "react";

function InputField({ id, type = "text", placeholder, value, onChange, disabled }) {
  return (
    <input
      id={id}
      type={type}
      className={`w-full p-3 border border-gray-300 rounded ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled} // disabled 속성 추가
    />
  );
}

export default InputField;
