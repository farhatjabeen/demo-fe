import * as yup from 'yup';

const passwordRegExp =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@.#$%^&*()_+]{8,20}$/;

const emailRexExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const loginSchema = yup.object({
    emailMailId: yup
        .string()
        .matches(emailRexExp, 'Invalid email address')
        .required('Email is required'),
    password: yup
        .string()
        .matches(
            passwordRegExp,
            'Password must be 8-20 characters with at least one letter, one number, and one special character')
        .required('Password is required')
});

