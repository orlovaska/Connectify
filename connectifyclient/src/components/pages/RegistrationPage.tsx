import React from "react";
import RegistrationForm from "../Authentication/RegistrationForm";

const RegistrationPage: React.FC = () => {
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
            <RegistrationForm />
        </div>
    );
};

export default RegistrationPage;
