import { useState } from "react";
import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Sidebar } from "./components/Sidebar";
import { CardiovascularDashboard } from "./components/Dashboard";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Detecta si es mobile desde Chakra (más limpio que useEffect)
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleOpenSidebar = () => setIsSidebarOpen(true);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Botón de hamburguesa solo en mobile */}
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

      {/* Contenido principal */}
      <Box
        ml={!isMobile ? "280px" : 0} // Deja espacio al sidebar en desktop
        p={6}
        transition="margin 0.3s ease"
      >
        <Box fontSize="2xl" fontWeight="bold" color="green.700">
          Contenido Principal
        </Box>
        <Box mt={4}>
          <CardiovascularDashboard />
        </Box>
      </Box>
    </Box>
  );
}
