import api from "../api/config";
import { useAuthStore } from "../states/auth";

export const useAuth = () => {
  const { isAuthenticated, login, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      logout();
    }
  };

  return {
    isAuthenticated,
    login,
    logout: handleLogout,
  };
};
