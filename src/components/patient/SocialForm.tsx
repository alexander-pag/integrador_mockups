import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Select,
  Box,
  VStack,
  useBreakpointValue,
  Heading,
  Button,
} from "@chakra-ui/react";
import { SocialData } from "@interfaces/patient";
import { motion } from "framer-motion";
import { usePatientFormStore } from "../../states/patientFormStore";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

export const SocialForm = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SocialData>();

  const updateStepData = usePatientFormStore((s) => s.updateStepData);

  const { data } = usePatientFormStore();

  const navigate = useNavigate();

  const onSubmit = (data: SocialData) => {
    updateStepData("social", data);
    console.log("Demographic data submitted:", data);
    navigate("/patient-form/economic");
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
        Información Social
      </Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Nivel educativo</FormLabel>
          <Select
            {...register("educationLevel")}
            defaultValue={data?.social?.educationLevel}
          >
            <option value="">Seleccione</option>
            <option value="Primaria">Primaria</option>
            <option value="Secundaria">Secundaria</option>
            <option value="Técnico o tecnológico">Técnico o tecnológico</option>
            <option value="Universitario">Universitario</option>
            <option value="Posgrado">Posgrado</option>
          </Select>
          {errors.educationLevel && (
            <span style={{ color: "red" }}>Este campo es obligatorio</span>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Ocupación</FormLabel>
          <Select
            {...register("occupation")}
            defaultValue={data?.social?.occupation}
          >
            <option value="">Seleccione</option>
            <option value="Agricultor">Agricultor</option>
            <option value="Comerciante">Comerciante</option>
            <option value="Desempleado">Desempleado</option>
            <option value="Otro">Otro</option>
          </Select>
          {errors.occupation && (
            <span style={{ color: "red" }}>Este campo es obligatorio</span>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Estado civil</FormLabel>
          <Select
            {...register("maritalStatus")}
            defaultValue={data?.social?.maritalStatus}
          >
            <option value="">Seleccione</option>
            <option value="Soltero">Soltero</option>
            <option value="Casado">Casado</option>
            <option value="Unión libre">Unión libre</option>
            <option value="Viudo">Viudo</option>
          </Select>
          {errors.maritalStatus && (
            <span style={{ color: "red" }}>Este campo es obligatorio</span>
          )}
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          mt={4}
          isLoading={false}
        >
          Siguiente
        </Button>
      </VStack>
    </MotionBox>
  );
};
