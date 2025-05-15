import { CardiovascularDashboard } from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import PatientFormLayout from "./components/PatientFormStepper";
import { DemographicForm } from "./components/patient/DemographicsForm";
import { ClinicalForm } from "./components/patient/ClinicalForm";
import { LivingConditionsForm } from "./components/patient/LivingConditionsForm";
import { PersonalForm } from "./components/patient/PersonalForm";
import { SocialForm } from "./components/patient/SocialForm";
import { EconomicForm } from "./components/patient/EconomicForm";
import MainLayout from "./Layouts/MainLayout";
import { LoginForm } from "./pages/Login";
import { RegistrationMedicalForm } from "./pages/RegistrationMedicalForm";
import { MunicipiosDashboard } from "./components/MunicipiosDashboard";
import Profile from "./components/Profile";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="register" element={<RegistrationMedicalForm />} />
        <Route path="login" element={<LoginForm />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<CardiovascularDashboard />} />
          <Route path="dashboard" element={<CardiovascularDashboard />} />
          <Route
            path="dashboard-municipios"
            element={<MunicipiosDashboard />}
          />
          <Route path="profile" element={<Profile />} />
          <Route path="patient-form" element={<PatientFormLayout />}>
            <Route path="demographics" element={<DemographicForm />} />
            <Route path="personal" element={<PersonalForm />} />
            <Route path="social" element={<SocialForm />} />
            <Route path="economic" element={<EconomicForm />} />
            <Route path="clinical" element={<ClinicalForm />} />
            <Route
              path="living-conditions"
              element={<LivingConditionsForm />}
            />
          </Route>
        </Route>
      </Routes>
      <Toaster richColors position="top-right" />
    </>
  );
}
