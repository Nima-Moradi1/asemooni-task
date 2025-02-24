import http from "./httpServices";

export async function getUserProfile(){
    return http.get('/user/profile').then(({data})=>data.data)
}

export async function uploadApi(file: File){
    return http.post('/upload', file).then(({data})=>data)
}