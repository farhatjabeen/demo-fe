import * as yup from 'yup';

const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@.#$%^&*()_+]{8,20}$/;
const emailRexExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nameRegex = /^(?!.*\d)(?!.*\s{2,})[a-zA-Z]([a-zA-Z0-9\s]*[a-zA-Z])?$/;
const spaceRegex = /^(?!\s)(?!.*\s{2,})(.*\S.*)?$/;
const specialCharacterRegex = /^[a-zA-Z0-9\s]+$/;
const serbiaMobileNumberRegExp = /^6[0-9]\d{7,8}$/;

export const loginSchema = yup.object({
    emailMailId: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('Email required'),
    password: yup
        .string()
        .matches(spaceRegex, 'Invalid characters found')
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

    password: yup
        .string()
        .required("Please re-type your password")
        .oneOf([yup.ref('newPassword')], "Passwords does not match"),
    newPassword: yup
        .string()
        .matches(spaceRegex, 'Invalid characters found')
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
        .matches(serbiaMobileNumberRegExp, 'Invalid number')
        .required('Mobile number required'),
    userName: yup
        .string()
        .min(3,'Name must be atleast 3 characters')
        .matches(nameRegex, 'Invalid characters used')
        .required('Name required'),
    location: yup
        .string()
        .required('Location required'),
    locationIdentifiers: yup
        .string()
        .matches(spaceRegex, 'Invalid characters found')
        .required('Landmark required'),
    itemDescription: yup
        .string()
        .matches(spaceRegex, 'Invalid characters found')
        .required('Item description required'),
    itemCategory: yup
        .string()
        .required("Category required"),
    itemName: yup
        .string()
        .matches(specialCharacterRegex, 'Invalid characters found')
        .required('Item name required'),
    keywords: yup
        .string()
        .matches(spaceRegex, 'Invalid characters found')
        .required('Keywords required')

});

export const addMoreDetailsItemSchema = yup.object().shape({
    emailMailId: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('Email required'),
    mobileNumber: yup
        .string()
        .matches(serbiaMobileNumberRegExp, 'Invalid number')
        .required('Mobile number required'),
    userName: yup
        .string()
        .min(3,'Name must be atleast 3 characters')
        .matches(nameRegex, 'Invalid characters used')
        .required('Name required'),
    location: yup
        .string()
        .required('Location required'),
    locationIdentifiers: yup
        .string()
        .matches(spaceRegex, 'Invalid characters found')
        .matches(nameRegex, 'Invalid characters used')
        .required('Landmark required'),
    itemDescription: yup
        .string()
        .matches(spaceRegex, 'Invalid characters found')
        .required('Item description required'),
    itemCategory: yup
        .string()
        .required("Category required"),
    itemName: yup
        .string()
        .matches(spaceRegex, 'Invalid characters found')
        .required('Item name required'),
    itemImage: yup
        .mixed()
        .required('Images required'),
    keywords: yup
        .string()
        .matches(spaceRegex, 'Invalid characters found')
        .required('Keywords required')

});

export const myProfileSchema = yup.object({
    emailMailId: yup
        .string()
        .email()
        // .matches(emailRexExp, 'Invalid email address')
        .required('Email required'),
    mobileNumber: yup
        .string()
        .matches(serbiaMobileNumberRegExp, 'Invalid number')
        .required('Mobile number required'),
    name: yup
        .string()
        .min(3,'Name must be atleast 3 characters')
        .matches(nameRegex, 'Invalid characters used')
        .required('Name required'),
    currentPassword: yup
        .string(),
    newPassword: yup
        .string(),
    // .matches(passwordRegExp, 'Strong password expected'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwords do not match"),
});



export const companyProfile = yup.object({
    companyCategory: yup
        .string()
        .required("Company category required"),
    companyName: yup
        .string()
        .matches(specialCharacterRegex, 'Invalid characters used')
        .required('Company name required'),
    companyLocation: yup
        .string()
        .required('Company location required'),
    name: yup
        .string()
        .min(3,'Name must be atleast 3 characters')
        .matches(nameRegex, 'Invalid characters used')
        .required('Name required'),
    emailMailId: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('Email required'),
    mobileNumber: yup
        .string()
        .matches(serbiaMobileNumberRegExp, 'Invalid number')
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
        .min(3,'Name must be atleast 3 characters')
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
        .matches(serbiaMobileNumberRegExp, 'Invalid number')
        .required('Mobile number required'),
    name: yup
        .string()
        .min(3,'Name must be atleast 3 characters')
        .matches(nameRegex, 'Invalid characters used')
        .required('Name required'),
    companyName: yup
        .string()
        .matches(spaceRegex, 'Invalid characters found')
        .required('Company name required'),
    companyCategory: yup
        .string()
        .required("Company category required")
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
    location: yup
        .string()
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

