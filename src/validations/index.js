import * as yup from 'yup';

const passwordRegExp =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@.#$%^&*()_+]{8,20}$/;

const emailRexExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const serbiaMobileNumberRegExp = /^(\+381|0)(6[0-9])\d{6,8}$/;

export const loginSchema = yup.object({
    emailMailId: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('Email required'),
    password: yup
        .string()
        .matches(
            passwordRegExp,
            'Password must be 8-20 characters with at least one letter, one number, and one special character')
        .required('Password required')

});

export const addMoreDetailsSchema = yup.object({
    emailMail: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('Email required'),
    mobileNumber: yup
        .string()
        .matches(serbiaMobileNumberRegExp, 'Invalid number')
        .required('mobile number required'),
    name: yup
        .string()
        .min(3)
        .max(10),
    newPassword: yup
        .string()
        .matches(
            passwordRegExp,
            'Password must be 8-20 characters with at least one letter, one number, and one special character')
        .required('password required'),
    location: yup
        .string()
        .required('location required'),
    landmark: yup
        .string()
        .required('landmark required'),
        itemDescription: yup
        .string()
        .required('item description requires'),
        itemCategory: yup
        .string()
        .required("category required"),
        itemName: yup
        .string()
        .required('item name required')

})

export const AdminsignInSchema = yup.object({
    username: yup
        .string()
        .required('username required'),
    password: yup
        .string()
        .matches(
            passwordRegExp,
            'Password must be 8-20 characters with at least one letter, one number, and one special character')
        .required('Password required')

});