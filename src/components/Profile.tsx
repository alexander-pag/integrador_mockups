import {
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  IconButton,
  Badge,
  Button,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { EditIcon, DownloadIcon } from "@chakra-ui/icons";
import { FaMapMarkerAlt, FaNotesMedical } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function Profile() {
  const isMobile = useBreakpointValue({ base: true, md: false });

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
      {/* Header del perfil */}
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md" color="teal.700">
          Perfil del Paciente
        </Heading>
        <IconButton
          aria-label="Editar perfil"
          icon={<EditIcon />}
          variant="ghost"
          colorScheme="teal"
          borderRadius="full"
          size={isMobile ? "sm" : "md"}
        />
      </Flex>

      {/* Sección del usuario */}
      <Flex
        direction={isMobile ? "column" : "row"}
        align="center"
        gap={6}
        textAlign={isMobile ? "center" : "left"}
      >
        {/* Avatar */}
        <Avatar
          size="2xl"
          name="Jhair Peña"
          bg="teal.500"
          color="white"
          icon={
            <span role="img" aria-label="usuario">
              🧑‍⚕️
            </span>
          }
        />

        {/* Datos básicos */}
        <Box>
          <Heading size="lg" color="gray.700">
            Jhair Peña
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Paciente registrado
          </Text>
          <Badge
            mt={2}
            colorScheme="teal"
            borderRadius="full"
            px={2}
            py={1}
            fontSize="xs"
          >
            Activo
          </Badge>
        </Box>
      </Flex>

      {/* Datos de Salud */}
      <Flex direction="column" gap={4} mt={8} fontSize="sm" color="gray.600">
        <Flex justify="space-between">
          <Text fontWeight="bold">Edad:</Text>
          <Text>25 años</Text>
        </Flex>

        <Flex justify="space-between">
          <Text fontWeight="bold">Género:</Text>
          <Text>Masculino</Text>
        </Flex>

        <Flex justify="space-between">
          <Text fontWeight="bold">Peso:</Text>
          <Text>70 kg</Text>
        </Flex>

        <Flex justify="space-between">
          <Text fontWeight="bold">Altura:</Text>
          <Text>1.75 m</Text>
        </Flex>

        <Flex justify="space-between">
          <Text fontWeight="bold">Localidad:</Text>
          <Flex align="center" gap={2}>
            <FaMapMarkerAlt color="teal" />
            <Text>Manizales, Caldas</Text>
          </Flex>
        </Flex>

        <Flex justify="space-between">
          <Text fontWeight="bold">Estado de Salud:</Text>
          <Text color="teal.500" fontWeight="semibold">
            Estable
          </Text>
        </Flex>

        <Flex justify="space-between">
          <Text fontWeight="bold">Último Examen:</Text>
          <Text color="gray.700">10 de Marzo, 2025</Text>
        </Flex>
      </Flex>

      {/* Acciones disponibles */}
      <MotionBox
        mt={8}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Stack
          spacing={4}
          direction={isMobile ? "column" : "row"}
          justify="center"
        >
          <Button
            leftIcon={<DownloadIcon />}
            colorScheme="teal"
            variant="solid"
            size={isMobile ? "sm" : "md"}
          >
            Descargar Examen
          </Button>

          <Button
            leftIcon={<FaNotesMedical />}
            colorScheme="teal"
            variant="outline"
            size={isMobile ? "sm" : "md"}
          >
            Ver Recomendaciones
          </Button>

          <Button
            leftIcon={<FaMapMarkerAlt />}
            colorScheme="teal"
            variant="ghost"
            size={isMobile ? "sm" : "md"}
          >
            Ver Localidad
          </Button>
        </Stack>
      </MotionBox>
    </MotionBox>
  );
}
