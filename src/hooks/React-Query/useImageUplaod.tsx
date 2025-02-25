import { uploadImageApi } from "@/services/userServices"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"


export const useImageUpload = () => {
    const {isPending:isUploading, mutate:uploadImage} = useMutation({
        mutationFn: uploadImageApi,
        onSuccess : () => {
            toast.success('Image uploaded successfully')
        }, 
        onError : (error) => {
            toast.error('Image upload failed')
            console.log(error);
        }
    })
    return {isUploading, uploadImage}
}