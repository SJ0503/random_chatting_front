import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchKakaoToken } from "../utils/kakaoAuth"; // 토큰 요청 API

function KakaoCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get("code"); // 카카오에서 받은 인가 코드

        if (authCode) {
            handleKakaoLogin(authCode);
        } else {
            alert("카카오 로그인 실패!");
            navigate("/login"); // 로그인 페이지로 리디렉트
        }
    }, []);

    const handleKakaoLogin = async (authCode) => {
        try {
            const response = await fetchKakaoToken(authCode); // 백엔드로 authCode 보내기
            const { userExists, accessToken } = response;

            if (userExists) {
                alert("로그인 성공!");
                // ✅ 로그인 상태 저장 (예: localStorage 또는 context 사용)
                localStorage.setItem("accessToken", accessToken);
                navigate("/home"); // 로그인 후 홈으로 이동
            } else {
                alert("회원가입 필요");
                navigate("/kakao/register"); // 카카오 회원가입 페이지로 이동
            }
        } catch (error) {
            alert("카카오 로그인 처리 중 오류 발생!");
            navigate("/login");
        }
    };

    return <div>카카오 로그인 처리 중...</div>;
}

export default KakaoCallback;
