const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    // Nombre y Apellido (Solo letras, min 2)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/;

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

export const validateSignupForm = (data) => {
    const errors = {};

    if (!data.firstName) errors.firstName = "First name is required";
    else if (!nameRegex.test(data.firstName)) errors.firstName = "Invalid name (letters only)";

    if (!data.lastName) errors.lastName = "Last name is required";
    else if (!nameRegex.test(data.lastName)) errors.lastName = "Invalid last name (letters only)";

    // Email
    if (!data.email) errors.email = "Email is required";
    else if (!emailRegex.test(data.email)) errors.email = "Invalid email format";

    // Teléfono (Opcional, pero si se pone, debe ser numérico)
    if (data.phone && !/^\d{7,15}$/.test(data.phone)) {
        errors.phone = "Invalid phone (7-15 digits)";
    }

    // Password
    if (!data.password) errors.password = "Password is required";
    else if (data.password.length < 6) errors.password = "Minimum 6 characters";

    // Confirmar Password
    if (data.confirmPassword !== data.password) {
        errors.confirmPassword = "Passwords do not match";
    }

    // Términos
    if (!data.terms) errors.terms = "You must accept the terms";

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};