import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type EconomicData = {
  income: number;
  healthInsurance: string;
  householdSize: number;
};

export default function EconomicForm() {
  const { register, handleSubmit } = useForm<EconomicData>();
  const navigate = useNavigate();

  const onSubmit = (data: EconomicData) => {
    console.log("Datos económicos:", data);
    // Aquí podrías enviar todo el paquete de datos al backend
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormControl>
        <FormLabel>Ingreso mensual (COP)</FormLabel>
        <Input type="number" {...register("income")} />
      </FormControl>

      <FormControl>
        <FormLabel>Régimen de salud</FormLabel>
        <Select {...register("healthInsurance")}>
          <option value="subsidiado">Subsidiado</option>
          <option value="contributivo">Contributivo</option>
          <option value="ninguno">Ninguno</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Tamaño del núcleo familiar</FormLabel>
        <Input type="number" {...register("householdSize")} />
      </FormControl>

      <Button type="submit" colorScheme="green">
        Finalizar
      </Button>
    </form>
  );
}
