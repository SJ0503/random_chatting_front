import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useKakaoAuth } from "../hooks/useKakaoAuth";

function KakaoCallback() {
    const location = useLocation();
    const { handleKakaoLogin, loading, error } = useKakaoAuth();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const authCode = queryParams.get("code");
        if (authCode) {
            handleKakaoLogin(authCode);
        }
    }, [location, handleKakaoLogin]);

    if (loading) return <p>로그인 중...</p>;
    if (error) return <p>{error}</p>;

    return <p>카카오 로그인 처리 중...</p>;
}

export default KakaoCallback;
