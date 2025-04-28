import {
  Button,
  Heading,
  Input,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaHeartbeat,
  FaUser,
  FaEnvelope,
  FaLock,
  FaRegIdCard,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";

const MotionIcon = motion(FaHeartbeat);

export const RegistrationForm = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const inputBorder = useColorModeValue("gray.300", "gray.600");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tu lógica aquí
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-emerald-50 p-4">
      <motion.div
        className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden"
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
            Create Account
          </Heading>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="flex items-center border rounded-xl p-3 focus-within:ring-2 focus-within:ring-emerald-400 transition">
                <FaUser className="text-gray-400 mr-3" />
                <Input
                  variant="unstyled"
                  placeholder="Full Name"
                  required
                  _placeholder={{ color: "gray.400" }}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center border rounded-xl p-3 focus-within:ring-2 focus-within:ring-emerald-400 transition">
                <FaRegIdCard className="text-gray-400 mr-3" />
                <Input
                  variant="unstyled"
                  placeholder="Identification Number"
                  required
                  _placeholder={{ color: "gray.400" }}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center border rounded-xl p-3 focus-within:ring-2 focus-within:ring-emerald-400 transition">
                <FaEnvelope className="text-gray-400 mr-3" />
                <Input
                  type="email"
                  variant="unstyled"
                  placeholder="Email Address"
                  required
                  _placeholder={{ color: "gray.400" }}
                  className="flex-1"
                />
              </div>
            </div>

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

            <div>
              <div className="flex items-center border rounded-xl p-3 focus-within:ring-2 focus-within:ring-emerald-400 transition">
                <FaLock className="text-gray-400 mr-3" />
                <Input
                  type="password"
                  variant="unstyled"
                  placeholder="Confirm Password"
                  required
                  _placeholder={{ color: "gray.400" }}
                  className="flex-1"
                />
              </div>
            </div>

            <Button
              type="submit"
              colorScheme="green"
              size="lg"
              rounded="full"
              width="full"
              _hover={{ bg: "green.500" }}
            >
              Register
            </Button>

            <Text textAlign="center" fontSize="sm" color="gray.600">
              Already have an account?{" "}
              <Link
                as={RouterLink}
                to="/login"
                color="emerald.500"
                fontWeight="semibold"
                _hover={{ color: "emerald.600" }}
              >
                Sign In
              </Link>
            </Text>
          </form>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 w-full bg-gradient-to-tr from-emerald-500 to-emerald-400 flex flex-col items-center justify-center text-white p-10 relative">
          {/* Icon Centered */}
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
            Welcome to HealthCare
          </Heading>
          <Text color="emerald.100" fontSize="md" textAlign="center" px={6}>
            Join our community of healthcare professionals and start managing
            your practice efficiently.
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
