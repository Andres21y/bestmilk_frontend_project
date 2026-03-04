const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


export const validateLoginForm = (email, password) => {
    const errors = {};

    // Validación de Email
    if (!email) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
        errors.email = "Invalid email format";
    }

    // Validación de Password
    if (!password) {
        errors.password = "Password is required";
    } else if (password.length < 8) {
        errors.password = "It must have at least 8 characters";
    } else if (!passwordRegex.test(password)) {
        errors.password = "It must include uppercase letters, lowercase letters, numbers, and special characters";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};