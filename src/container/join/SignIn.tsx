import{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { memberApis } from "../../api/axiosConfig";
import useJoinIn from "../../qureys/join/useJoinIn"
import axios from "axios";


const SignIn = () => {
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_SERVER;

  interface InputType {
    email: string;
    password: string;
  };
    
  const init = {
    email: "",
    password: "",
  };  
  const [input, setInput] = useState<InputType | null>(init); 

  const { mutate: signInSubmitMutate } = useJoinIn();

  const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onSubmitHandler = (e) =>{
    e.preventDefault();
    signInSubmitMutate(input,
      {
      onSuccess: (data) => {
        console.log("success", data);
        if (
          data?.status === 200 &&
          data?.data.token !== undefined &&
          data?.data.token !== null
        ) {
          localStorage.setItem("token", data?.data.token);
          alert(data?.data.message);
          navigate("/list");
        } else {
          alert("회원정보가 일치하지않습니다.")
        }
      },
      onError: (error) => {
        throw error;
      },
    },   
    )
  }

  return (
    <form onSubmit={onSubmitHandler}>
        <h1>로그인</h1>
      <p>이메일</p>
      <input
        type="email"
        name="email"
        value={input.email}
        placeholder="이메일 입력해주세요."
        onChange={ onChangeHandler}
      />
      <p>비밀번호</p>
      <input
        type="password"
        name="password"
        value={input.password}
        placeholder="비밀번호를 입력해주세요."
        onChange={onChangeHandler}
      />
      <button type="submit">로그인</button>
      <br></br>
      <button type="button" onClick={()=>navigate("/auth/signup")}>회원가입</button>
    </form>
  );
};

export default SignIn;
