import React, { useState } from "react";
import PasswordFields from "../components/Fields/PasswordField";
import { useResetPW } from "../hooks/useResetPW.js";


function ResetPW() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, loading } = useResetPW();

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(newPassword, confirmPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl border-2 border-black shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">비밀번호 재설정</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <PasswordFields
            password={newPassword}
            confirmPassword={confirmPassword}
            onPasswordChange={setNewPassword}
            onConfirmPasswordChange={setConfirmPassword}
          />
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? "처리 중..." : "재설정"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPW;
