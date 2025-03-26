import { loginWithEmail } from "../utils/userAPI"; // ✅ API 호출 함수 가져오기
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ AuthContext 사용

// ✅ 이메일 로그인 훅 (Login.js에서 사용)
export const useEmailLogin = () => {
  const [error, setError] = useState(null); // 에러 메시지 상태
  const navigate = useNavigate(); // ✅ 페이지 이동
  const { setUser } = useAuth(); // ✅ AuthContext에서 사용자 상태 업데이트

  const handleEmailLogin = async (e, user_email, user_password) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    try {
      const response = await loginWithEmail(user_email, user_password);

      if (!response || !response.accessToken || !response.user) {
        throw new Error("서버에서 유효한 사용자 데이터를 반환하지 않았습니다.");
      }

      console.log("로그인 성공:", response);

      // ✅ 사용자 정보 저장 (로컬스토리지 & 전역 상태)
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user); // ✅ 전역 상태 업데이트

      // ✅ 로그인 성공 후 홈 화면으로 이동 (UI 자동 업데이트)
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error.response?.data || error.message);
      setError(error.response?.data?.detail || "로그인 중 오류 발생");
    }
  };

  return { handleEmailLogin, error };
};
