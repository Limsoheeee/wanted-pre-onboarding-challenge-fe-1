import { todoIdApis } from "../../api/axiosConfig";
import { useMutation } from "@tanstack/react-query";

const deleteDetailTodo = id => {
	return todoIdApis({
		method: "delete",
		url: `/todo/${id}`,
	});
};

const useDeleteTodo = payload => {
	return useMutation({
		mutationFn: async payload => {
			const response = await deleteDetailTodo(payload,{
                headers: {
                    Authorization: localStorage.getItem("token")}
            });
			return response;
		},
		suspense: true,
	});
};

export default useDeleteTodo;