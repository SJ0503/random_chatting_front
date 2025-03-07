import { useState, useEffect } from "react";
import { fetchKakaoToken } from "../utils/kakaoAuth";
import { useNavigate } from "react-router-dom";

export const useKakaoAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    

    // 카카오 인가 코드 처리
    const handleKakaoLogin = async (authCode) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchKakaoToken(authCode);
            console.log("카카오 로그인 성공:", data);

            if (data.isNewUser) {
                navigate("/kakaoRegister", { state: { kakaoId: data.kakaoId } });  // 새 유저면 회원가입 폼으로 이동
            } else {
                navigate("/");  // 기존 회원이면 홈으로 이동
            }
        } catch (err) {
            console.error("카카오 로그인 실패:", err);
            setError("로그인 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return { handleKakaoLogin, loading, error };
};
