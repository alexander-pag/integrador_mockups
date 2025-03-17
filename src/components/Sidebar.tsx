import {
  Avatar,
  Box,
  Divider,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  ChatIcon,
  BellIcon,
  SettingsIcon,
  QuestionIcon,
  InfoIcon,
} from "@chakra-ui/icons";

import { motion } from "framer-motion";

// Motion Wrapper para ListItem
const MotionListItem = motion(ListItem);

export const Sidebar = ({
  isOpen,
  onClose,
  isMobile,
}: {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}) => {
  const user = {
    name: "John Doe",
    role: "Doctor",
    avatar: "https://bit.ly/broken-link", // Tu avatar real aquí
  };

  const menuItems = [
    { name: "Chat", icon: ChatIcon },
    { name: "Notifications", icon: BellIcon },
    { name: "Settings", icon: SettingsIcon },
    { name: "Help", icon: QuestionIcon },
    { name: "About", icon: InfoIcon },
  ];

  const SidebarContent = () => (
    <VStack spacing={6} align="stretch" w="full" h="100%">
      <Box p={4}>
        <Text fontSize="2xl" fontWeight="bold" color="green.600">
          MediChat AI
        </Text>
      </Box>

      <Box px={4}>
        <HStack spacing={3}>
          <Avatar size="md" name={user.name} src={user.avatar} />
          <Box>
            <Text fontWeight="medium">{user.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {user.role}
            </Text>
          </Box>
        </HStack>
      </Box>

      <Divider />

      <List spacing={2} px={4} flex="1">
        {menuItems.map((item, index) => (
          <MotionListItem
            key={index}
            cursor="pointer"
            p={3}
            borderRadius="md"
            whileHover={{
              scale: 1.05,
              y: -2,
              backgroundColor: "rgba(72, 187, 120, 0.1)", // Verde suave
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileTap={{ scale: 0.98 }}
          >
            <HStack>
              <ListIcon as={item.icon} color="green.500" />
              <Text>{item.name}</Text>
            </HStack>
          </MotionListItem>
        ))}
      </List>

      <Box px={4} py={4}>
        <Text fontSize="xs" color="gray.400">
          © 2025 MediChat AI
        </Text>
      </Box>
    </VStack>
  );

  // Mobile version (Drawer)
  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxW="250px">
          <DrawerCloseButton />
          <Box p={4}>
            <SidebarContent />
          </Box>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop version (Motion Sidebar)
  const MotionBox = motion(Box);

  return (
    <MotionBox
      position="fixed"
      left={0}
      w="280px"
      h="100vh"
      bg="white"
      borderRight="1px solid"
      borderColor="gray.200"
      zIndex={1000}
      initial={{ x: -280 }}
      animate={{ x: isOpen ? 0 : -280 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      boxShadow="md"
    >
      <SidebarContent />
    </MotionBox>
  );
};
