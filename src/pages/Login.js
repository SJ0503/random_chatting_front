import React, { useState } from "react";
import { Link } from "react-router-dom";
import KakaoLoginButton from "../components/KakaoButton";
import { useEmailLogin } from "../handlers/logHandlers"; // ✅ 로그인 핸들러 가져오기

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { handleEmailLogin } = useEmailLogin(); // ✅ 커스텀 훅 사용

  // ✅ 입력값 변경 핸들러
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // ✅ 제출 핸들러
  const handleSubmit = (e) => {
    if (!formData.email || !formData.password) {
      e.preventDefault(); // 요청 방지
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    handleEmailLogin(e, formData.email, formData.password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">MyChat 로그인</h2>

        <form onSubmit={handleSubmit}>
          {/* 이메일 입력 */}
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="mb-6">
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* 로그인 버튼 */}
          <button type="submit" className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 mb-4">
            로그인
          </button>

          {/* 카카오 로그인 버튼 */}
          <KakaoLoginButton />
        </form>

        <div className="flex justify-center space-x-6 mt-8 text-sm text-gray-400">
          <Link to="/findMyPW">비밀번호 찾기</Link>
          <span>|</span>
          <Link to="/register">회원가입</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
