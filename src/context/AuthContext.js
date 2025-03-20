import { createContext, useContext, useState, useEffect } from "react";

// ✅ AuthContext 생성
const AuthContext = createContext();

// ✅ AuthProvider: 사용자 정보를 전역적으로 관리
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // ✅ localStorage에서 user 정보 불러오기 (새로고침 시)
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse user data:", error);
                handleLogout();
            }
        }
    }, []);

    // ✅ 로그아웃 함수
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ useAuth 훅 (다른 컴포넌트에서 쉽게 사용)
export const useAuth = () => useContext(AuthContext);
