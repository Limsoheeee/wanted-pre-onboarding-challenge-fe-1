import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useListTodo from "../../qureys/todo/useListTodo";
import axios from "axios";

const TodoList = () => {
  const navigate = useNavigate();

  const { data, isError, isLoading, refetch } = useListTodo();
  console.log("useListTodo===>", data?.data);

  return (
    <div>
      <h1 onClick={()=>navigate('/')}>todo</h1>
      {data?.data?.length > 0 ? (
        <>
          {data?.data?.map((todo) => {
            return (
              <div key={todo?.id}>
                <p onClick={() => navigate(`/list/${todo?.id}`)}>{todo.title}</p>
              </div>
            );
          })}
        </>
      ) : (
        <p>작성된 글이 없습니다.</p>
      )}
      <button onClick={() => navigate("/create")}>글쓰기</button>
    </div>
  );
};

export default TodoList;
