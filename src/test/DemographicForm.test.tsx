import { describe, it, expect, vi } from "vitest";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { DemographicForm } from "@components/patient/DemographicsForm";

function renderWithProviders() {
  render(
    <MemoryRouter initialEntries={["/patient-form/demographics"]}>
      <Routes>
        <Route
          path="/patient-form/demographics"
          element={<DemographicForm />}
        />
      </Routes>
    </MemoryRouter>
  );
}

// Reutilizable
const fillField = (placeholder: string, value: string) => {
  fireEvent.input(screen.getByPlaceholderText(placeholder), {
    target: { value },
  });
};

describe("DemographicForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el formulario con título correcto", () => {
    renderWithProviders();
    expect(screen.getByText(/información demográfica/i)).toBeInTheDocument();
  });

  it("muestra error si el nombre tiene caracteres inválidos", async () => {
    renderWithProviders();
    fillField("Nombre Completo", "Jhair123");
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    expect(
      await screen.findByText(/solo puede contener letras/i)
    ).toBeInTheDocument();
  });
});
