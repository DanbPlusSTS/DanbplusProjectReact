import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError(""); // 오류 메시지 초기화

    // 로그인 데이터 콘솔 출력 (이 부분을 추가!)
    console.log("id : " + email + " pw : " + password);

    try {
      const response = await fetch("http://localhost:8080/api/v1/login/login.act", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: email, pw: password }), // 백엔드에서 요구하는 데이터 형식 맞추기
      });

      const data = await response.json();

      if (response.ok) {
        alert("로그인 성공!");
        console.log("Login Success:", data);
        window.location.href = "/";
      } else {
        setError(data.message || "로그인 실패!");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("서버와 연결할 수 없습니다.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg border-0 rounded-lg" style={{ width: "25rem" }}>
        <div className="card-header text-center fw-bold fs-4">로그인</div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              id="rememberId"
            />
            <label className="form-check-label" htmlFor="rememberId">
              아이디 저장
            </label>
          </div>
          <button className="btn btn-primary w-100" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
