// src/pages/paciente/demograficos.tsx
import {
  Box,
  Button,
  Heading,
  VStack,
  useBreakpointValue,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export type DemographicData = {
  fullName: string;
  age: number;
  gender: string;
  birthDate: string;
  department: string;
  municipality: string;
  area: string;
  educationLevel: string;
  maritalStatus: string;
};

interface Props {
  onNext: (data: DemographicData) => void;
}

export const DemographicForm = ({ onNext }: Props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DemographicData>();

  const onSubmit = (data: DemographicData) => {
    onNext(data);
  };

  return (
    <MotionBox
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      bg="white"
      p={isMobile ? 4 : 8}
      borderRadius="2xl"
      boxShadow="md"
      width="100%"
      maxW="600px"
      mx="auto"
      mt={6}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Heading size="md" mb={6} color="teal.700">
        Información Demográfica
      </Heading>

      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Nombre completo</FormLabel>
          <Input {...register("fullName", { required: true })} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Edad</FormLabel>
          <Input type="number" {...register("age", { required: true })} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Género</FormLabel>
          <Select {...register("gender", { required: true })}>
            <option value="">Seleccione</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Fecha de nacimiento</FormLabel>
          <Input type="date" {...register("birthDate", { required: true })} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Departamento</FormLabel>
          <Select {...register("department", { required: true })}>
            <option value="">Seleccione</option>
            <option value="Caldas">Caldas</option>
            <option value="Risaralda">Risaralda</option>
            <option value="Quindío">Quindío</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Municipio</FormLabel>
          <Input {...register("municipality", { required: true })} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Zona</FormLabel>
          <Select {...register("area", { required: true })}>
            <option value="">Seleccione</option>
            <option value="Rural">Rural</option>
            <option value="Urbana">Urbana</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Nivel educativo</FormLabel>
          <Select {...register("educationLevel", { required: true })}>
            <option value="">Seleccione</option>
            <option value="Primaria">Primaria</option>
            <option value="Secundaria">Secundaria</option>
            <option value="Técnico">Técnico</option>
            <option value="Universitario">Universitario</option>
            <option value="Ninguno">Ninguno</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Estado civil</FormLabel>
          <Select {...register("maritalStatus", { required: true })}>
            <option value="">Seleccione</option>
            <option value="Soltero">Soltero/a</option>
            <option value="Casado">Casado/a</option>
            <option value="Unión libre">Unión libre</option>
            <option value="Divorciado">Divorciado/a</option>
            <option value="Viudo">Viudo/a</option>
          </Select>
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          mt={4}
          size={isMobile ? "sm" : "md"}
        >
          Siguiente
        </Button>
      </VStack>
    </MotionBox>
  );
};
