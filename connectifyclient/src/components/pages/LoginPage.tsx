import React from "react";
import LoginForm from "../Authentication/LoginForm";

const LoginPage: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <LoginForm/>
        </div>
    );
};

export default LoginPage;
