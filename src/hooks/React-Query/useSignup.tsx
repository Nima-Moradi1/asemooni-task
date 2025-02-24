import { signUpApi } from "@/services/authServices"
import { QueryClient, useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
interface SignUpData {
    firstName: string;
    lastName: string;
    phoneNumber : string,
    email: string;
    password:string,
    image : string
}
export const useUserSignup = () => {
    const queryClient = new QueryClient()
    const {isPending : isSigning , mutate : userSignup} = useMutation({
        mutationFn : signUpApi , 
        onSuccess : async (data : {message : string , token:string , data:SignUpData })=> {
            toast.success(data.message)
            queryClient.invalidateQueries({
                queryKey : ['get-user']
            })
           
        } ,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError : (err: any) => {
            const errorMsg = err?.response?.data?.message;
            if(errorMsg.startsWith('Duplicate')) {
                toast.error('ایمیل یا شماره همراه تکراری است')
            }
        }
    })
    return {isSigning , userSignup }
}