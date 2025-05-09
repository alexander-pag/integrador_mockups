import {
  Box,
  Heading,
  VStack,
  useBreakpointValue,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { DemographicData } from "@interfaces/patient";
import { useEffect, useState } from "react";
import { usePatientFormStore } from "../../states/patientFormStore";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

export const DemographicForm = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DemographicData>();

  const updateStepData = usePatientFormStore((s) => s.updateStepData);

  const { data } = usePatientFormStore();

  const selectedDepartment = watch("department");

  const [municipalities, setMunicipalities] = useState<string[]>([]);

  useEffect(() => {
    const loadMunicipalities = async () => {
      try {
        if (!selectedDepartment) {
          setMunicipalities([]);
          return;
        }

        const fileName = selectedDepartment.toLowerCase(); // e.g., "caldas"
        const sanitizedFileName = fileName
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const module = await import(`../../data/${sanitizedFileName}.json`);
        setMunicipalities(module.default);
      } catch (error) {
        console.error("Error loading municipalities:", error);
        setMunicipalities([]);
      }
    };

    loadMunicipalities();
  }, [selectedDepartment]);

  const navigate = useNavigate();

  const onSubmit = (data: DemographicData) => {
    updateStepData("demographics", data);
    console.log("Demographic data submitted:", data);
    navigate("/patient-form/personal");
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
          <FormLabel htmlFor="name">Nombre completo</FormLabel>
          <Input
            id="name"
            placeholder="Nombre Completo"
            {...register("name", {
              required: {
                value: true,
                message: "El nombre completo es requerido.",
              },
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]+$/,
                message: "El nombre solo puede contener letras y espacios.",
              },
              minLength: {
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres.",
              },
              maxLength: {
                value: 50,
                message: "El nombre no puede exceder los 50 caracteres.",
              },
            })}
            defaultValue={data?.demographics?.name}
          />
          {errors.name && (
            <Text className="text-red-600 text-xs mt-1">
              {errors.name.message}
            </Text>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Edad</FormLabel>
          <Input
            type="number"
            {...register("age", {
              required: true,
              min: 0,
              max: 100,
              pattern: /^[0-9]+$/,
            })}
            defaultValue={data?.demographics?.age}
          />
          {errors.age && errors.age.type === "pattern" && (
            <span style={{ color: "red" }}>
              La edad solo puede contener números.
            </span>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Género</FormLabel>
          <Select
            {...register("gender", { required: true })}
            defaultValue={data?.demographics?.gender}
          >
            <option value="">Seleccione</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Fecha de nacimiento</FormLabel>
          <Input
            type="date"
            {...register("birthDate", { required: true })}
            defaultValue={data?.demographics?.birthDate}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Departamento</FormLabel>
          <Select
            {...register("department", { required: true })}
            defaultValue={data?.demographics?.department}
          >
            <option value="">Seleccione</option>
            <option value="Caldas">Caldas</option>
            <option value="Risaralda">Risaralda</option>
            <option value="Quindío">Quindío</option>
            <option value="Antioquia">Antioquia</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Municipio</FormLabel>
          <Select
            {...register("municipality", { required: true })}
            defaultValue={data?.demographics?.municipality}
            placeholder="Seleccione"
          >
            {municipalities.map((mun) => (
              <option key={mun} value={mun}>
                {mun}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Zona</FormLabel>
          <Select
            {...register("area", { required: true })}
            defaultValue={data?.demographics?.area}
          >
            <option value="">Seleccione</option>
            <option value="Rural">Rural</option>
            <option value="Urbana">Urbana</option>
          </Select>
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
