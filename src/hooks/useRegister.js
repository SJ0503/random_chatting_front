import { useState } from "react";
import {
  checkNicknameDuplicate,
  sendEmailVerificationCode,
  verifyEmailCode,
  registerUser,
} from "../utils/userAPI";

export const useRegister = () => {
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 메시지
  const [successMessage, setSuccessMessage] = useState(null); // 성공 메시지
  const [nickMessage, setNickMessage] = useState(null); // 닉네임 중복 확인 메시지

  // 닉네임 중복 확인
  const checkNickname = async (nickname) => {
    setLoading(true);
    setNickMessage(null);
    setError(null);
    try {
      const message = await checkNicknameDuplicate(nickname); // 서버 요청
      setNickMessage(message); // 성공 메시지 저장
      alert(message); // 성공 메시지를 alert로 표시
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || "닉네임 확인 중 문제가 발생했습니다.";
      setError(errorMessage); // 에러 메시지 저장
      alert(errorMessage); // 에러 메시지를 alert로 표시
    } finally {
      setLoading(false);
    }
  };

  // 이메일 인증 코드 전송
  const sendVerificationCode = async (email) => {
    try {
      const message = await sendEmailVerificationCode(email); // 서버 요청
      alert(message); // 성공 메시지를 alert로 표시
      return message; // 성공 메시지 반환
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || "인증 코드를 보내는 중 문제가 발생했습니다.";
      alert(errorMessage); // 에러 메시지를 alert로 표시
    } finally {
      setLoading(false);
    }
  };

  // 이메일 인증 코드 검증
  const verifyCode = async (email, code) => {
    try {
      const message = await verifyEmailCode(email, code); // 서버 요청
      alert(message); // 성공 메시지를 alert로 표시
      return message; // 성공 메시지 반환
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || "코드 검증 중 문제가 발생했습니다.";
      alert(errorMessage); // 에러 메시지를 alert로 표시
    } finally {
      setLoading(false);
    }
  };

  // 사용자 등록
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const user = await registerUser(userData); // 서버 요청
      const message = "회원 가입이 완료되었습니다."; // 성공 메시지
      setSuccessMessage(message); // 성공 메시지 저장
      alert(message); // 성공 메시지를 alert로 표시
      return user; // 성공적으로 등록된 사용자 반환
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || "회원 가입 중 문제가 발생했습니다.";
      setError(errorMessage); // 에러 메시지 저장
      alert(errorMessage); // 에러 메시지를 alert로 표시
    } finally {
      setLoading(false);
    }
  };

  return {
    checkNickname,
    sendVerificationCode,
    verifyCode,
    register, // 사용자 등록 함수 노출
    loading, // 로딩 상태
    error, // 에러 메시지
    successMessage, // 성공 메시지
    nickMessage, // 닉네임 메시지
  };
};
