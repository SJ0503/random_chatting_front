import React from "react";
import axios from "axios";


const API_BASE_URL = "http://127.0.0.1:8000"; // FastAPI 서버 주소


const handleKakaoLogin = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/kakao/login_url`);
        window.location.href = response.data.login_url; // 백엔드에서 받은 URL로 리디렉트
    } catch (error) {
        console.error("카카오 로그인 URL 요청 실패:", error);
    }
};

function KakaoLoginButton() {
    return (
        <button
            type="button"
            className="w-full bg-yellow-400 text-black p-3 rounded hover:bg-yellow-500"
            onClick={handleKakaoLogin}  // 버튼 클릭 시 카카오 로그인 요청
        >
            카카오로 시작
        </button>
    );
}

export default KakaoLoginButton;
