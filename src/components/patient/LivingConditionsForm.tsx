import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Select,
  Box,
  Heading,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { LivingConditionsData } from "@interfaces/patient";

import { motion } from "framer-motion";
import { usePatientFormStore } from "../../states/patientFormStore";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

export const LivingConditionsForm = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LivingConditionsData>();

  const updateStepData = usePatientFormStore((s) => s.updateStepData);

  const navigate = useNavigate();

  const onSubmit = (data: LivingConditionsData) => {
    updateStepData("livingConditions", data);
    // Enviar los datos consolidados
    navigate("/dashboard");
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
        Información de Condiciones de Vida
      </Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel> ¿Cuenta con electricidad? </FormLabel>
          <Select
            {...register("hasElectricity", {
              required: true,
            })}
          >
            <option value="">Seleccione</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </Select>
          {errors.hasElectricity && (
            <span style={{ color: "red" }}>Este campo es obligatorio</span>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel> ¿Cuenta con electricidad? </FormLabel>
          <Select
            {...register("hasWaterSupply", {
              required: true,
            })}
          >
            <option value="">Seleccione</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </Select>
          {errors.hasWaterSupply && (
            <span style={{ color: "red" }}>Este campo es obligatorio</span>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel> ¿Cuenta con electricidad? </FormLabel>
          <Select
            {...register("hasGas", {
              required: true,
            })}
          >
            <option value="">Seleccione</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </Select>
          {errors.hasGas && (
            <span style={{ color: "red" }}>Este campo es obligatorio</span>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel> ¿Cuenta con electricidad? </FormLabel>
          <Select
            {...register("hasInternet", {
              required: true,
            })}
          >
            <option value="">Seleccione</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </Select>
          {errors.hasInternet && (
            <span style={{ color: "red" }}>Este campo es obligatorio</span>
          )}
        </FormControl>
      </VStack>
    </MotionBox>
  );
};
