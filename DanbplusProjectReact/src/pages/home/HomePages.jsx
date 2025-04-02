import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        React 홈페이지 예제 🚀
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        React + React Router로 만든 심플한 홈페이지입니다.
      </p>
      <a
        href="/login"
        className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        로그인 하러 가기
      </a>
    </div>
  );
};

export default HomePage;