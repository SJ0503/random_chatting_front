import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js"; // ✅ useAuth 가져오기

function Header() {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth(); // ✅ 로그인 상태 및 로그아웃 함수 가져오기

  return (
    <header className="bg-white text-black border-b border-black sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* 좌측: 어플리케이션 이름 */}
        <Link to="/" className="text-lg font-bold text-black">
        Hi Chatty
        </Link>

        {/* 중앙: 네비게이션 메뉴 */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/randomChat" className="hover:text-gray-700 font-bold">
                1대1 랜덤채팅
              </Link>
            </li>
            <li>
              <Link to="/openChat" className="hover:text-gray-700 font-bold">
                오픈채팅
              </Link>
            </li>
          </ul>
        </nav>

        {/* 우측: 로그인 상태 확인 후 UI 변경 */}
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-gray-800 min-w-[120px] whitespace-nowrap">
                {user.nickname}님 환영합니다!
              </span>
              <Link
                to="/userInfo"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                회원정보
              </Link>
              <button
                onClick={() => handleLogout(navigate)} // ✅ 로그아웃
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                시작하기
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
