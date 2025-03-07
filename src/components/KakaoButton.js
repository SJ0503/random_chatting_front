import React from "react";
import { loginWithKakao } from "../utils/kakaoAuth";

function KakaoLoginButton() {
    return (
        <button
            type="button"
            className="w-full bg-yellow-400 text-black p-3 rounded hover:bg-yellow-500"
            onClick={loginWithKakao}  // 버튼 클릭 시 카카오 로그인 요청
        >
            카카오로 시작
        </button>
    );
}

export default KakaoLoginButton;
