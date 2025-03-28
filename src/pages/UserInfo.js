import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PasswordFields from "../components/Fields/PasswordField";
import { useUserUpdate } from "../hooks/useUserUpdate.js";

const cities = [
  "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종",
  "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주",
];

function UserInfo() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState(user?.age || "");
  const [region, setRegion] = useState(user?.region || cities[0]);

  const { handleUpdate } = useUserUpdate();
  const {handleDelete} = useUserUpdate();

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // 나이 유효성 검사
    const numericAge = parseInt(age);
    if (numericAge < 12 || numericAge > 65) {
      alert("나이는 12세 이상 65세 이하로 입력해주세요.");
      return;
    }

    // 비밀번호 일치 여부 검사 (입력했을 때만)
    if (newPassword && newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    handleUpdate({
      password: newPassword,
      age: numericAge,
      region,
    });

    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl border-2 border-black shadow">
        <h2 className="text-2xl font-bold mb-10 text-center">{user.nickname}님의 정보</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* 회원 유형 */}
          <div className="flex justify-between items-center">
            <label className="text-gray-600 text-lg">회원 유형</label>
            <span className="font-semibold text-black text-lg">
              {user.type === "email" ? "이메일 인증" : "카카오 인증"}
            </span>
          </div>

          {/* 이메일 */}
          {user.type === "email" && (
            <div className="flex justify-between items-center">
              <label className="text-gray-600 text-lg">이메일</label>
              <span className="font-medium text-lg">{user.user_email}</span>
            </div>
          )}

          {/* 비밀번호 수정 */}
          {user.type === "email" && (
            <PasswordFields
              password={newPassword}
              confirmPassword={confirmPassword}
              onPasswordChange={setNewPassword}
              onConfirmPasswordChange={setConfirmPassword}
            />
          )}

          {/* 성별 */}
          <div className="flex justify-between items-center">
            <label className="text-gray-600 text-lg">성별</label>
            <span className="font-medium text-lg">{user.gender || "정보 없음"}</span>
          </div>

          {/* 나이 수정 */}
          <div className="flex justify-between items-center">
            <label className="text-gray-600 text-lg">나이</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-1/2 p-2 border border-gray-300 rounded"
              min="12"
              max="65"
              required
            />
          </div>

          {/* 거주지 수정 */}
          <div className="flex justify-between items-center">
            <label className="text-gray-600 text-lg">거주지</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-1/2 p-2 border border-gray-300 rounded"
              required
            >
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* 저장 버튼 */}
          <div className="text-center pt-4">
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
              >
                수정하기
              </button>

              <button 
                type="button" onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-500"
              >
                탈퇴하기
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

export default UserInfo;
