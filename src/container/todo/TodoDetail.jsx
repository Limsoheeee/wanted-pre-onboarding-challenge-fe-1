import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TodoEdit from "./TodoEdit";

const TodoDetail = () => {
  const { id } = useParams();
  const BASE_URL = process.env.REACT_APP_SERVER;
  const authorization = localStorage.getItem("token");
  const { data, status } = useQuery(["getDetailTodo"], async () => {
    const response = await axios.get(`${BASE_URL}/todos/${id}`, {
      headers: {
        authorization,
      },
    });
    return response.data;
  });

  console.log(data)

  if (status === "error") {
    return <div>error입니다.</div>;
  }
  return (
    <div>
   <TodoEdit data={data}/>
    </div>
  );
};

export default TodoDetail;
