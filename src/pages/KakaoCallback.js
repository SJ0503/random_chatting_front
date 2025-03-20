import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // ✅ AuthContext 가져오기

const API_BASE_URL = "http://127.0.0.1:8000"; // FastAPI 백엔드 주소

function KakaoCallback() {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const hasRun = useRef(false); // ✅ 실행 여부를 저장하는 useRef

    useEffect(() => {
        if (hasRun.current) return; // ✅ 이미 실행된 경우 실행 방지
        hasRun.current = true; // ✅ 첫 실행 시 true로 설정

        const params = new URLSearchParams(window.location.search);
        const authCode = params.get("code");

        if (!authCode) return;

        // console.log("보내는 인증 코드:", authCode);

        axios.post(`${API_BASE_URL}/login`, { login_type: "kakao", code: authCode })
            .then((res) => {
                console.log("카카오 로그인 응답 프론트:", res.data);

                if (res.data.isNewUser) {
                    navigate("/kakaoRegister", { replace: true, state: { kakaoId: res.data.kakao_id } });
                } else {
                    localStorage.setItem("accessToken", res.data.accessToken);
                    localStorage.setItem("user", JSON.stringify(res.data.user));

                    setUser(res.data.user); // ✅ AuthContext 업데이트
                    navigate("/", { replace: true });
                }
            })
            .catch((err) => {
                console.error("카카오 로그인 실패:", err);
                hasRun.current = false; // ✅ 실패 시 다시 실행 가능하도록 설정
            });

    }, [navigate, setUser]); // ✅ `setUser` 추가 → 최신 상태 유지

    return null;
}

export default KakaoCallback;
