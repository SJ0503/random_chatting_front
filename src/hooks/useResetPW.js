import { useState } from "react";
import { resetPW } from "../utils/userAPI";
import { useNavigate, useLocation } from "react-router-dom";

export const useResetPW = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const resetPassword = async (newPassword, confirmPassword) => {
    if (!email) {
      alert("인증된 이메일 정보가 없습니다. 처음부터 다시 시도해주세요.");
      navigate("/findMyPW", { replace: true });
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await resetPW(email, newPassword);
      alert("비밀번호가 성공적으로 재설정되었습니다.");
      navigate("/login");
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "비밀번호 재설정 중 오류 발생";
      alert(errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return {
    resetPassword,
    loading,
    error,
  };
};
