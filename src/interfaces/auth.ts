export type LoginData = {
  identificationNumber: string;
  password: string;
};

export type RegisterMedicalData = {
  name: string;
  identificationNumber: string;
  password: string;
  email: string;
  profesionalLicense: string;
};

export type RegisterPatientData = {
  name: string;
  identificationNumber: string;
  password: string;
  email: string;
  birthDate: string;
};
