import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginWithKakao } from "../utils/userAPI";

function KakaoCallback() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const hasRun = useRef(false);
  const [error,setError] = useState(null);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const params = new URLSearchParams(window.location.search);
    const authCode = params.get("code");

    if (!authCode) return;

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
        // console.error("카카오 로그인 실패:", err.response?.data || err.message);
        setError(err.response?.data?.detail || "로그인 중 오류 발생");
        alert("로그인 실패: " + (err.response?.data?.detail || err.message));
      });
  }, [navigate, setUser,setError, error]);

  return null;
}

export default KakaoCallback;
