import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useEditTodo from "../../qureys/todo/useEditTodo";
import useDeleteTodo from "../../qureys/todo/useDeleteTodo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const TodoEdit = ({ data }) => {
  const { id } = useParams();
  const BASE_URL = process.env.REACT_APP_SERVER;
  const authorization = localStorage.getItem("token");
  console.log("id1===>", id);
  const navigate = useNavigate();
  const [editData, setEditData] = useState(false);
  const init = {
    title: data?.title,
    content: data?.content,
  };
  const [edit, setEdit] = useState(init);
  const handleEdit = (e) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  const queryClient = useQueryClient();

  const handleRemove = (e) => {
    e.preventDefault();
    const delRes = window.confirm("정말 삭제하시겠습니까?");
    if (delRes) {
      delMutation.mutate({ data: data.id });
    } else {
      alert("취소합니다.");
    }
  };
  //todo 삭제요청
  const delMutation = useMutation(
    (data) => {
      return axios.delete(`${BASE_URL}/todos/${id}`, {
        headers: {
          authorization,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getTodos");
        alert("삭제되었습니다.");
        navigate("/list");
      },
    }
  );

  const onClickEditHandler = (e) => {
    e.preventDefault();
    if(edit.title === data?.title && 
        edit.content === data?.content
        ) {
            alert("변경된 내용이 없습니다.");
            navigate("/list");
        } else {
            editMutation(edit);
        }
    
    setEditData(false);
  };
  //todo 수정요청
  const { mutate: editMutation } = useMutation(
    async (update) => {
      const response = await axios.put(`${BASE_URL}/todos/${id}`, update, {
        headers: {
          authorization,
        },
      });
      return response;
    },
    {
      onError: (error) => {
        alert("게시물 수정을 실패했습니다.");
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries("getTodos");
        alert("게시물이 수정되었습니다.");
        navigate(`/list/${id}`);
      },

      suspense: true,
    }
  );

  return (
    <div>
      {editData ? (
        <div>
          <p>제목</p>
          <input
            type="text"
            name="title"
            defaultValue={data?.data?.title}
            required={data?.data?.title}
            onChange={handleEdit}
          />
          <p>내용</p>
          <textarea
            type="text"
            name="content"
            defaultValue={data?.data?.content}
            required={data?.data?.content}
            onChange={handleEdit}
          />
          <button onClick={onClickEditHandler}>완료</button>
          <button onClick={()=>{navigate(-1)}}>뒤로가기</button>
        </div>
      ) : (
        <div>
            <button onClick={()=>{navigate(-1)}}>뒤로가기</button>
          <p>{data?.data?.title}</p>
          <p>{data?.data?.content}</p>
          <button
            onClick={() => {
              setEditData(!editData);
            }}
          >
            수정
          </button>
          <button onClick={handleRemove}>삭제</button>
        </div>
      )}
    </div>
  );
};

export default TodoEdit;
