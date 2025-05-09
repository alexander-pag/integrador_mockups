import {
  ClinicalData,
  DemographicData,
  EconomicData,
  LivingConditionsData,
  PersonalData,
  SocialData,
} from "@interfaces/patient";
import { create } from "zustand";

type FormData = {
  demographics?: DemographicData;
  personal?: PersonalData;
  social?: SocialData;
  economic?: EconomicData;
  clinical?: ClinicalData;
  livingConditions?: LivingConditionsData;
};

type PatientFormStore = {
  data: FormData;
  updateStepData: <K extends keyof FormData>(
    step: K,
    values: FormData[K]
  ) => void;
  resetForm: () => void;
};

export const usePatientFormStore = create<PatientFormStore>((set) => ({
  data: {},
  updateStepData: (step, values) =>
    set((state) => ({
      data: { ...state.data, [step]: values },
    })),

  resetForm: () => set({ data: {} }),
}));
