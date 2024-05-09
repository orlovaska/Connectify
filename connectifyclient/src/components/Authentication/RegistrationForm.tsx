import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import AuthService from "../../services/AuthService";
import { userSlice } from "../../store/reducers/UserSlice";
import { isValidEmail, isValidPassword } from "../../utils/inputValidation";
import { useAppDispatch } from "../../hooks/redux";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../routing/routesConsts";

interface IRegistrationFormProps {}

const RegistrationForm: React.FC<IRegistrationFormProps> = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { t } = useTranslation("common");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUsername(event.target.value);
        if (error) setError(null); // Сброс ошибки при изменении ввода
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        if (error) setError(null); // Сброс ошибки при изменении ввода
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
        if (error) setError(null); // Сброс ошибки при изменении ввода
    };

    const handleSubmit = async () => {
        if (!username) {
            setError(t("auth.errors.invalidUsernameFormat"));
            return;
        }
        if (!isValidEmail(email)) {
            setError(t("auth.errors.invalidEmailFormat"));
            return;
        }
        if (!isValidPassword(password)) {
            setError(t("auth.errors.invalidPasswordFormat"));
            return;
        }

        try {
            const response = await AuthService.registration(
                username,
                email,
                password
            );
            const loginResponse = await AuthService.login(username, password);
            const { login } = userSlice.actions;
            dispatch(login(loginResponse.data.user));
            navigate(HOME_ROUTE, { replace: true });
        } catch (err) {
            setError(t("auth.errors.registrationFailed"));
        }
    };

    return (
        <div
            style={{
                width: "300px",
                padding: "20px",
                backgroundColor: "#f0f0f0",
                textAlign: "center",
            }}
        >
            <h2>{t("auth.registration")}</h2>
            <TextField
                fullWidth
                id="username"
                label={t("auth.username")}
                variant="outlined"
                size="small"
                onChange={handleUsernameChange}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                id="email"
                label={t("auth.email")}
                type="email"
                variant="outlined"
                size="small"
                onChange={handleEmailChange}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                id="password"
                label={t("auth.password")}
                type="password"
                variant="outlined"
                size="small"
                onChange={handlePasswordChange}
                sx={{ mb: 2 }}
            />
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <Button
                fullWidth
                variant="contained"
                color="primary"
                size="small"
                onClick={handleSubmit}
                sx={{ mb: 2 }}
            >
                {t("auth.signUp")}
            </Button>
            <p>
                {t("auth.alreadyHaveAccount")}{" "}
                <Link to={LOGIN_ROUTE}>{t("auth.signIn")}</Link>
            </p>
        </div>
    );
};

export default RegistrationForm;
