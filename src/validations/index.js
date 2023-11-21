import * as yup from 'yup';

const passwordRegExp =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@.#$%^&*()_+]{8,20}$/;

const emailRexExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const serbiaMobileNumberRegExp = /^(\+381|0)(6[0-9])\d{6,8}$/;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
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
        .min(3)
        .max(10)
        .required('username required'),
    password: yup
        .string()
        .matches(
            passwordRegExp,
            'Password must be 8-20 characters with at least one letter, one number, and one special character')
        .required('Password required')

});
export const AdminChangePasswordSchema = yup.object({
    currentPassword: yup
        .string()
        .matches(
            passwordRegExp,
            'Password must be 8-20 characters with at least one letter, one number, and one special character')
        .required(' Current Password required'),
    newPassword: yup
        .string()
        .matches(
            passwordRegExp,
            'Password must be 8-20 characters with at least one letter, one number, and one special character')
        .required(' New Password required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});
export const editFoundItemsSchema = yup.object({

    founderName: yup
        .string()
        .min(3)
        .max(10)
        .required('name required'),
    mobileNumber: yup
        .string()
        .matches(phoneRegExp, 'Invalid')
        .required('mobile number required'),
    foundDate: yup
        .string()
        .required("date required"),
    foundTime: yup
        .string()
        .required("time required"),
    foundLocation: yup
        .string()
        .required('location required'),
    itemName: yup
        .string()
        .required('item name required'),
    itemDescription: yup
        .string()
        .required('item description requires'),

})