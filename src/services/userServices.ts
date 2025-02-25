import http from "./httpServices";

export async function getUserProfile(){
    return http.get('/user/profile').then(({data})=>data.data)
}

export async function uploadImageApi(data: FormData){
    return http.post('/upload', data).then(({data})=>data)
}