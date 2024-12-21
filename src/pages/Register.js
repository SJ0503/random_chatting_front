import React, { useState } from "react";
import InputField from "../components/Fields/InputField";
import SelectField from "../components/Fields/SelectField";
import PasswordInput from "../components/Fields/PasswordInput";
import { useCheckNickname } from "../hooks/checkRegister";

function Register() {
    const cities = [
        "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종",
        "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"
    ];

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        // 비밀번호 유효성 검사 (영문, 숫자, 특수문자 조합 8~15자)
        const isValid = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*]).{8,15}$/.test(value);
        setPasswordValid(isValid);
        // 비밀번호 확인과 비교
        if (confirmPassword) {
            setPasswordMatch(value === confirmPassword);
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setPasswordMatch(value === password);
    };



    const { checkNickname, loading, error, successMessage } = useCheckNickname();
    const [nickname, setNickname] = useState("");

    const handleCheckNickname = async () => {
        await checkNickname(nickname);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="w-full max-w-lg p-8">
                <h2 className="text-2xl font-bold my-10 text-center">MyChat 회원가입</h2>

                <form>
                    {/* 이메일 입력 */}
                    <div className="grid grid-cols-3 gap-4 items-center mb-4">
                        <div className="col-span-2">
                            <InputField id="email" type="email" placeholder="이메일" />
                        </div>
                        <button
                            type="button"
                            className="w-full h-12 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                        >
                            인증번호 전송
                        </button>
                    </div>

                    {/* 인증번호 입력 */}
                    <div className="grid grid-cols-3 gap-4 items-center mb-4">
                        <div className="col-span-2">
                            <InputField id="code" placeholder="인증번호" />
                        </div>
                        <button
                            type="button"
                            className="w-full h-12 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                        >
                            확인
                        </button>
                    </div>

                    {/* 비밀번호 입력 */}
                    <div className="mb-4 relative">
                        <PasswordInput
                            id="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={handlePasswordChange}
                            isValid={passwordValid}
                            validationMessage="영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15 자리"
                        />
                    </div>

                    {/* 비밀번호 확인 */}
                    <div className="mb-6 relative">
                        <PasswordInput
                            id="confirmPassword"
                            placeholder="비밀번호 확인"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            isValid={passwordMatch}
                            validationMessage={passwordMatch ? "" : "비밀번호가 일치하지 않습니다."}
                        />
                    </div>

                    {/* 닉네임 입력 */}
                    {error && <p className="text-red-500">{error}</p>}
                    {successMessage && <p className="text-green-500">{successMessage}</p>}
                    <div className="grid grid-cols-3 gap-4 items-center mb-4">

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
                            onClick={handleCheckNickname}
                            disabled={loading}
                        >
                            {loading ? "확인 중..." : "중복확인"}
                        </button>
                    </div>


                    {/* 나이 입력 */}
                    <div className="mb-4">
                        <InputField id="age" type="number" placeholder="나이" />
                    </div>

                    {/* 성별 선택 */}
                    <div className="mb-4">
                        <SelectField
                            id="gender"
                            placeholder="성별 선택"
                            options={["남성", "여성"]}
                        />
                    </div>

                    {/* 거주지 선택 */}
                    <div className="mb-6">
                        <SelectField id="region" placeholder="거주지 선택" options={cities} />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white p-3 rounded hover:bg-gray-800"
                    >
                        가입하기
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
