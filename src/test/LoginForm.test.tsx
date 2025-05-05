import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoginForm } from "../pages/Login";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock del store
vi.mock("@/store/useAuthStore", () => ({
  useAuthStore: () => ({
    login: vi.fn(),
  }),
}));

// Mock de la mutación
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual<any>("@tanstack/react-query");
  return {
    ...actual,
    useMutation: () => ({
      mutate: vi.fn(),
    }),
  };
});

const renderComponent = () => {
  render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );
};

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería renderizar el formulario con campos de identificación y contraseña", () => {
    renderComponent();
    expect(
      screen.getByPlaceholderText(/número de identificación/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
  });

  it("debería mostrar errores si se intenta enviar el formulario vacío", async () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/el número de identificación es requerido/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/la contraseña es requerida/i)
      ).toBeInTheDocument();
    });
  });

  it("debería mostrar error si la contraseña es demasiado corta", async () => {
    renderComponent();

    fireEvent.input(screen.getByPlaceholderText(/número de identificación/i), {
      target: { value: "12345678" },
    });

    fireEvent.input(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/debe tener al menos 8 caracteres/i)
      ).toBeInTheDocument();
    });
  });

  it("debería no mostrar errores si los datos están correctos", async () => {
    renderComponent();

    fireEvent.input(screen.getByPlaceholderText(/número de identificación/i), {
      target: { value: "12345678" },
    });

    fireEvent.input(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: "Prueba123!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(screen.queryByText(/es requerido/i)).toBeNull();
    });
  });
});
