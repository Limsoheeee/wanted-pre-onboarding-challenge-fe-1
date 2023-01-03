import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { resetToken } from "../../recoil/Atom";

const Main = () => {
  const navigate = useNavigate();
  const authorization = localStorage.getItem("token");
  const [token, setToken] = useRecoilState(resetToken);
  return (
    <div>
      { authorization ? (
        <button
          onClick={() => {
            localStorage.removeItem('token');
            alert("로그아웃이 완료되었습니다.")
            navigate("/");
          }}
        >
          로그아웃
        </button>
      ) : (
        <button onClick={() => navigate("/auth/login")}>로그인</button>
      )}
      <button onClick={() => navigate("/auth/signup")}>회원가입</button>
    </div>
  );
};

export default Main;
