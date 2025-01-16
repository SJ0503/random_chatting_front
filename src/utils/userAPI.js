import { isValidEmail } from "../helpers/validation"; // 이메일일유효성 검사 함수 


const API_BASE_URL = "http://127.0.0.1:8000"; // FastAPI 서버 주소

export const sendEmailVerificationCode = async (email) => {
  if (!email) {
    throw new Error("이메일을 입력해주세요.");
  }

  if (!isValidEmail(email)) {
    throw new Error("유효하지 않은 이메일 형식입니다.");
  }

  console.log("전송 데이터 (쿼리 문자열):", email);

  try {
    const response = await fetch(`${API_BASE_URL}/send-verification-code?email=${encodeURIComponent(email)}`, {
      method: "POST",
      headers: { "accept": "application/json" },
    });

    if (!response.ok) {
      const error = await response.json(); // 서버에서 받은 에러 응답
      console.error("서버 에러 응답:", error);
      throw new Error(error.detail || "알 수 없는 서버 에러가 발생했습니다."); // 에러 메시지를 명시적으로 throw
    }


    const data = await response.json();
    console.log("서버 응답 데이터:", data);
    return data.message;
  } catch (error) {
    console.error("인증번호 전송 실패:", error.message);
    throw error;
  }
};

export const verifyEmailCode = async (email, code) => {
  if (!email || !code) {
    throw new Error("이메일과 인증번호를 모두 입력해주세요.");
  }

  console.log("전송 데이터 (쿼리 문자열):", { email, code });

  try {
    const response = await fetch(`${API_BASE_URL}/verify-code?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`, {
      method: "POST",
      headers: { "accept": "application/json" },
    });

    if (!response.ok) {
      const error = await response.json(); // 서버에서 받은 에러 응답
      console.error("서버 에러 응답:", error);
      throw new Error(error.detail || "알 수 없는 서버 에러가 발생했습니다."); // 에러 메시지를 명시적으로 throw
    }

    const data = await response.json();
    console.log("서버 응답 데이터:", data);
    return data.message;
  } catch (error) {
    console.error("코드 검증 실패:", error.message);
    throw error;
  }
};

// 닉네임 중복 확인
export const checkNicknameDuplicate = async (nickname) => {
  try {
    const response = await fetch(`${API_BASE_URL}/check-nickname?nickname=${nickname}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "닉네임 확인 중 문제가 발생했습니다.");
    }
    const data = await response.json();
    return data.message;
  } catch (error) {
    throw error;
  }
};

// 사용자 등록
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // userData contains { user_nickname, user_email, user_password, user_gender, user_age, user_region }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "회원 가입 중 문제가 발생했습니다.");
    }

    const data = await response.json();
    return data; // Returns the newly created user object
  } catch (error) {
    throw error;
  }
};
