const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const NUMBER_PATTERN = /^[0-9]*$/
const TEXT_PATTERN = /^[a-zA-Z ]*$/
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,15}$/


const isValidEmail = (email = "") => {
    return EMAIL_PATTERN.test(email);
}

const isValidNumber = (number = "") => {
    return NUMBER_PATTERN.test(number);
}

const isValidAlphabet = (text = "") => {
    return TEXT_PATTERN.test(text);
}

const isValidPassword = (password = "") => {
    return PASSWORD_PATTERN.test(password);
}

const Validation = {
    isValidAlphabet,
    isValidEmail,
    isValidNumber,
    isValidPassword
};


export default Validation;
