import { useQuery } from "@tanstack/react-query";
import { todoApis } from "../../api/axiosConfig";

const useListTodo = () =>
  useQuery({
    queryKey: ["getTodos"],
    queryFn: async () => {
      try {
        const response = await todoApis?.list();
        return response?.data;
      } catch (error) {}
    },
  });

export default useListTodo;
