import {
  Box,
  Flex,
  Text,
  Heading,
  Progress,
  useBreakpointValue,
  Button,
  useSteps,
  Icon,
} from "@chakra-ui/react";
import { FaUser, FaHeartbeat, FaHome, FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { usePatientFormStore } from "../states/patientFormStore";

const MotionBox = motion(Box);

const steps = [
  { label: "Demográficos", icon: FaUser },
  { label: "Personales", icon: FaHeartbeat },
  { label: "Sociales", icon: FaHome },
  { label: "Económicos", icon: FaWallet },
  { label: "Clínicos", icon: FaHeartbeat },
  { label: "Condiciones de vida", icon: FaHome },
];

const stepRoutes = [
  "/patient-form/demographics",
  "/patient-form/personal",
  "/patient-form/social",
  "/patient-form/economic",
  "/patient-form/clinical",
  "/patient-form/living-conditions",
];

export default function PatientFormStepper() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const navigate = useNavigate();

  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const index = stepRoutes.findIndex((path) => currentPath.startsWith(path));
    if (index !== -1 && index !== activeStep) {
      setActiveStep(index);
    }
  }, [currentPath]);

  const { data, resetForm } = usePatientFormStore();

  const formRef = useRef<{ submit: () => void }>(null);

  const handleNext = async () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
      formRef.current?.submit();
      navigate(stepRoutes[activeStep + 1]);
    } else {
      try {
        console.log("📦 Enviando datos consolidados:", data);
        // await fetch("/api/pacientes", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(data),
        // });
        resetForm();
      } catch (error) {
        console.error("❌ Error al enviar los datos:", error);
      }
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      navigate(stepRoutes[activeStep - 1]); // 👈 Navega al anterior
    }
  };

  return (
    <MotionBox
      bg="white"
      boxShadow="md"
      borderRadius="2xl"
      p={isMobile ? 4 : 8}
      width="100%"
      maxW="600px"
      mx="auto"
      mt={6}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Heading size="md" color="teal.700" mb={4}>
        Paso {activeStep + 1} de {steps.length}: {steps[activeStep].label}
      </Heading>

      {/* Breadcrumb estilo custom */}
      <Flex gap={4} justify="space-between" mb={6}>
        {steps.map((step, index) => (
          <Flex
            key={index}
            direction="column"
            align="center"
            flex="1"
            opacity={index <= activeStep ? 1 : 0.5}
          >
            <Flex
              boxSize="10"
              borderRadius="full"
              bg={index === activeStep ? "teal.500" : "gray.200"}
              color={index === activeStep ? "white" : "gray.600"}
              align="center"
              justify="center"
              fontWeight="bold"
              transition="all 0.3s ease"
            >
              <Icon as={step.icon} boxSize={4} />
            </Flex>
            <Text mt={2} fontSize="xs" textAlign="center">
              {step.label}
            </Text>
          </Flex>
        ))}
      </Flex>

      {/* Progreso */}
      <Progress
        value={(activeStep / (steps.length - 1)) * 100}
        size="sm"
        colorScheme="teal"
        mb={8}
        borderRadius="full"
      />

      {/* Aquí vendría el formulario real según el paso */}
      <Box
        border="1px dashed teal"
        p={6}
        rounded="lg"
        textAlign="center"
        color="gray.500"
      >
        <Outlet />
        {/* Aquí se renderizará el contenido del formulario según el paso */}
      </Box>

      <Flex mt={6} justify="space-between">
        <Button
          onClick={handleBack}
          isDisabled={activeStep === 0}
          variant="outline"
          colorScheme="teal"
        >
          Atrás
        </Button>
        <Button onClick={handleNext} colorScheme="teal">
          {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
        </Button>
      </Flex>
    </MotionBox>
  );
}
