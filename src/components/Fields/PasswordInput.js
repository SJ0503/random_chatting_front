import React, { useState } from "react";

function PasswordInput({
  id,
  placeholder,
  value,
  onChange,
  isValid,
  validationMessage,
  showValidationMessage = true,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full p-3 border rounded ${
          isValid === false ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
      />
      <img
        src={showPassword ? "/assets/private.png" : "/assets/eye.png"}
        alt={showPassword ? "Hide Password" : "Show Password"}
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-3 w-6 h-6 cursor-pointer"
      />
      {showValidationMessage && validationMessage && (
        <small
          className={`block mt-2 ${
            isValid === false ? "text-red-500" : "text-gray-500"
          }`}
        >
          {validationMessage}
        </small>
      )}
    </div>
  );
}

export default PasswordInput;
