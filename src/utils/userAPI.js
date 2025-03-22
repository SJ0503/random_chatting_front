import { isValidEmail } from "../helpers/validation"; // 이메일 유효성 검사 함수 
import api from "./api.js"



// ✅ 이메일 인증번호 전송
export const sendEmailVerificationCode = async (email) => {
  if (!email) throw new Error("이메일을 입력해주세요.");
  if (!isValidEmail(email)) throw new Error("유효하지 않은 이메일 형식입니다.");

  try {
    const response = await api.post(`/send-verification-code`, null, {
      params: { email },
    });
    return response.data.message;
  } catch (error) {
    console.error("인증번호 전송 실패:", error.response?.data || error.message);
    throw new Error(error.response?.data?.detail || "인증 코드 전송에 실패했습니다.");
  }
};

// ✅ 이메일 인증번호 검증
export const verifyEmailCode = async (email, code) => {
  if (!email || !code) throw new Error("이메일과 인증번호를 모두 입력해주세요.");

  try {
    const response = await api.post(`/verify-code`, null, {
      params: { email, code },
    });
    return response.data.message;
  } catch (error) {
    console.error("코드 검증 실패:", error.response?.data || error.message);
    throw new Error(error.response?.data?.detail || "코드 검증 중 문제가 발생했습니다.");
  }
};

// ✅ 닉네임 중복 확인
export const checkNicknameDuplicate = async (nickname) => {
  try {
    const response = await api.get(`/check-nickname`, {
      params: { nickname },
    });
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "닉네임 확인 중 문제가 발생했습니다.");
  }
};

// ✅ 사용자 등록 (회원가입)
export const registerUser = async (userData) => {
  try {
    const response = await api.post(`/register`, userData);
    return response.data; // 회원가입 성공 시 사용자 데이터 반환
  } catch (error) {
    throw new Error(error.response?.data?.detail || "회원 가입 중 문제가 발생했습니다.");
  }
};

// ✅ 백엔드로 카카오 회원가입 요청 (DB 저장)
export const registerKakaoUser = async (userData) => {
  console.log(userData)
    try {
        const response = await api.post(`/kakao/register`, userData);
        return response.data; // 가입된 사용자 정보 반환
    } catch (error) {
        console.error("카카오 회원가입 실패:", error.response?.data || error.message);
        throw new Error(error.response?.data?.detail || "카카오 회원가입 중 문제가 발생했습니다.");
    }
};

// ✅ 이메일 로그인 요청
export const loginWithEmail = async (email, password) => {
  try {
    const response = await api.post(`/login`, {
      login_type: "email",
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("이메일 로그인 실패:", error.response?.data || error.message);
    throw new Error(error.response?.data?.detail || "이메일 로그인 중 문제가 발생했습니다.");
  }
};

// ✅ 카카오 로그인 요청 (인가 코드 전달 → 토큰 & 유저 정보 받기)
export const loginWithKakao = async (authCode) => {
  const response = await api.post(`/login`, {
    login_type: "kakao",
    code: authCode,
  });

  return response.data;
};

// ✅ 로그아웃 (토큰 삭제)
export const logout = async () => {
  try {
    await api.post("/logout");
  console.log("로그아웃성공")
    
  } catch (e) {
    console.warn("서버 로그아웃 실패:", e.message);
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

