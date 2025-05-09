import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RegistrationMedicalForm } from "../pages/RegistrationMedicalForm";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock del store
vi.mock("@/store/useAuthStore", () => ({
  useAuthStore: () => ({
    login: vi.fn(),
  }),
}));

// Reutilizable
const fillField = (placeholder: string, value: string) => {
  fireEvent.input(screen.getByPlaceholderText(placeholder), {
    target: { value },
  });
};

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
      <RegistrationMedicalForm />
    </BrowserRouter>
  );
};

describe("RegistrationMedicalForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Prueba #1
  it("renderiza el formulario de registro", () => {
    renderComponent();
    expect(screen.getByText(/crear personal de salud/i)).toBeInTheDocument();
  });

  // Prueba #2
  it("muestra error si no se escribe nada y se envía", async () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));
    await waitFor(() => {
      expect(
        screen.getByText(/el nombre completo es requerido/i)
      ).toBeInTheDocument();
    });
  });

  // Prueba #3
  it("muestra error si se ingresan letras en el campo de identificación", async () => {
    renderComponent();
    fireEvent.input(screen.getByPlaceholderText(/número de identificación/i), {
      target: { value: "abc12345" },
    });
    fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));
    expect(await screen.findByTestId("error-identification")).toHaveTextContent(
      "Solo se permiten números."
    );
  });

  // Prueba #4
  it("permite mostrar y ocultar la contraseña", async () => {
    renderComponent();
    const passwordInput = screen.getByPlaceholderText("Contraseña");
    const toggleButton = screen.getAllByRole("button", {
      name: /toggle password/i,
    })[0];
    expect(passwordInput).toHaveAttribute("type", "password");
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");
  });

  // Prueba #5
  it("acepta valores válidos en todos los campos", async () => {
    renderComponent();
    fillField("Nombre Completo", "Jhair Alexander");
    fillField("Número de Identificación", "12345678");
    fillField("Tarjeta Profesional", "87654321");
    fillField("Correo Electrónico", "test@example.com");
    fillField("Contraseña", "Password123!");

    fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));

    await waitFor(() => {
      expect(screen.queryByText(/es requerido/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/inválido/i)).not.toBeInTheDocument();
    });
  });

  // Prueba #6
  it("se muestra correctamente el título del formulario", () => {
    renderComponent();
    expect(screen.getByText(/crear personal de salud/i)).toBeInTheDocument();
  });

  // Prueba #7
  it("tiene un enlace para iniciar sesión", () => {
    renderComponent();
    const loginLink = screen.getByRole("link", { name: /iniciar sesión/i });
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  // Prueba #8
  it("muestra error si el correo es inválido", async () => {
    renderComponent();
    fillField("Correo Electrónico", "micorreo");
    fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));
    expect(
      await screen.findByText(/formato de correo inválido/i)
    ).toBeInTheDocument();
  });

  // Prueba #9
  it("muestra error si la contraseña es muy corta", async () => {
    renderComponent();
    fillField("Contraseña", "123");
    fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));
    expect(
      await screen.findByText(/debe tener al menos 8 caracteres/i)
    ).toBeInTheDocument();
  });

  // Prueba #10
  it("muestra error si la contraseña no tiene mayúscula", async () => {
    renderComponent();
    fillField("Contraseña", "prueba123!");
    fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));
    expect(
      await screen.findByText(/debe contener una mayúscula/i)
    ).toBeInTheDocument();
  });

  // Prueba #11
  it("muestra error si la contraseña no tiene minúscula", async () => {
    renderComponent();
    fillField("Contraseña", "PRUEBA123!");
    fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));
    expect(await screen.findByText(/una minúscula/i)).toBeInTheDocument();
  });

  // Prueba #12 validar nombre
  it("muestra error si el nombre tiene caracteres inválidos", async () => {
    renderComponent();
    fillField("Nombre Completo", "Jhair123");
    fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));
    expect(
      await screen.findByText(/solo se permiten letras/i)
    ).toBeInTheDocument();
  });
});
