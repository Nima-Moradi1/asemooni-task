import * as yup from 'yup' ;

export const SignupSchema = yup.object({
    firstName: yup.string().required('نام الزامی است'),
    lastName: yup.string().required('نام خانوادگی الزامی است'),
    email: yup.string().email('ایمیل نامعتبر است').required('ایمیل الزامی است'),
    password: yup
    .string()
    .min(8, 'پسورد باید حداقل ۸ کاراکتر باشد')
    .matches(/[A-Za-z]/, 'پسورد باید حداقل یک حرف داشته باشد')
    .matches(/\d/, 'پسورد باید حداقل یک عدد داشته باشد')
    .required('پسورد الزامی است'),    phoneNumber: yup.string().matches(/^[0-9]{11}$/, 'شماره همراه نامعتبر است').required('شماره همراه الزامی است'),
    image : yup.string().required('تصویر الزامی است').default('https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png')
})

export const LoginSchema = yup.object({
    email: yup.string().email('ایمیل نامعتبر است').required('ایمیل الزامی است'),
    password: yup.string().required('پسورد الزامی است'),
})