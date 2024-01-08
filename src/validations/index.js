import * as yup from 'yup';

const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@.#$%^&*()_+]{8,20}$/;

const emailRexExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const serbiaMobileNumberRegExp = /^(\+381|0)6[0-9]\d{6,7}$/;

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

export const generalUserMailSchema = yup.object({
    emailMailId: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('Email required')
});

export const generalUserLoginSchema = yup.object({
    password: yup
        .string()
        .required("Password required")
});

export const generalUserRegisterSchema = yup.object({
    emailMailId: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('Email required'),
    password: yup
        .string()
        .required("Please re-type your password")
        .oneOf([yup.ref('newPassword')], "Passwords does not match"),
    newPassword: yup
        .string()
        .matches
        (
            passwordRegExp,
            'Password must be 8-20 characters with at least one letter, one number, and one special character'
        )

        .required('Password required')

});
export const businessUserForgotSchema = yup.object({
    password: yup
        .string()
        .matches(
            passwordRegExp,
            'Password must be 8-20 characters with at least one letter, one number, and one special character')
        .required('Password required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords does not match")
        .required("Please re-type your password")
});

export const addMoreDetailsSchema = yup.object({
    emailMailId: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('Email required'),
    mobileNumber: yup
        .string()
        .min(10)
        .matches(serbiaMobileNumberRegExp, 'Invalid number')
        .required('Mobile number required'),
    userName: yup
        .string()
        .min(3),
    location: yup
        .string()
        .required('Location required'),
    locationIdentifiers: yup
        .string()
        .required('Landmark required'),
    itemDescription: yup
        .string()
        .required('Item description requires'),
    itemCategory: yup
        .string()
        .required("Category required"),
    itemName: yup
        .string()
        .required('Item name required'),
    keywords: yup
        .mixed()
        .required('Keywords required')

});

export const myProfileSchema = yup.object({
    emailMailId: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('Email required'),
    mobileNumber: yup
        .string()
        .min(10)
        // .matches(serbiaMobileNumberRegExp, 'Invalid number')
        .required('Mobile number required'),
    name: yup
        .string()
        .min(3),
    currentPassword: yup
        .string(),
    newPassword: yup
        .string(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwords does not match"),

});

export const companyProfile = yup.object({
    companyCategory: yup
        .string()
        .required("Company category required"),
    companyName: yup
        .string()
        .required('Company name required'),
    companyLocation: yup
        .string()
        .required('Company location required'),
    name: yup
        .string()
        .min(3)
        .max(10),
    emailMailId: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('Email required'),
    mobileNumber: yup
        .string()
        .min(10)
        .required('Mobile number required'),
    currentPassword: yup
        .string(),
    newPassword: yup
        .string(),
    // .matches(
    //     passwordRegExp,
    //     'Password must be 8-20 characters with at least one letter, one number, and one special character'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwords does not match")
});

export const AdminSignInSchema = yup.object({
    emailMailId: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('Email required'),
    password: yup
        .string()
        .matches(
            passwordRegExp,
            'Password must be 8-20 characters with at least one letter, one number, and one special character')
        .required('Password required'),
});

export const contactUsSchema = yup.object({
    mail: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('Email required'),
    subject: yup
        .string()
        .min(3)
        .max(15)
        .required('Subject required'),
    message: yup
        .string()
        .test('wordCount', 'Description must have at least 5 words', (value) => {
            if (!value) {
                return false;
            }
            const words = value.trim().split(/\s+/);
            return words.length >= 5;
        })
        .required('Description required')
});

export const businessSignUpSchema = yup.object({
    emailMailId: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('Email required'),
    password: yup
        .string()
        .matches(
            passwordRegExp,
            'Password must be 8-20 characters with at least one letter, one number, and one special character')
        .required('Password required'),
    mobileNumber: yup
        .string()
        .min(10)
        .required('Mobile number required'),
    name: yup
        .string()
        .min(3)
        .max(10),
    companyName: yup
        .string()
        .required('Company name required'),
    companyCategory: yup
        .string()
        .required("Company category required"),
    checkboxField: yup
        .boolean()
        .oneOf([true], 'Checkbox must be checked')
});

export const searchSchema = yup.object({
    itemName: yup
        .string()
        .required('Item name required'),
    location: yup
        .string()
        .required('Location required')
});

export const searchByKeywordSchema = yup.object({
    keyword: yup
        .string()
        .required('Item name required'),
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
    itemName: yup
        .string()
        .required('Item name required'),
    itemDescription: yup
        .string()
        .test('wordCount', 'Description must have at least 5 words', (value) => {
            if (!value) {
                return false;
            }
            const words = value.trim().split(/\s+/);
            return words.length >= 5;
        })
        .required('Description required')

})

