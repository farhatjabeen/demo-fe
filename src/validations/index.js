import * as yup from 'yup';

const passwordRegExp =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@.#$%^&*()_+]{8,20}$/;

const emailRexExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
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
        .required('item name required')

})

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
    password: yup
        .string()
        .matches(
            passwordRegExp,
            'Password must be 8-20 characters with at least one letter, one number, and one special character')
        .required('password required'),
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
});

export const contactUsSchema = yup.object({
    emailMailId: yup
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
                // Handle the case where the value is empty or undefined
                return false;
            }

            // Split the string into words and count them
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
    password: yup
        .string()
        .matches(
            passwordRegExp,
            'Password must be 8-20 characters with at least one letter, one number, and one special character')
        .required('password required')
});

export const searchReport = yup.object({
    itemName: yup
        .string()
        .required('item name required'),
    location: yup
        .string()
        .required('location required')
});