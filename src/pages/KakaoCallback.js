import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginWithKakao } from "../utils/userAPI"; // ✅ API 분리된 함수 import

function KakaoCallback() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const params = new URLSearchParams(window.location.search);
    const authCode = params.get("code");

    if (!authCode) return;

    // ✅ 분리된 API 함수 사용
    loginWithKakao(authCode)
      .then((res) => {
        console.log("카카오 로그인 응답 프론트:", res);

        if (res.isNewUser) {
          navigate("/kakaoRegister", {
            replace: true,
            state: { kakaoId: res.kakao_id },
          });
        } else {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("user", JSON.stringify(res.user));
          setUser(res.user);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.error("카카오 로그인 실패:", err);
        hasRun.current = false;
      });
  }, [navigate, setUser]);

  return null;
}

export default KakaoCallback;
