import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // FastAPI 백엔드 주소

function KakaoCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const authCode = params.get("code");  // ✅ 카카오에서 받은 인가 코드

        if (authCode) {
            axios.post(`${API_BASE_URL}/kakao/token`, { code: authCode })  // ✅ 백엔드로 인가 코드 전송
                .then((res) => {
                    // console.log("카카오 로그인 응답:", res.data);

                    if (res.data.isNewUser) {
                        // ✅ 신규 회원 → 회원가입 페이지로 이동
                        navigate("/kakaoRegister", { state: { kakaoId: res.data.kakao_id } });
                    } else {
                        // ✅ 기존 회원 → 로그인 완료 후 홈 이동
                        navigate("/");
                    }
                })
                .catch((err) => {
                    console.error("카카오 로그인 실패:", err);
                });
        }
    }, [navigate]); // ✅ navigate 추가
}

export default KakaoCallback;
