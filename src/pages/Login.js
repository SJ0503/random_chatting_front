import React from "react";
import { Link } from "react-router-dom";
import KakaoLoginButton from "../components/KakaoButton";

function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">MyChat 로그인</h2>
        <form>
          {/* 이메일 입력 */}
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="이메일"
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="mb-6">
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="비밀번호"
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 mb-4"
          >
            로그인
          </button>

          {/* 카카오 로그인 버튼 */}
          <KakaoLoginButton/>
        </form>
        <div className="flex justify-center space-x-6 mt-8 text-sm text-gray-400">
          <Link to="/findMyID">
            아이디 찾기
          </Link>
          <span>|</span>
          <Link to="/findMyPW">
            비밀번호 찾기
          </Link>
          <span>|</span>
          <Link to="/register">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
