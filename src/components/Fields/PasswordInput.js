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
  const [isTouched, setIsTouched] = useState(false); // 입력 여부를 추적
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시/숨기기 상태

  return (
    <div className="relative">
      {/* 비밀번호 입력 필드 */}
      <input
        type={showPassword ? "text" : "password"} // 비밀번호 표시/숨기기
        id={id}
        value={value}
        onChange={(e) => {
          onChange(e);
          setIsTouched(true); // 입력 시 "터치" 상태로 전환
        }}
        onBlur={() => setIsTouched(true)} // 포커스가 벗어나면 "터치" 상태로 전환
        className="w-full p-3 border rounded border-gray-300" // 테두리는 기본값 유지
        placeholder={placeholder}
      />

      {/* 비밀번호 표시/숨기기 버튼 */}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
        className="absolute right-3 top-3 w-6 h-6 flex items-center justify-center cursor-pointer"
      >
        <img
          src={showPassword ? "/assets/private.png" : "/assets/eye.png"}
          alt={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
        />
      </button>

      {/* 유효성 검사 메시지 */}
      {showValidationMessage && isTouched && validationMessage && (
        <small
          className={`block mt-2 text-sm ${
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
