import { todoIdApis } from "../../api/axiosConfig";
import { useMutation } from "@tanstack/react-query";

const editDetailTodo = ({ id, edit }) => {
    console.log("id, payload===>",id, edit)
	return todoIdApis({
		method: "put",
		url: `/todo/${id}`,
		edit,
	});
};

const useEditTodo = payload => {
	return useMutation({
		mutationFn: async payload => {
			const response = await editDetailTodo(payload,{
                headers: {
                    Authorization: localStorage.getItem("token")}
            });
			return response;
		},
		suspense: true,
	});
};

export default useEditTodo;
