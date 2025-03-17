import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);

export default function MessageBubble({
  text,
  sender,
}: {
  text: string;
  sender: string;
}) {
  const isUser = sender === "user";

  return (
    <MotionFlex
      justify={isUser ? "flex-end" : "flex-start"}
      align="flex-end"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.02,
      }}
      w="full"
    >
      {!isUser && (
        <Avatar
          size="sm"
          name="Asistente"
          bgGradient="linear(to-br, teal.400, green.500)"
          color="white"
          icon={<ChatIcon boxSize={4} />}
          boxShadow="md"
        />
      )}

      <Box
        bg={isUser ? "teal.500" : "white"}
        color={isUser ? "white" : "gray.800"}
        px={4}
        py={3}
        borderRadius="xl"
        maxW="70%"
        ml={isUser ? 0 : 2}
        mr={isUser ? 2 : 0}
        boxShadow="md"
        fontSize="sm"
        position="relative"
      >
        <Text lineHeight="short">{text}</Text>
      </Box>

      {isUser && (
        <Avatar
          size="sm"
          name="Usuario"
          bg="gray.300"
          color="black"
          boxShadow="md"
        />
      )}
    </MotionFlex>
  );
}
