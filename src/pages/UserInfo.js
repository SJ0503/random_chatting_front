import React from "react";
import { useAuth } from "../context/AuthContext.js"; // ✅ useAuth 가져오기


function UserInfo() {
  const { user } = useAuth(); // ✅ 로그인 상태 및 로그아웃 함수 가져오기

    return (
        <div>
            <h5>Welcome to the UserInfo</h5>
        
                {user.nickname}님 환영합니다!
                {user.region}
            </div>
          )
}

export default UserInfo;