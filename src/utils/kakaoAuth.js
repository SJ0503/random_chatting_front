import axios from "axios";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize`;
const KAKAO_CLIENT_ID = "f4ac91129b989e86dad1ccadf49f955d"; // 카카오 개발자 콘솔에서 발급받은 키
const REDIRECT_URI = "http://localhost:3000/kakao-callback"; // 리디렉트 URI
const API_BASE_URL = "http://127.0.0.1:8000"; // 백엔드 API 주소

// ✅ Axios 기본 설정 (카카오 API 요청용)
const kakaoApi = axios.create({
    baseURL: "https://kauth.kakao.com",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
});

// ✅ Axios 기본 설정 (백엔드 API 요청용)
const backendApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ 카카오 로그인 요청 (사용자를 카카오 로그인 페이지로 이동)
export const loginWithKakao = () => {
    window.location.href = `${KAKAO_AUTH_URL}?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
};
console.log("카카오아이디",KAKAO_CLIENT_ID);

// ✅ 백엔드에 인가 코드 전달 → 액세스 토큰 요청
export const fetchKakaoToken = async (authCode) => {
    try {
        const response = await backendApi.post("/kakao/token", { code: authCode });
        return response.data; // 액세스 토큰 반환
    } catch (error) {
        console.error("카카오 토큰 요청 실패:", error.response?.data || error.message);
        throw new Error(error.response?.data?.detail || "카카오 토큰 요청에 실패했습니다.");
    }
};

// ✅ 카카오 사용자 정보 요청 (액세스 토큰을 이용)
export const fetchKakaoUserInfo = async (accessToken) => {
    try {
        const response = await kakaoApi.get("/v2/user/me", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data; // 사용자 정보 반환
    } catch (error) {
        console.error("카카오 사용자 정보 요청 실패:", error.response?.data || error.message);
        throw new Error(error.response?.data?.detail || "카카오 사용자 정보 요청에 실패했습니다.");
    }
};

// ✅ 백엔드로 카카오 회원가입 요청 (DB 저장)
export const registerKakaoUser = async (userData) => {
    try {
        const response = await backendApi.post("/kakao/register", userData);
        return response.data; // 가입된 사용자 정보 반환
    } catch (error) {
        console.error("카카오 회원가입 실패:", error.response?.data || error.message);
        throw new Error(error.response?.data?.detail || "카카오 회원가입 중 문제가 발생했습니다.");
    }
};
