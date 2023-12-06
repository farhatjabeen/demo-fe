import * as yup from 'yup';

const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@.#$%^&*()_+]{8,20}$/;

const emailRexExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

// const serbiaMobileNumberRegExp = /^(\+381|0)(6[0-9])\d{6,8}$/;

export const loginSchema = yup.object({
    emailMailId: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('email required'),
    password: yup
        .string()
        .matches(
            passwordRegExp,
            'Password must be 8-20 characters with at least one letter, one number, and one special character')
        .required('password required')

});

export const generalUserMailSchema = yup.object({
    emailMailId: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('email required'),
    password: yup
        .string()
        .required("password required")
});

export const generalUserRegisterSchema = yup.object({
    emailMailId: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('email required'),
    newPassword: yup
        .string()
        .matches(
            passwordRegExp,
            'Password must be 8-20 characters with at least one letter, one number, and one special character')
        .required('password required'),
    password: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwords does not match")
        .required("Please re-type your password")
});

export const addMoreDetailsSchema = yup.object({
    emailMail: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('email required'),
    mobileNumber: yup
        .string()
        .min(10)
        // .matches(serbiaMobileNumberRegExp, 'Invalid number')
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
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwords does not match")
        .required("Please re-type your password"),
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
        .required('item name required'),
    keywords: yup
        .string()
        .test('wordCount', 'Keywords must have at least 2 keys', (value) => {
            if (!value) {
                return false;
            }
            const words = value.trim().split(/\s+/);
            return words.length >= 2;
        })
        .required('keywords required'),
    imageUpload: yup
        .mixed()
        .test('imageCount', 'Maximum of 3 images only allowed.', (value) => {
            if (!value) {
                return false;
            }
            return value.length > 3;
        })
        .required('images required'),

});

export const companyProfile = yup.object({
    companyCategory: yup
        .string()
        .required("company category required"),
    companyName: yup
        .string()
        .required('company name required'),
    companyLocation: yup
        .string()
        .required('company location required'),
    name: yup
        .string()
        .min(3)
        .max(10),
    emailMailId: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('email required'),
    mobileNumber: yup
        .number()
        .min(10)
        .required('mobile number required'),
});

export const AdminSignInSchema = yup.object({
    emailMailId: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('email required'),
    password: yup
        .string()
        .matches(
            passwordRegExp,
            'Password must be 8-20 characters with at least one letter, one number, and one special character')
        .required('password required'),
});

export const contactUsSchema = yup.object({
    mail: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('email required'),
    subject: yup
        .string()
        .min(3)
        .max(15)
        .required('subject required'),
    message: yup
        .string()
        .test('wordCount', 'Description must have at least 5 words', (value) => {
            if (!value) {
                return false;
            }
            const words = value.trim().split(/\s+/);
            return words.length >= 5;
        })
        .required('description required')
});

export const businessSignUpSchema = yup.object({
    emailMailId: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('email required'),
    password: yup
        .string()
        .matches(
            passwordRegExp,
            'Password must be 8-20 characters with at least one letter, one number, and one special character')
        .required('password required'),
    mobileNumber: yup
        .number()
        .min(10)
        .required('mobile number required'),
    name: yup
        .string()
        .min(3)
        .max(10),
    companyName: yup
        .string()
        .required('company name required'),
    companyCategory: yup
        .string()
        .required("company category required"),
    keywords: yup
        .string()
        .test('wordCount', 'Keywords must have at least 2 keys', (value) => {
            if (!value) {
                return false;
            }
            const words = value.trim().split(/\s+/);
            return words.length >= 2;
        })
        .required('keywords required')
});

export const searchSchema = yup.object({
    itemName: yup
        .string()
        .required('item name required'),
    location: yup
        .string()
        .required('location required')
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
        .matches(
            /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
            'Invalid time format (HH:mm)'
        )
        .required("time required"),
    foundLocation: yup
        .string()
        .required('location required'),
    itemName: yup
        .string()
        .required('item name required'),
    itemDescription: yup
        .string()
        .test('wordCount', 'Description must have at least 5 words', (value) => {
            if (!value) {
                return false;
            }
            const words = value.trim().split(/\s+/);
            return words.length >= 5;
        })
        .required('description required')

})

