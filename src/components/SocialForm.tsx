import { useForm } from "react-hook-form";
import { Button, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type SocialData = {
  education: string;
  occupation: string;
  maritalStatus: string;
};

export default function SocialForm() {
  const { register, handleSubmit } = useForm<SocialData>();
  const navigate = useNavigate();

  const onSubmit = (data: SocialData) => {
    console.log("Datos sociales:", data);
    navigate("/patient-form/economic");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormControl>
        <FormLabel>Nivel educativo</FormLabel>
        <Select {...register("education")}>
          <option value="1">Primaria</option>
          <option value="2">Secundaria</option>
          <option value="3">Técnico o tecnológico</option>
          <option value="4">Universitario</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Ocupación</FormLabel>
        <Select {...register("occupation")}>
          <option value="Agricultor">Agricultor</option>
          <option value="Comerciante">Comerciante</option>
          <option value="Desempleado">Desempleado</option>
          <option value="Otro">Otro</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Estado civil</FormLabel>
        <Select {...register("maritalStatus")}>
          <option value="Soltero">Soltero</option>
          <option value="Casado">Casado</option>
          <option value="Unión libre">Unión libre</option>
          <option value="Viudo">Viudo</option>
        </Select>
      </FormControl>

      <Button type="submit" colorScheme="teal">
        Siguiente
      </Button>
    </form>
  );
}
