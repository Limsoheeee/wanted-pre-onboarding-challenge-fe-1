import { useMutation } from "@tanstack/react-query";
import { memberApis } from "../../api/axiosConfig";

const useJoinIn = values => {
  return useMutation(
    {
      mutationFn: async (values) => {        
        try {
          const res = await memberApis.login(values);
          console.log("res====>",res);
          return res;
        } catch (error) {}
      },
    },    
  );
};

export default useJoinIn;
