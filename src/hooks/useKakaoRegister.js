import { useState } from "react";
import { checkNicknameDuplicate, registerKakaoUser } from "../utils/userAPI";

export const useKakaoRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [nickMessage, setNickMessage] = useState(null);

  // 닉네임 중복 확인
  const checkNickname = async (nickname) => {
    setNickMessage(null);
    setError(null);
    try {
      const message = await checkNicknameDuplicate(nickname); // 서버 요청
      setNickMessage(message); // 성공 메시지 저장
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || "닉네임 확인 중 문제가 발생했습니다.";
      setError(errorMessage); // 에러 메시지 저장
    } finally {
      setLoading(false);
    }
  };

  // 카카오 회원가입
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const user = await registerKakaoUser(userData);
      setSuccessMessage("카카오 회원 가입이 완료되었습니다.");
      alert("카카오 회원 가입이 완료되었습니다.");
      return user;
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || "회원 가입 중 문제가 발생했습니다.";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    checkNickname,
    register, // 카카오 회원가입 처리
    loading,
    error,
    successMessage,
    nickMessage,
  };
};
