import { useMutation } from "@tanstack/react-query";
import { todoApis } from "../../api/axiosConfig";

const useCreateTodo = (values) => {
  return useMutation(
    {
      mutationFn: async (values) => {
        try {
          const res = await todoApis.create(values);
          return res;
        } catch (error) {}
      },
    },
    { onSuccess: () => {}, onError: (error) => {} }
  );
};

export default useCreateTodo;
