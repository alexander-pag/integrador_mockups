import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type PersonalData = {
  is_smoking: string;
  cigsPerDay: number;
  BPMeds: string;
  prevalentStroke: string;
  prevalentHyp: string;
  diabetes: string;
};

export default function PersonalForm() {
  const { register, handleSubmit } = useForm<PersonalData>();
  const navigate = useNavigate();

  const onSubmit = (data: PersonalData) => {
    console.log("Datos personales:", data);
    navigate("/patient-form/social");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormControl>
        <FormLabel>¿Fuma actualmente?</FormLabel>
        <Select {...register("is_smoking")}>
          <option value="1">Sí</option>
          <option value="0">No</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Cigarrillos por día</FormLabel>
        <Input type="number" {...register("cigsPerDay")} />
      </FormControl>

      <FormControl>
        <FormLabel>¿Usa medicamentos para presión arterial?</FormLabel>
        <Select {...register("BPMeds")}>
          <option value="1">Sí</option>
          <option value="0">No</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>¿Ha tenido un accidente cerebrovascular?</FormLabel>
        <Select {...register("prevalentStroke")}>
          <option value="1">Sí</option>
          <option value="0">No</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>¿Tiene hipertensión?</FormLabel>
        <Select {...register("prevalentHyp")}>
          <option value="1">Sí</option>
          <option value="0">No</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>¿Tiene diabetes?</FormLabel>
        <Select {...register("diabetes")}>
          <option value="1">Sí</option>
          <option value="0">No</option>
        </Select>
      </FormControl>

      <Button type="submit" colorScheme="teal">
        Siguiente
      </Button>
    </form>
  );
}
