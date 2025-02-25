import * as yup from 'yup' ;



const step1Schema = yup.object({
    phoneNumber: yup.string().matches(/^[0-9]{11}$/, 'شماره همراه نامعتبر است').required('شماره همراه الزامی است'),
});
  
  const step2Schema = yup.object({
    firstName: yup.string().required('نام الزامی است'),
    lastName: yup.string().required('نام خانوادگی الزامی است'),
    email: yup.string().email('ایمیل نامعتبر است').required('ایمیل الزامی است'),
    password: yup
    .string()
    .min(8, 'پسورد باید حداقل ۸ کاراکتر باشد')
    .matches(/[A-Za-z]/, 'پسورد باید حداقل یک حرف داشته باشد')
    .matches(/\d/, 'پسورد باید حداقل یک عدد داشته باشد')
    .required('پسورد الزامی است'),    
     });
  
  const step3Schema = yup.object({
    image : yup.string().required('تصویر الزامی است')
  });
  
  export const SignupSchema = (step: number) => {
    switch (step) {
      case 1:
        return step1Schema;
      case 2:
        return step2Schema;
      case 3:
        return step3Schema;
      default:
        return yup.object({});
    }
  };

export const LoginSchema = yup.object({
    email: yup.string().email('ایمیل نامعتبر است').required('ایمیل الزامی است'),
    password: yup.string().required('پسورد الزامی است'),
})