import { render, screen, fireEvent } from "@testing-library/react";
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

  // Prueba #1
  it("muestra error si el campo de identificación está vacío", async () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));
    expect(
      await screen.findByText(/identificación.*requerido/i)
    ).toBeInTheDocument();
  });

  // Prueba #2
  it("muestra error si el campo de contraseña está vacío", async () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));
    expect(
      await screen.findByText(/la contraseña es requerida/i)
    ).toBeInTheDocument();
  });

  // Prueba #3
  it("muestra error si se ingresan letras en el campo de identificación", async () => {
    renderComponent();
    fireEvent.input(screen.getByPlaceholderText(/número de identificación/i), {
      target: { value: "abc12345" },
    });
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));
    expect(await screen.findByTestId("error-identification")).toHaveTextContent(
      "Solo se permiten números."
    );
  });

  // Prueba #4
  it("muestra error si la identificación tiene menos de 8 caracteres", async () => {
    renderComponent();
    fireEvent.input(screen.getByPlaceholderText(/número de identificación/i), {
      target: { value: "12345" },
    });
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));
    expect(
      await screen.findByText(/al menos 8 caracteres/i)
    ).toBeInTheDocument();
  });

  // Prueba #5
  it("muestra error si la identificación tiene más de 12 caracteres", async () => {
    renderComponent();
    fireEvent.input(screen.getByPlaceholderText(/número de identificación/i), {
      target: { value: "123456789012345" },
    });
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));
    expect(
      await screen.findByText(/no puede exceder los 12 caracteres/i)
    ).toBeInTheDocument();
  });

  // Prueba #6
  it("muestra error si la contraseña no tiene mayúscula", async () => {
    renderComponent();
    fireEvent.input(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: "prueba123!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));
    expect(await screen.findByText(/una mayúscula/i)).toBeInTheDocument();
  });

  // Prueba #7
  it("la contraseña debe estar oculta por defecto", () => {
    renderComponent();
    const passwordInput = screen.getByPlaceholderText(/contraseña/i);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  // Prueba #8
  it("muestra la contraseña al hacer clic en el botón de visibilidad", async () => {
    renderComponent();

    const toggleBtn = screen.getByLabelText(/toggle password/i);
    fireEvent.click(toggleBtn);

    const passwordInput = screen.getByPlaceholderText(/contraseña/i);
    expect(passwordInput).toHaveAttribute("type", "text");
  });
});
