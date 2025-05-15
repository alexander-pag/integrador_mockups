import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (tokens: { accessToken: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("accessToken"),
  isAuthenticated: !!localStorage.getItem("accessToken"),

  login: ({ accessToken }) => {
    console.log("Login successful, setting access token:", accessToken);

    localStorage.setItem("accessToken", accessToken);

    set({ accessToken, isAuthenticated: true });
  },

  logout: async () => {
    localStorage.removeItem("accessToken");

    set({ accessToken: null, isAuthenticated: false });

    window.location.href = "/login";
  },
}));

// interface AuthState {
//   accessToken: string | null;
//   refreshToken: string | null;
//   isAuthenticated: boolean;
//   login: (tokens: { accessToken: string; refreshToken: string }) => void;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   accessToken: localStorage.getItem("accessToken"),
//   refreshToken: localStorage.getItem("refreshToken"),
//   isAuthenticated: !!localStorage.getItem("accessToken"),

//   login: ({ accessToken, refreshToken }) => {
//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("refreshToken", refreshToken);

//     set({ accessToken, refreshToken, isAuthenticated: true });
//   },

//   logout: async () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("barberShopId");

//     set({ accessToken: null, refreshToken: null, isAuthenticated: false });

//     window.location.href = "/login";
//   },
// }));
