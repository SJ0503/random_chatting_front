import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // FastAPI 백엔드 주소

function KakaoCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const authCode = params.get("code"); 
        console.log(authCode)
        if (authCode) {
            axios.post(`${API_BASE_URL}/login`, { login_type: "kakao", code: authCode })
                .then((res) => {
                    console.log("카카오 로그인 응답:", res.data);
                    if (res.data.isNewUser) {
                        navigate("/kakaoRegister", { state: { kakaoId: res.data.kakao_id } });
                    } else {
                        localStorage.setItem("accessToken", res.data.accessToken);
                        navigate("/");
                    }
                })
                .catch((err) => {
                    console.error("카카오 로그인 실패:", err);
                });
        }
    }, [navigate]);

    return null;
}

export default KakaoCallback;
