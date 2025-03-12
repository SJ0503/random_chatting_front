import React, { useState, useEffect } from "react";
import InputField from "../components/Fields/InputField";
import SelectField from "../components/Fields/SelectField";
import { useKakaoRegister } from "../hooks/useKakaoRegister";
import { useNavigate, useLocation } from "react-router-dom";
import { handleCheckNickname, handleKakaoSubmitForm } from "../handlers/registerHandlers";

const cities = [
    "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종",
    "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주",
];

function KaKaoRegister() {
    const [nickname, setNickname] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [region, setRegion] = useState("");
    const { checkNickname, register, loading, error, nickMessage } = useKakaoRegister();
    const navigate = useNavigate();
    const location = useLocation();
    const kakaoId = location.state?.kakaoId || ""; // ✅ 카카오 ID 가져오기

    const [isFormValid, setIsFormValid] = useState(false); // 모든 유효성 검사

    // 🔹 입력값 변경 시 가입 버튼 활성화 여부 업데이트
    useEffect(() => {
        setIsFormValid(
            !!nickMessage && !!age && !!gender && !!region
        );
    }, [nickMessage, age, gender, region]);

    // ✅ 닉네임 변경 시 중복 확인 메시지 초기화
    useEffect(() => {
        setIsFormValid(false);
    }, [nickname]);

    const formData = {
        user_kakao_id: kakaoId, // ✅ 카카오 ID 추가
        user_nickname: nickname,
        user_age: parseInt(age, 10),
        user_gender: gender,
        user_region: region,
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="w-full max-w-lg p-8">
                <h2 className="text-2xl font-bold my-10 text-center">MyChat 회원가입</h2>

                <form onSubmit={(e) => handleKakaoSubmitForm(e, formData, register, navigate)}>

                    {/* 닉네임 입력 */}
                    <div className="mb-4">
                        <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="col-span-2">
                                <InputField
                                    id="nick"
                                    placeholder="이름(닉네임)"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                />
                            </div>
                            <button
                                type="button"
                                className={`w-full h-12 ${loading ? "bg-gray-400" : "bg-black"} text-white px-4 py-2 rounded hover:bg-gray-800`}
                                onClick={() => handleCheckNickname(nickname, checkNickname)}
                                disabled={loading}
                            >
                                {loading ? "확인 중..." : "중복확인"}
                            </button>
                        </div>

                        {/* 닉네임 중복확인 결과 메시지 */}
                        <small
                            className={`block mt-2 text-sm ${error ? "text-red-500" : nickMessage ? "text-green-500" : "text-gray-500"}`}
                        >
                            {error ? error : nickMessage ? nickMessage : "닉네임 중복확인을 진행해주세요."}
                        </small>
                    </div>

                    {/* 기타 입력 필드 */}
                    <div className="mb-4">
                        <InputField
                            id="age"
                            type="number"
                            placeholder="나이"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <SelectField
                            id="gender"
                            placeholder="성별 선택"
                            options={["남성", "여성"]}
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <SelectField
                            id="region"
                            placeholder="거주지 선택"
                            options={cities}
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                        />
                    </div>

                    {/* 가입하기 버튼 */}
                    <small className="block mt-2 mb-4 text-sm text-center text-gray-500">
                        모든 조건이 충족되어야 가입버튼이 활성화 됩니다.
                    </small>

                    <button
                        type="submit"
                        className={`w-full p-3 rounded ${isFormValid && !loading
                            ? "bg-black text-white hover:bg-gray-800"
                            : "bg-gray-300 text-gray-700 cursor-not-allowed"
                            }`}
                        disabled={!isFormValid || loading}
                    >
                        {loading ? "가입 중..." : "가입하기"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default KaKaoRegister;
