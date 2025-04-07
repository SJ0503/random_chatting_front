import { useState } from "react";
import {
  findPW,
  verifyEmailCode,
} from "../utils/userAPI";

export const useFindPW = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage] = useState(null);

  // 이메일 인증 코드 전송
  const sendVerificationCode = async (email) => {
    setLoading(true);
    try {
      const message = await findPW(email);
      alert(message);
      return message;
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || "인증 코드를 보내는 중 문제가 발생했습니다.";
      alert(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 이메일 인증 코드 검증
  const verifyCode = async (email, code) => {
    setLoading(true);
    try {
      const message = await verifyEmailCode(email, code);
      alert(message);
      return message;
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || "코드 검증 중 문제가 발생했습니다.";
      alert(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    sendVerificationCode,
    verifyCode,
    loading,
    error,
    successMessage,
  };
};
