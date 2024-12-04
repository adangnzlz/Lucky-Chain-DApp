import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    isAllowed: boolean; // Condición para permitir acceso
    redirectPath?: string; // Ruta a la que redirigir si no está permitido
    children: ReactNode; // Contenido que se renderiza si el acceso está permitido
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    isAllowed,
    redirectPath = "/",
    children,
}) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
