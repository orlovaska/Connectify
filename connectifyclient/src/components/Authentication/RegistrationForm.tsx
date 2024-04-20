import React, { useState } from "react";
import AuthService from "../../services/AuthService";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import "./RegistrationForm.css";
import { Link } from "react-router-dom";
import { isValidEmail, isValidPassword } from "../../utils/inputValidation";
import { useAppDispatch } from "../../hooks/redux";
import { userSlice } from "../../store/reducers/UserSlice";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../routing/routesConsts";

interface IRegistrationFormProps {}

const RegistrationForm: React.FC<IRegistrationFormProps> = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { t } = useTranslation("common");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //TODO сделать обработку ошибок
    const [showError, setShowError] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async () => {
        //debugger;
        if (!isValidEmail(email)) {
            return;
        }
        if (!isValidPassword(password)) {
            return;
        }

        AuthService.registration(username, email, password)
            .then((response) => {
                AuthService.login(username, password).then((response) => {
                    const { login } = userSlice.actions;
                    dispatch(login(response.data.user));
                    navigate(HOME_ROUTE, { replace: true });
                });
            })
            .catch((error) => {
                setError(error);
                setShowError(true);
                console.log("AuthService запрос. Ошибка", error);
            });
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
            <h2>{t("auth.registration")}</h2>
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
                id="email"
                label={t("auth.email")}
                variant="outlined"
                size="small"
                onChange={handleEmailChange}
                sx={{ mb: 2 }} // Добавление отступа снизу
            />
            <TextField
                fullWidth
                id="password"
                label={t("auth.password")}
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
