// ✅ pages/Register.jsx
import React, { useState, useEffect } from "react";
import InputField from "../components/Fields/InputField";
import SelectField from "../components/Fields/SelectField";
import PasswordFields from "../components/Fields/PasswordField";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import {
  handleSendVerificationCode,
  handleVerifyCode,
  handleCheckNickname,
  handleSubmitForm,
} from "../handlers/registerHandlers";
import { validatePassword } from "../helpers/validation";

const cities = [
  "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종",
  "경기", "강원", "추북", "추남", "전북", "전남", "경북", "경남", "제주",
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
  const [code, setCode] = useState("");
  const [isCodeDisabled, setIsCodeDisabled] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { checkNickname, register, sendVerificationCode, verifyCode, loading, error, nickMessage } = useRegister();
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isPasswordValid = validatePassword(password).isValid;
    const isPasswordMatch = password === confirmPassword;
    const isNicknameValid = !!nickMessage;
    const isAgeValid = !!age;
    const isGenderValid = !!gender;
    const isRegionValid = !!region;

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
      setIsEmailDisabled(false);
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
    <div className="h-screen w-screen flex justify-center items-center bg-white">
      <div className="w-full max-w-md p-4 border border-black rounded-xl shadow bg-white">
        <h2 className="text-xl font-bold my-4 text-center">MyChat 회원가입</h2>
        <form onSubmit={(e) => handleSubmitForm(e, formData, password, confirmPassword, register, navigate)}>
          <div className="grid grid-cols-3 gap-2 items-center mb-3">
            <div className="col-span-2">
              <InputField
                id="email"
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isEmailDisabled || isVerified}
                className={`${isEmailDisabled || isVerified ? "cursor-not-allowed bg-gray-200" : ""}`}
              />
            </div>
            {timer > 0 && !isVerified ? (
              <div className="w-full h-10 flex items-center justify-center bg-gray-300 text-gray-700 px-2 py-1 rounded text-sm">
                {Math.floor(timer / 60)}분 {timer % 60}초
              </div>
            ) : (
              <button
                type="button"
                className={`w-full h-10 text-sm px-2 py-1 rounded ${isVerified ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"}`}
                onClick={async () => await handleSendVerificationCode(email, setIsEmailDisabled, setTimer, sendVerificationCode)}
                disabled={isVerified}
              >
                {isVerified ? "인증완료" : "인증번호 전송"}
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 items-center mb-3">
            <div className="col-span-2">
              <InputField
                id="code"
                type="text"
                placeholder="인증번호"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={isCodeDisabled || isVerified}
              />
            </div>
            <button
              type="button"
              className={`w-full h-10 text-sm px-2 py-1 rounded ${isCodeDisabled || isVerified ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"}`}
              onClick={async () => {
                await handleVerifyCode(email, code, verifyCode, setIsCodeDisabled, setIsVerified, setTimer, setIsEmailDisabled)
              }}
              disabled={isCodeDisabled || isVerified}
            >
              {isVerified ? "인증완료" : "확인"}
            </button>
          </div>

          <PasswordFields
            password={password}
            confirmPassword={confirmPassword}
            onPasswordChange={setPassword}
            onConfirmPasswordChange={setConfirmPassword}
          />

          <div className="mb-3">
            <div className="grid grid-cols-3 gap-2 items-center">
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
                className={`w-full h-10 text-sm ${loading ? "bg-gray-400" : "bg-black"} text-white px-2 py-1 rounded hover:bg-gray-800`}
                onClick={() => handleCheckNickname(nickname, checkNickname)}
                disabled={loading}
              >
                {loading ? "확인 중..." : "중복확인"}
              </button>
            </div>
            <small className={`block mt-1 text-xs ${error ? "text-red-500" : nickMessage ? "text-green-500" : "text-gray-500"}`}>
              {error ? error : nickMessage ? nickMessage : "닉네임 중복확인을 진행해주세요."}
            </small>
          </div>

          <div className="mb-3">
            <InputField id="age" type="number" placeholder="나이" min="12" max="65" required onChange={(e) => setAge(e.target.value)} />
          </div>
          <div className="mb-3">
            <SelectField id="gender" placeholder="성별 선택" options={["남성", "여성"]} value={gender} onChange={(e) => setGender(e.target.value)} />
          </div>
          <div className="mb-3">
            <SelectField id="region" placeholder="거주지 선택" options={cities} value={region} onChange={(e) => setRegion(e.target.value)} />
          </div>

          <small className="block mt-2 mb-3 text-xs text-center text-gray-500">
            모든 조건이 최적 확정되어야 가입번호가 활성화 됩니다.
          </small>

          <button
            type="submit"
            className={`w-full text-sm p-2 rounded ${isFormValid && !loading ? "bg-black text-white hover:bg-gray-800" : "bg-gray-300 text-gray-700 cursor-not-allowed"}`}
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
