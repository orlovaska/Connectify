import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../components/pages/HomePage";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./routesConsts";
import LoginPage from "../components/pages/LoginPage";
import RegistrationPage from "../components/pages/RegistrationPage";

export const router = createBrowserRouter([
    {
      path: HOME_ROUTE,
      element: (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      ),
    },
    {
      path: LOGIN_ROUTE,
      element: <LoginPage />,
    },
    {
      path: REGISTRATION_ROUTE,
      element: <RegistrationPage />,
    },
  ]);
  