import http from "./httpServices";

interface SignUpData {
    firstName: string;
    lastName: string;
    phoneNumber : string,
    email: string;
    password:string,
    image : string
}

export async function signUpApi(userInfo: SignUpData):Promise<{ message: string, token: string, data: SignUpData }> {
    return http.post('/user', userInfo).then(({data})=> data)
}

export async function loginApi(data: {email: string, password: string}):Promise<{ message: string, token: string, data: SignUpData }> {
    return http.post('/user/login', data).then(({data})=> data)
}