import { Button, Input, Link, Heading, Text } from "@chakra-ui/react";
import { FaHeartbeat, FaIdCard, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionIcon = motion(FaHeartbeat);

export const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría tu lógica de login (API call, validaciones, etc.)
    console.log("Logging in...");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-emerald-50 p-4">
      <motion.div
        className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Form Section */}
        <div className="md:w-1/2 w-full p-10 bg-white">
          <Heading
            as="h2"
            size="lg"
            color="gray.700"
            mb={8}
            display="flex"
            alignItems="center"
            fontWeight="bold"
          >
            <FaHeartbeat className="text-emerald-600 mr-3 text-3xl" />
            Sign In
          </Heading>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Número de Identificación */}
            <div>
              <div className="flex items-center border rounded-xl p-3 focus-within:ring-2 focus-within:ring-emerald-400 transition">
                <FaIdCard className="text-gray-400 mr-3" />
                <Input
                  type="number"
                  variant="unstyled"
                  placeholder="Identification Number"
                  required
                  _placeholder={{ color: "gray.400" }}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <div className="flex items-center border rounded-xl p-3 focus-within:ring-2 focus-within:ring-emerald-400 transition">
                <FaLock className="text-gray-400 mr-3" />
                <Input
                  type="password"
                  variant="unstyled"
                  placeholder="Password"
                  required
                  _placeholder={{ color: "gray.400" }}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Botón Iniciar Sesión */}
            <Button
              type="submit"
              colorScheme="green"
              size="lg"
              rounded="full"
              width="full"
              _hover={{ bg: "green.500" }}
            >
              Login
            </Button>

            {/* Link Olvidaste Contraseña */}
            <Text textAlign="center" fontSize="sm" color="gray.600">
              Forgot your password?{" "}
              <Link
                href="#"
                color="emerald.500"
                fontWeight="semibold"
                _hover={{ color: "emerald.600" }}
              >
                Reset it
              </Link>
            </Text>
          </form>
        </div>

        {/* Side Info Section */}
        <div className="md:w-1/2 w-full bg-gradient-to-tr from-emerald-500 to-emerald-400 flex flex-col items-center justify-center text-white p-10 relative">
          {/* Icono centrado */}
          <MotionIcon
            className="text-7xl mb-6 text-white"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />

          <Heading as="h3" size="lg" mb={4}>
            Welcome Back
          </Heading>
          <Text color="emerald.100" fontSize="md" textAlign="center" px={6}>
            Enter your credentials to access your HealthCare dashboard and
            manage your practice.
          </Text>

          <Text
            position="absolute"
            bottom="4"
            fontSize="xs"
            color="emerald.100"
          >
            © 2025 HealthCare Inc.
          </Text>
        </div>
      </motion.div>
    </div>
  );
};
