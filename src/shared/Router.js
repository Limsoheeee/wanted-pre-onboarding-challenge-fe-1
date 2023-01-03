import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../container/main/Main";
import SignIn from "../container/join/SignIn";
import SignUp from "../container/join/SignUp";
import TodoCreate from "../container/todo/TodoCreate";
import TodoList from "../container/todo/TodoList";
import TodoDetail from "../container/todo/TodoDetail";


const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth/login" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/list" element={<TodoList />} />
        <Route path="/list/:id" element={<TodoDetail />} />
        <Route path="/create" element={<TodoCreate />} />       
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
