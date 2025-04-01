import React from "react";

function FindMyPW() {
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl border-2 border-black shadow">
        <h2 className="text-2xl font-bold mb-10 text-center">비밀번호 찾기</h2>

        <form className="space-y-6">
        
          {/* 저장 버튼 */}
          <div className="text-center pt-4">
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
              >
                인증하기
              </button>

            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

export default FindMyPW;
