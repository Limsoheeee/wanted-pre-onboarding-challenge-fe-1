import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreateTodo from "../../qureys/todo/useCreateTodo";

const TodoCreate = () => {
  const navigate = useNavigate();

  const init = {
    title: "",
    content: "",
  };

  const [input, setInput] = useState(init);

  const { mutate: todoSubmitMutate } = useCreateTodo();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    todoSubmitMutate(input,{
      onSuccess: (data) => {
        console.log("success", data);
        if (
          data.status === 200
        ) {
          // localStorage.setItem("token", data.data.token);
          alert("게시글 등록이 되었습니다.");
          navigate("/list");
        }
      },
      onError: (error) => {
        throw error;
      },
    }, );
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <h1>todo작성</h1>
      <p>제목</p>
      <input
        type="text"
        name="title"
        value={input?.title}
        placeholder="제목을 입력해주세요."
        onChange={onChangeHandler}
      />
      <p>내용</p>
      <textarea type="text" name="content" value={input?.content} placeholder="내용을 입력해주세요."
        onChange={onChangeHandler}/>
      <br />
      <button>등록</button>
    </form>
  );
};

export default TodoCreate;
