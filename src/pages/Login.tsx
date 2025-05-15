import {
  Button,
  Input,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { FaHeartbeat, FaIdCard, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { authLogin } from "../api/authService";
import { useAuthStore } from "../states/auth";
import { LoginData } from "../interfaces/auth";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { toast } from "sonner";

type LoginFormInputs = LoginData;

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [loginError, setLoginError] = useState("");

  const mutation = useMutation({
    mutationFn: authLogin,
    onSuccess: (response) => {
      if (response?.data) {
        console.log("Login response", response);
        const { token, user } = response.data;
        const username = user.username;
        const role = user.authorities[0].authority;

        login({
          accessToken: token,
          user: {
            name: username,
            role,
          },
        });

        toast.success("¡Inicio de sesión exitoso! Bienvenido 👋");

        navigate(`/dashboard`);
      }
    },
    onError: (error: any) => {
      console.error("Error en el login", error);
      setLoginError("Identificación o contraseña incorrecta.");

      toast.error("Error en el login 😓 Verifica tus datos");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoginError("");
    mutation.mutate(data);
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
            Iniciar Sesión
          </Heading>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Número de Identificación */}
            <div>
              <div className="flex items-center border rounded-xl p-3 focus-within:ring-2 focus-within:ring-emerald-400 transition">
                <FaIdCard className="text-gray-400 mr-3" />
                <Input
                  type="text"
                  placeholder="Número de Identificación"
                  {...register("username", {
                    required: "El número de identificación es requerido.",
                    // minLength: {
                    //   value: 8,
                    //   message: "Debe tener al menos 8 caracteres.",
                    // },
                    // maxLength: {
                    //   value: 12,
                    //   message: "No puede exceder los 12 caracteres.",
                    // },
                    // pattern: {
                    //   value: /^[0-9]+$/,
                    //   message: "Solo se permiten números.",
                    // },
                  })}
                />
              </div>
              {errors.username && (
                <Text
                  className="text-red-600 text-xs mt-1"
                  data-testid="error-identification"
                >
                  {errors.username.message}
                </Text>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <InputGroup className="border rounded-xl">
                <div className="flex items-center pl-3 pr-2 w-full">
                  <FaLock className="text-gray-400 mr-3" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    variant="unstyled"
                    placeholder="Contraseña"
                    _placeholder={{ color: "gray.400" }}
                    className="flex-1"
                    {...register("password", {
                      required: "La contraseña es requerida.",
                      // minLength: {
                      //   value: 8,
                      //   message: "Debe tener al menos 8 caracteres.",
                      // },
                      // pattern: {
                      //   value:
                      //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                      //   message:
                      //     "Debe contener una mayúscula, una minúscula, un número y un carácter especial.",
                      // },
                    })}
                  />
                  <InputRightElement className="h-full">
                    <IconButton
                      aria-label="Toggle Password"
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                </div>
              </InputGroup>
              {errors.password && (
                <Text className="text-red-600 text-xs mt-1">
                  {errors.password.message}
                </Text>
              )}
            </div>

            {/* Mensaje de error de login */}
            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Text className="text-red-500 text-sm text-center">
                  {loginError}
                </Text>
              </motion.div>
            )}

            {/* Botón Iniciar Sesión */}
            <Button
              type="submit"
              colorScheme="green"
              size="lg"
              rounded="full"
              width="full"
              _hover={{ bg: "green.500" }}
            >
              Iniciar Sesión
            </Button>

            {/* Link Olvidaste Contraseña */}
            <Text textAlign="center" fontSize="sm" color="gray.600">
              ¿Olvidó su contraseña?{" "}
              <a
                href="#"
                className="text-emerald-500 font-semibold hover:text-emerald-600"
              >
                Recuperar
              </a>
            </Text>

            <Text textAlign="center" fontSize="sm" color="gray.600">
              ¿No tienes cuenta?{" "}
              <Link
                as={RouterLink}
                to="/register"
                color="emerald.500"
                fontWeight="semibold"
                _hover={{ color: "emerald.600" }}
              >
                Regístrate aquí
              </Link>
            </Text>
          </form>
        </div>

        {/* Side Info Section */}
        <div className="md:w-1/2 w-full bg-gradient-to-tr from-emerald-500 to-emerald-400 flex flex-col items-center justify-center text-white p-10 relative">
          <FaHeartbeat className="text-7xl mb-6 text-white animate-pulse" />
          <Heading as="h3" size="lg" mb={4}>
            Bienvenido a HealthCare
          </Heading>
          <Text color="emerald.100" fontSize="md" textAlign="center" px={6}>
            Su salud es nuestra prioridad. Inicie sesión para acceder a su
            información médica y servicios personalizados.
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
