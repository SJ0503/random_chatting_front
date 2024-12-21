import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white text-black border-b border-black sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* 좌측: 어플리케이션 이름 */}
        <div className="text-lg font-bold text-black">
          MyChatApp
        </div>
        
        {/* 중앙: 네비게이션 메뉴 */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/login"
                className="hover:text-gray-700 font-bold"
              >
                1대1 랜덤채팅
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-gray-700 font-bold"
              >
                오픈채팅
              </Link>
            </li>
          </ul>
        </nav>

        {/* 우측: 시작하기 버튼 */}
        <div>
          <Link
            to="/login"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            시작하기
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
