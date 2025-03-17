import {
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function Header({
  onOpenSidebar,
}: {
  onOpenSidebar?: () => void;
}) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <MotionBox
      bg="teal.500"
      color="white"
      py={3}
      px={4}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      boxShadow="md"
      position="sticky"
      top={0}
      zIndex={50}
    >
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={4}>
          <Avatar
            bg="white"
            color="teal.600"
            icon={
              <span role="img" aria-label="doctor">
                🩺
              </span>
            }
            boxShadow="md"
          />
          <Box>
            <Heading size="md" lineHeight="shorter">
              Asistente Cardiovascular
            </Heading>
            <Text fontSize="xs" color="teal.100">
              Tu aliado en la prevención
            </Text>
          </Box>
        </Flex>

        {isMobile && (
          <IconButton
            aria-label="Abrir menú"
            icon={<HamburgerIcon />}
            variant="ghost"
            color="white"
            _hover={{ bg: "teal.600" }}
            onClick={onOpenSidebar}
          />
        )}
      </Flex>
    </MotionBox>
  );
}
