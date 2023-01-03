import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRegister from "../../qureys/join/useRegister";

const SignUp = () => {
  const navigate = useNavigate();
  const init = {
    email: "",
    password: "",
  };

  const { mutate: signUpSubmitMutate } = useRegister();
  const [input, setInput] = useState(init);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/i.test(
        input.email.trim()
      )
    ) {
      return alert("이메일 형식에 맞지 않습니다.");
    } else if (input.password.trim().length <= 8) {
      return alert("비밀번호는 8자 이상 입력해주세요.");
    }
    signUpSubmitMutate(input);
    alert("회원가입 성공");
    navigate("/auth/login");
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <h1>회원가입</h1>
      <p>이메일</p>
      <input
        type="email"
        name="email"
        value={input.email}
        placeholder="이메일 입력해주세요."
        onChange={(e) => onChangeHandler(e)}
      />
      <p>비밀번호</p>
      <input
        type="password"
        name="password"
        value={input.password}
        placeholder="비밀번호를 입력해주세요."
        onChange={(e) => onChangeHandler(e)}
      />
      <button>등록</button>
    </form>
  );
};

export default SignUp;
