import { CardiovascularDashboard } from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import PatientFormLayout from "./components/PatientFormStepper";
import {
  DemographicData,
  DemographicForm,
} from "./components/DemographicsForm";
import PersonalForm from "./components/PersonalForm";
import SocialForm from "./components/SocialForm";
import EconomicForm from "./components/EconomicForm";
import MainLayout from "./Layouts/MainLayout";
import { LoginForm } from "./components/Login";
import { RegistrationForm } from "./components/Register";
import { MunicipiosDashboard } from "./components/MunicipiosDashboard";

export default function App() {
  const handleDemographicNext = (data: DemographicData) => {
    console.log("🚀 Datos del paso 1 (demográficos):", data);
    // aquí puedes guardar en Zustand o navegar al siguiente paso
  };

  return (
    <Routes>
      <Route path="login" element={<LoginForm />} />
      <Route path="register" element={<RegistrationForm />} />

      <Route path="/" element={<MainLayout />}>
        <Route index element={<CardiovascularDashboard />} />
        <Route path="dashboard" element={<CardiovascularDashboard />} />
        <Route path="dashboard-municipios" element={<MunicipiosDashboard />} />
        <Route path="patient-form" element={<PatientFormLayout />}>
          <Route
            path="demographics"
            element={<DemographicForm onNext={handleDemographicNext} />}
          />
          <Route path="personal" element={<PersonalForm />} />
          <Route path="social" element={<SocialForm />} />
          <Route path="economic" element={<EconomicForm />} />
        </Route>
      </Route>
    </Routes>
  );
}
