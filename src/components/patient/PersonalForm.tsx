import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  VStack,
  Heading,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import { PersonalData } from "@interfaces/patient";
import { motion } from "framer-motion";
import { usePatientFormStore } from "../../states/patientFormStore";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

export const PersonalForm = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalData>();

  const updateStepData = usePatientFormStore((s) => s.updateStepData);

  const { data } = usePatientFormStore();

  const navigate = useNavigate();

  const onSubmit = (data: PersonalData) => {
    updateStepData("personal", data);
    console.log("Demographic data submitted:", data);
    navigate("/patient-form/social");
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
        Información Personal
      </Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>¿Fuma actualmente?</FormLabel>
          <Select
            {...register("is_smoking", { required: true })}
            defaultValue={data?.personal?.is_smoking}
          >
            <option value="">Seleccione</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </Select>
          {errors.is_smoking && (
            <span style={{ color: "red" }}>Este campo es obligatorio</span>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Cigarrillos por día</FormLabel>
          <Input
            type="number"
            defaultValue={data?.personal?.cigsPerDay}
            {...register("cigsPerDay", { required: true })}
          />
          {errors.cigsPerDay && (
            <span style={{ color: "red" }}>
              Este campo es obligatorio y debe ser un número positivo.
            </span>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>¿Usa medicamentos para presión arterial?</FormLabel>
          <Select
            {...register("BPMeds", { required: true })}
            defaultValue={data?.personal?.BPMeds}
          >
            <option value="">Seleccione</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </Select>
          {errors.BPMeds && (
            <span style={{ color: "red" }}>Este campo es obligatorio</span>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>¿Ha tenido un accidente cerebrovascular?</FormLabel>
          <Select
            {...register("prevalentStroke", { required: true })}
            defaultValue={data?.personal?.prevalentStroke}
          >
            <option value="">Seleccione</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </Select>
          {errors.prevalentStroke && (
            <span style={{ color: "red" }}>Este campo es obligatorio</span>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>¿Tiene hipertensión?</FormLabel>
          <Select
            {...register("prevalentHyp", { required: true })}
            defaultValue={data?.personal?.prevalentHyp}
          >
            <option value="">Seleccione</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </Select>
          {errors.prevalentHyp && (
            <span style={{ color: "red" }}>Este campo es obligatorio</span>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>¿Tiene diabetes?</FormLabel>
          <Select
            {...register("diabetes", { required: true })}
            defaultValue={data?.personal?.diabetes}
          >
            <option value="">Seleccione</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </Select>
          {errors.diabetes && (
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
