import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function UserInfo() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");



  if (!user) return navigate("/", { replace: true });;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl border-2 border-black shadow text-center">
        <h2 className="text-2xl font-bold mb-10">{user.nickname}님의 정보</h2>

        <div className="text-left space-y-6">
          {/* 회원 유형 */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-lg">회원 유형</span>
            <span className="font-semibold text-black text-lg">
              {user.type === "email" ? "이메일 인증" : "카카오 인증"}
            </span>
          </div>

          {/* 이메일 (이메일 회원만 표시) */}
          {user.type === "email" && (
            <div className="text-left space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-lg">이메일</span>
                <span className="font-medium text-lg">{user.user_email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-lg">비밀번호</span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  수정하기
                </button>

              </div>
            </div>
          )}

          {isEditing && (
            <div className="w-full space-y-4 mt-4">
              <input
                type="password"
                placeholder="새 비밀번호"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="flex space-x-4">
                <button
                  // onClick={handleSavePassword} // 👈 저장 함수 따로 작성
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  저장
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  취소
                </button>
              </div>
            </div>
          )}


          {/* 성별 */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-lg">성별</span>
            <span className="font-medium text-lg">{user.gender || "정보 없음"}</span>
          </div>

          {/* 나이 */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-lg">나이</span>
            <span className="font-medium text-lg">{user.age ? `${user.age}세` : "정보 없음"}</span>
          </div>

          {/* 거주지 */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-lg">거주지</span>
            <span className="font-medium text-lg">{user.region || "정보 없음"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
