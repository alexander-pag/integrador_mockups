import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  useBreakpointValue,
  Heading,
  VStack,
  Button,
} from "@chakra-ui/react";
import { EconomicData } from "@interfaces/patient";
import { motion } from "framer-motion";
import { usePatientFormStore } from "../../states/patientFormStore";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

export const EconomicForm = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EconomicData>();

  const updateStepData = usePatientFormStore((s) => s.updateStepData);

  const { data } = usePatientFormStore();

  const navigate = useNavigate();

  const onSubmit = (data: EconomicData) => {
    updateStepData("economic", data);
    navigate("/patient-form/clinical");
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
        Información Económica
      </Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Ingresos mensuales (COP)</FormLabel>
          <Input
            type="number"
            defaultValue={data.economic?.income}
            {...register("income", { required: true, min: 0 })}
          />
          {errors.income && (
            <span style={{ color: "red" }}>
              Este campo es obligatorio y debe ser un número positivo.
            </span>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Gastos mensuales (COP)</FormLabel>
          <Input
            type="number"
            defaultValue={data.economic?.expenses}
            {...register("expenses", {
              required: true,
              min: 0,
            })}
          />
          {errors.expenses && (
            <span style={{ color: "red" }}>
              Este campo es obligatorio y debe ser un número positivo.
            </span>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Deudas mensuales (COP)</FormLabel>
          <Input
            type="number"
            defaultValue={data.economic?.debt}
            {...register("debt", {
              required: true,
              min: 0,
            })}
          />
          {errors.debt && (
            <span style={{ color: "red" }}>
              Este campo es obligatorio y debe ser un número positivo.
            </span>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Ahorros mensuales (COP)</FormLabel>
          <Input
            type="number"
            defaultValue={data.economic?.savings}
            {...register("savings", {
              required: true,
              min: 0,
            })}
          />
          {errors.savings && (
            <span style={{ color: "red" }}>
              Este campo es obligatorio y debe ser un número positivo.
            </span>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Seguro</FormLabel>
          <Input
            type="text"
            defaultValue={data.economic?.insurance}
            {...register("insurance", {
              required: true,
            })}
          />
          {errors.insurance && (
            <span style={{ color: "red" }}>Este campo es obligatorio.</span>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>EPS o aseguradora en salud</FormLabel>
          <Input
            type="text"
            defaultValue={data.economic?.healthInsurance}
            {...register("healthInsurance", {
              required: true,
            })}
          />
          {errors.healthInsurance && (
            <span style={{ color: "red" }}>Este campo es obligatorio.</span>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Tamaño del núcleo familiar</FormLabel>
          <Input
            type="number"
            defaultValue={data.economic?.householdSize}
            {...register("householdSize", {
              required: true,
              min: 1,
            })}
          />
          {errors.householdSize && (
            <span style={{ color: "red" }}>
              Este campo es obligatorio y debe ser un número positivo.
            </span>
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
