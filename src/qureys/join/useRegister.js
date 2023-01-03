import { useMutation } from "@tanstack/react-query";
import { memberApis } from "../../api/axiosConfig";

const useRegister = (values) => {
  return useMutation(
    {
      mutationFn: async (values) => {
        try {
          const res = await memberApis.signUp(values);
          return res;
        } catch (error) {}
      },
    },
    { onSuccess: () => {}, onError: (error) => {} }
  );
};

export default useRegister;
