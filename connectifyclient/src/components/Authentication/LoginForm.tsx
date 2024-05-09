import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import AuthService from "../../services/AuthService";
import { userSlice } from "../../store/reducers/UserSlice";
import { isValidPassword } from "../../utils/inputValidation";
import { useAppDispatch } from "../../hooks/redux";
import { HOME_ROUTE, REGISTRATION_ROUTE } from "../../routing/routesConsts";

interface ILoginProps {}

const LoginForm: React.FC<ILoginProps> = () => {
    const { t } = useTranslation("common");
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    const handleSubmit = async () => {
        if (!username) {
            setError(t("auth.errors.invalidUsernameFormat"));
            return;
        }
        if (!isValidPassword(password)) {
            setError(t("auth.errors.invalidPasswordFormat"));
            return;
        }

        try {
            const response = await AuthService.login(username, password);
            const { login } = userSlice.actions;
            dispatch(login(response.data.user));
            navigate(HOME_ROUTE, { replace: true });
        } catch (err) {
            if (error) {
                setError(t("auth.errors.wrongLogOrPass"));
            }
        }
    };

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUsername(event.target.value);
        if (error) setError(null); // Сброс ошибки при изменении ввода
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
        if (error) setError(null); // Сброс ошибки при изменении ввода
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
            <h2>{t("auth.login")}</h2>
            <TextField
                fullWidth
                id="username"
                label={t("auth.username")}
                variant="outlined"
                size="small"
                onChange={handleUsernameChange}
                sx={{ mb: 2 }} // Добавление отступа снизу
            />
            <TextField
                fullWidth
                id="password"
                label={t("auth.password")}
                type="password"
                variant="outlined"
                size="small"
                onChange={handlePasswordChange}
                sx={{ mb: 2 }} // Добавление отступа снизу
            />
            {error && (
                <Alert severity="error" sx={{ mb: 2, minHeight: "36px" }}>
                    {error}
                </Alert>
            )}
            <Button
                fullWidth
                variant="contained"
                color="primary"
                size="small"
                onClick={handleSubmit}
                sx={{ mb: 2 }} // Добавление отступа снизу
            >
                {t("auth.signIn")}
            </Button>
            <p>
                {t("auth.notHaveAccountYet")}{" "}
                <Link to={REGISTRATION_ROUTE}>{t("auth.signUp")}</Link>
            </p>
        </div>
    );
};

export default LoginForm;
