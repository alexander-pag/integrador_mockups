import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Heading,
  Box,
  useBreakpointValue,
  VStack,
  Button,
} from "@chakra-ui/react";
import { ClinicalData } from "@interfaces/patient";
import { motion } from "framer-motion";
import { usePatientFormStore } from "../../states/patientFormStore";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

export const ClinicalForm = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClinicalData>();

  const updateStepData = usePatientFormStore((s) => s.updateStepData);

  const { data } = usePatientFormStore();

  const navigate = useNavigate();

  const onSubmit = (data: ClinicalData) => {
    updateStepData("clinical", data);
    navigate("/patient-form/living-conditions");
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
        Información Clínica
      </Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Glucosa</FormLabel>
          <Input
            type="number"
            defaultValue={data?.clinical?.glucose}
            {...register("glucose", { required: true, min: 0 })}
          />
          {errors.glucose && (
            <span style={{ color: "red" }}>
              Este campo es requerido y debe ser un número positivo.
            </span>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Frecuencia cardiaca</FormLabel>
          <Input
            type="number"
            defaultValue={data?.clinical?.heartRate}
            {...register("heartRate", { required: true, min: 0 })}
          />
          {errors.heartRate && (
            <span style={{ color: "red" }}>
              Este campo es requerido y debe ser un número positivo.
            </span>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>BMI</FormLabel>
          <Input
            type="number"
            defaultValue={data?.clinical?.bmi}
            {...register("bmi", { required: true, min: 0 })}
          />

          {errors.bmi && (
            <span style={{ color: "red" }}>
              Este campo es requerido y debe ser un número positivo.
            </span>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Colesteror total</FormLabel>
          <Input
            type="number"
            defaultValue={data?.clinical?.totalCholesterol}
            {...register("totalCholesterol", { required: true, min: 0 })}
          />
          {errors.totalCholesterol && (
            <span style={{ color: "red" }}>
              Este campo es requerido y debe ser un número positivo.
            </span>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Etnia</FormLabel>
          <Select
            {...register("ethnicity", {
              required: true,
            })}
            defaultValue={data?.clinical?.ethnicity}
          >
            <option value="">Seleccione</option>
            <option value="Afrocolombiano">Afrocolombiano</option>
            <option value="Indígena">Indígena</option>
            <option value="Mestizo">Mestizo</option>
            <option value="Blanco">Blanco</option>
          </Select>
          {errors.ethnicity && (
            <span style={{ color: "red" }}>Este campo es requerido.</span>
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
