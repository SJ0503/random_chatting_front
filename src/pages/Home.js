// ✅ pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserFriends, FaComments } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      {/* 왼쪽 영역 - 1대1 랜덤채팅 */}
      <div className="flex-1 bg-blue-50 flex flex-col items-center justify-center p-10 border-r-2 border-black">
        <FaUserFriends className="text-6xl mb-4 text-blue-600" />
        <h2 className="text-3xl font-bold mb-4">1대1 랜덤채팅</h2>
        <p className="text-lg text-center mb-6 max-w-xs">
          관심사 기반으로 새로운 사람과 익명으로 대화를 시작해보세요.
        </p>
        <button
          onClick={() => navigate("/randomChat")}
          className="bg-black text-white px-6 py-3 rounded-xl text-lg hover:bg-gray-800"
        >
          랜덤채팅 시작하기
        </button>
      </div>

      {/* 오른쪽 영역 - 오픈채팅 */}
      <div className="flex-1 bg-purple-50 flex flex-col items-center justify-center p-10">
        <FaComments className="text-6xl mb-4 text-purple-600" />
        <h2 className="text-3xl font-bold mb-4">오픈채팅방</h2>
        <p className="text-lg text-center mb-6 max-w-xs">
          다양한 주제의 채팅방에 참여하거나 새로운 채팅방을 만들어보세요.
        </p>
        <button
          onClick={() => navigate("/openChat")}
          className="bg-black text-white px-6 py-3 rounded-xl text-lg hover:bg-gray-800"
        >
          오픈채팅방 입장
        </button>
      </div>
    </div>
  );
}

export default Home;
