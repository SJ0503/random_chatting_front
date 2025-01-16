// components/Register/PasswordFields.js
import React from "react";
import PasswordInput from "../Fields/PasswordInput";
import { validatePassword } from "../../helpers/validation";

function PasswordFields({ password, confirmPassword, onPasswordChange, onConfirmPasswordChange }) {
    const { isValid: passwordValid } = validatePassword(password); // 비밀번호 유효성 검사
    const passwordMatch = password === confirmPassword;

    return (
        <>
            {/* 비밀번호 입력 */}
            <div className="mb-4 relative">
                <PasswordInput
                    id="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    isValid={passwordValid}
                    showValidationMessage={false} // PasswordInput 내부 메시지 비활성화
                />
                {/* 고정된 유효성 메시지 */}
                <small
                    className={`block mt-2 text-sm ${
                        password === "" || passwordValid ? "text-gray-500" : "text-red-500"
                    }`}
                >
                    영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15 자리
                </small>
            </div>

            {/* 비밀번호 확인 */}
            <div className="mb-6 relative">
                <PasswordInput
                    id="confirmPassword"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => onConfirmPasswordChange(e.target.value)}
                    isValid={passwordMatch}
                    showValidationMessage={false} // PasswordInput 내부 메시지 비활성화
                />
                {/* 고정된 일치 여부 메시지 */}
                <small
                    className={`block mt-2 text-sm ${
                        confirmPassword === "" || passwordMatch ? "text-gray-500" : "text-red-500"
                    }`}
                >
                    비밀번호를 확인해주세요.
                </small>
            </div>
        </>
    );
}

export default PasswordFields;
