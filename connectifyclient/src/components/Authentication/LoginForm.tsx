import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
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
    const dispatch = useAppDispatch();

    const handleSubmit = async () => {
        if (!isValidPassword(password)) {
            return;
        }

        AuthService.login(username, password)
            .then((response) => {
                const { login } = userSlice.actions;
                dispatch(login(response.data.user));
                navigate(HOME_ROUTE, { replace: true });
            })
            .catch((error) => {
                // setError(error);
                // setShowError(true);
                console.log("AuthService запрос. Ошибка", error);
            });
    };

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
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
