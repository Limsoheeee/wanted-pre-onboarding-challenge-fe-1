import { useMutation } from "@tanstack/react-query";
import { memberApis } from "../../api/axiosConfig";

interface InputType {
  email: string;
  password: string;
};

const useJoinIn = () => {
  return useMutation(
    {
      mutationFn: async (values:InputType) => {        
        try {
          const res:any  = await memberApis.login(values);
          console.log("res====>",res);
          return res;
        } catch (error:any) {}
      },
    },    
  );
};

export default useJoinIn;
