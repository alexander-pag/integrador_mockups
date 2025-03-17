import {
  Box,
  Flex,
  Input,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

import MessageBubble from "./MessageBubble";
import FileUpload from "./FileUpload";
import Header from "./Header";

const MotionBox = motion(Box);

export default function ChatWindow() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <MotionBox
      className="flex flex-col flex-grow relative"
      bg="gray.50"
      w="full"
      h="100%"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />

      {/* Mensajes */}
      <Box
        className="flex-grow overflow-y-auto"
        px={4}
        py={6}
        display="flex"
        flexDirection="column"
        gap={4}
      >
        {/* Conversación de ejemplo */}
        <MessageBubble
          text="Hola, soy tu asistente virtual. ¿En qué puedo ayudarte hoy?"
          sender="bot"
        />
        <MessageBubble
          text="Quiero evaluar mi riesgo cardiovascular."
          sender="user"
        />
        <MessageBubble
          text="¡Claro! Para empezar, necesito saber tu edad."
          sender="bot"
        />
        <MessageBubble text="25 años" sender="user" />
        <MessageBubble text="¿Cuál es tu género?" sender="bot" />
        <MessageBubble text="Masculino" sender="user" />
        <MessageBubble text="¿Cuál es tu peso en kilogramos?" sender="bot" />
        <MessageBubble text="70 kg" sender="user" />
      </Box>

      {/* Barra de mensaje */}
      <Box
        className="sticky bottom-0"
        p={isMobile ? 2 : 4}
        bg="white"
        borderTopWidth="1px"
        borderColor="gray.200"
        zIndex={10}
      >
        <Flex gap={2} align="center">
          <FileUpload />
          <Input
            placeholder="Escribe tu mensaje..."
            bg="gray.100"
            _focus={{ borderColor: "teal.400", bg: "white" }}
            borderRadius="full"
            size={isMobile ? "sm" : "md"}
            isDisabled
          />
          <IconButton
            icon={<ArrowForwardIcon />}
            colorScheme="teal"
            borderRadius="full"
            size={isMobile ? "sm" : "md"}
            aria-label="Enviar mensaje"
            isDisabled
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            as={motion.button}
          />
        </Flex>
      </Box>
    </MotionBox>
  );
}
