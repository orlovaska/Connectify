import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { LOGIN_ROUTE } from './routesConsts';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAppSelector((state) => state.userReducer);

  if (!user) {
    // Если пользователь не авторизован, перенаправляем на страницу входа
    return <Navigate to={LOGIN_ROUTE} />;
  }

  // Если пользователь авторизован, отображаем дочерние элементы
  return <>{children}</>; // Используем фрагменты для обёртки children или возвращаем null, если children не задан
};

export default ProtectedRoute;
