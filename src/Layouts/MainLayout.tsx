import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleOpenSidebar = () => setIsSidebarOpen(true);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  return (
    <Box minH="100vh" bg="gray.50">
      {isMobile && (
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          position="fixed"
          top="1rem"
          left="1rem"
          zIndex={1200}
          colorScheme="green"
          onClick={handleOpenSidebar}
        />
      )}

      <Sidebar
        isOpen={!isMobile || isSidebarOpen}
        onClose={handleCloseSidebar}
        isMobile={!!isMobile}
      />

      <Box ml={!isMobile ? "280px" : 0} p={6} transition="margin 0.3s ease">
        <Outlet />
      </Box>
    </Box>
  );
}
