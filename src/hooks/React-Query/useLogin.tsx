import { SignupProps } from "@/components/(auth)/SignupForm"
import { loginApi } from "@/services/authServices"
import { QueryClient, useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useUserLogin = () => {
    const queryClient = new QueryClient()
    const {isPending : isLogging , mutate : userLogin} = useMutation({
        mutationFn : loginApi , 
        onSuccess : async (data : {message : string , token:string, data:SignupProps})=> {
            toast.success(data.message)
            queryClient.invalidateQueries({
                queryKey : ['get-user']
            })
           
        } ,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError : (err: any) => {
            const errorMsg = err?.response?.data?.message
            console.log(err);
            toast.error(errorMsg)
        }
    })
    return {isLogging , userLogin }
}