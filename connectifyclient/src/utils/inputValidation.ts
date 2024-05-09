// Функция проверки пароля
export const isValidPassword = (password: string): boolean => {
    // Пароль должен содержать как минимум одну цифру, одну маленькую букву, одну большую букву и один специальный символ
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
};

// Функция проверки email
export const isValidEmail = (email: string): boolean => {
    // Простейшая проверка на соответствие формату email-адреса
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
