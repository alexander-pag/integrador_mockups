export type DemographicData = {
  name: string;
  age: number;
  gender: "M" | "F";
  birthDate: string;
  department: "Antioquia" | "Caldas" | "Quindio" | "Risaralda";
  municipality: string;
  area: "Rural" | "Urbano";
};

export type PersonalData = {
  is_smoking: "Sí" | "No";
  cigsPerDay: number;
  BPMeds: "Sí" | "No";
  prevalentStroke: "Sí" | "No";
  prevalentHyp: "Sí" | "No";
  diabetes: "Sí" | "No";
};

export type SocialData = {
  educationLevel:
    | "Primaria"
    | "Secundaria"
    | "Técnico o tecnológico"
    | "Universitaria"
    | "Posgrado";
  occupation: "Agricultor" | "Comerciante" | "Desempleado" | "Otro";
  maritalStatus: "Soltero" | "Casado" | "Unión libre" | "Viudo";
};

export type EconomicData = {
  income: number;
  expenses: number;
  debt: number;
  savings: number;
  insurance: string;
  healthInsurance: string;
  householdSize: number;
};

export type ClinicalData = {
  glucose: number;
  heartRate: number;
  bmi: number;
  totalCholesterol: number;
  ethnicity: "Indígena" | "Afrocolombiano" | "Mestizo" | "Blanco";
};

export type LivingConditionsData = {
  hasElectricity: "Sí" | "No";
  hasWaterSupply: "Sí" | "No";
  hasGas: "Sí" | "No";
  hasInternet: "Sí" | "No";
};
