import React, { useState, useEffect } from "react";
import InputField from "../components/Fields/InputField";
import SelectField from "../components/Fields/SelectField";
import PasswordFields from "../components/Fields/PasswordField";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import { handleSendVerificationCode, handleVerifyCode, handleCheckNickname, handleSubmitForm, } from "../handlers/registerHandlers";
import { validatePassword } from "../helpers/validation";

const cities = [
    "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종",
    "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주",
];

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [region, setRegion] = useState("");
    const [isEmailDisabled, setIsEmailDisabled] = useState(false);
    const [timer, setTimer] = useState(0);
    const [code, setCode] = useState(""); // 인증 코드 상태
    const [isCodeDisabled, setIsCodeDisabled] = useState(false); // 인증번호 입력 필드 비활성화
    const [isVerified, setIsVerified] = useState(false); // 인증 완료 상태
    const { checkNickname, register, sendVerificationCode, verifyCode, loading, error, nickMessage } = useRegister();
    const navigate = useNavigate();
    const [isFormValid, setIsFormValid] = useState(false);  // 모든 유효성 검사

    useEffect(() => {
        const isPasswordValid = validatePassword(password).isValid;
        const isPasswordMatch = password === confirmPassword;
        const isNicknameValid = !!nickMessage; // 닉네임 중복 확인 완료
        const isAgeValid = !!age;
        const isGenderValid = !!gender;
        const isRegionValid = !!region;

        // 모든 조건이 충족되면 true, 아니면 false
        setIsFormValid(
            isVerified &&
            isPasswordValid &&
            isPasswordMatch &&
            isNicknameValid &&
            isAgeValid &&
            isGenderValid &&
            isRegionValid
        );
    }, [isVerified, password, confirmPassword, nickMessage, age, gender, region]);

    // 닉네임 변경 시 자동으로 가입 버튼 비활성화
    useEffect(() => {
        setIsFormValid(false);
    }, [nickname]);


    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else if (!isVerified) {
            setIsEmailDisabled(false); // 타이머가 0일 때만 이메일 입력 활성화
        }
    }, [timer, isVerified]);

    const formData = {
        user_email: email,
        user_password: password,
        user_nickname: nickname,
        user_age: parseInt(age),
        user_gender: gender,
        user_region: region,
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="w-full max-w-lg p-8">
                <h2 className="text-2xl font-bold my-10 text-center">MyChat 회원가입</h2>

                <form onSubmit={(e) => handleSubmitForm(e, formData, password, confirmPassword, register, navigate)}>
                    {/* 이메일 입력 */}
                    <div className="grid grid-cols-3 gap-4 items-center mb-4">
                        <div className="col-span-2">
                            <InputField
                                id="email"
                                type="email"
                                placeholder="이메일"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isEmailDisabled || isVerified} // 인증 완료 시 비활성화
                                className={`${isEmailDisabled || isVerified ? "cursor-not-allowed bg-gray-200" : ""}`}
                            />
                        </div>

                        {timer > 0 && !isVerified ? ( // 인증 완료 전 타이머 표시
                            <div className="w-full h-12 flex items-center justify-center bg-gray-300 text-gray-700 px-4 py-2 rounded">
                                {Math.floor(timer / 60)}분 {timer % 60}초
                            </div>
                        ) : (
                            <button
                                type="button"
                                className={`w-full h-12 px-4 py-2 rounded ${isVerified ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"
                                    }`}
                                onClick={async () =>
                                    await handleSendVerificationCode(
                                        email,
                                        setIsEmailDisabled,
                                        setTimer,
                                        sendVerificationCode
                                    )
                                }
                                disabled={isVerified} // 인증 완료 시 버튼 비활성화
                            >
                                {isVerified ? "인증완료" : "인증번호 전송"}
                            </button>
                        )}
                    </div>

                    {/* 인증번호 입력 및 확인 */}
                    <div className="grid grid-cols-3 gap-4 items-center mb-4">
                        <div className="col-span-2">
                            <InputField
                                id="code"
                                type="text"
                                placeholder="인증번호"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                disabled={isCodeDisabled || isVerified} // 인증 완료 시 비활성화
                            // className={`${isVerified ? "cursor-not-allowed bg-gray-200" : ""}`}
                            />
                        </div>
                        <button
                            type="button"
                            className={`w-full h-12 px-4 py-2 rounded ${isCodeDisabled || isVerified ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"}`}
                            onClick={async () =>
                                await handleVerifyCode(
                                    email,
                                    code,
                                    verifyCode,
                                    setIsCodeDisabled,
                                    setIsVerified,
                                    setTimer,
                                    setIsEmailDisabled
                                )
                            }
                            disabled={isCodeDisabled || isVerified} // 인증 완료 시 버튼 비활성화
                        >
                            {isVerified ? "인증완료" : "확인"}
                        </button>
                    </div>

                    {/* 비밀번호 입력 섹션 */}
                    <PasswordFields
                        password={password}
                        confirmPassword={confirmPassword}
                        onPasswordChange={setPassword}
                        onConfirmPasswordChange={setConfirmPassword}
                    />

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
                            {error
                                ? error
                                : nickMessage
                                    ? nickMessage
                                    : "닉네임 중복확인을 진행해주세요."}
                        </small>
                    </div>

                    {/* 기타 입력 필드 */}
                    <div className="mb-4">
                        <InputField
                            id="age"
                            type="number"
                            placeholder="나이"
                            min="12"
                            max="65"
                            required
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

export default Register;
