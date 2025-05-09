import {
  Button,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/react";
import {
  FaHeartbeat,
  FaUser,
  FaEnvelope,
  FaLock,
  FaRegIdCard,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../states/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { authRegister } from "../api/authService";
import { RegisterMedicalData } from "../interfaces/auth";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const MotionIcon = motion(FaHeartbeat);

type RegisterFormInputs = RegisterMedicalData & {
  confirmPassword: string;
};

export const RegistrationMedicalForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const mutation = useMutation({
    mutationFn: authRegister,
    onSuccess: (response) => {
      if (response?.data?.token) {
        login(response.data.token);
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    },
    onError: (error: any) => {
      console.error("Error en el registro", error);
      setRegisterError("Hubo un error al registrarse. Verifica los datos.");
    },
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    setRegisterError("");

    if (data.password !== data.confirmPassword) {
      setRegisterError("Las contraseñas no coinciden.");
      return;
    }

    mutation.mutate(data);
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
            Crear Personal de Salud
          </Heading>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <div className="flex items-center border rounded-xl p-3 focus-within:ring-2 focus-within:ring-emerald-400 transition">
                <FaUser className="text-gray-400 mr-3" />
                <Input
                  variant="unstyled"
                  placeholder="Nombre Completo"
                  _placeholder={{ color: "gray.400" }}
                  className="flex-1"
                  {...register("name", {
                    required: "El nombre completo es requerido.",
                    minLength: {
                      value: 3,
                      message: "Debe tener al menos 3 caracteres.",
                    },
                    maxLength: {
                      value: 50,
                      message: "No puede exceder los 50 caracteres.",
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Solo se permiten letras y espacios.",
                    },
                  })}
                />
              </div>
              {errors.name && (
                <Text className="text-red-600 text-xs mt-1">
                  {errors.name.message}
                </Text>
              )}
            </div>

            <div>
              <div className="flex items-center border rounded-xl p-3 focus-within:ring-2 focus-within:ring-emerald-400 transition">
                <FaRegIdCard className="text-gray-400 mr-3" />
                <Input
                  type="text"
                  variant="unstyled"
                  placeholder="Número de Identificación"
                  {...register("identificationNumber", {
                    required: "El número de identificación es requerido.",
                    minLength: {
                      value: 8,
                      message: "Debe tener al menos 8 caracteres.",
                    },
                    maxLength: {
                      value: 12,
                      message: "No puede exceder los 12 caracteres.",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Solo se permiten números.",
                    },
                  })}
                />
              </div>
              {errors.identificationNumber && (
                <Text
                  className="text-red-600 text-xs mt-1"
                  data-testid="error-identification"
                >
                  {errors.identificationNumber.message}
                </Text>
              )}
            </div>

            <div>
              <div className="flex items-center border rounded-xl p-3 focus-within:ring-2 focus-within:ring-emerald-400 transition">
                <FaRegIdCard className="text-gray-400 mr-3" />
                <Input
                  variant="unstyled"
                  placeholder="Tarjeta Profesional"
                  _placeholder={{ color: "gray.400" }}
                  className="flex-1"
                  {...register("profesionalLicense", {
                    required:
                      "El número de la tarjeta profesional es requerido.",
                    minLength: {
                      value: 8,
                      message: "Debe tener al menos 8 caracteres.",
                    },
                    maxLength: {
                      value: 12,
                      message: "No puede exceder los 12 caracteres.",
                    },
                  })}
                />
              </div>
              {errors.identificationNumber && (
                <Text className="text-red-600 text-xs mt-1">
                  {errors.identificationNumber.message}
                </Text>
              )}
            </div>

            <div>
              <div className="flex items-center border rounded-xl p-3 focus-within:ring-2 focus-within:ring-emerald-400 transition">
                <FaEnvelope className="text-gray-400 mr-3" />
                <Input
                  type="text"
                  variant="unstyled"
                  placeholder="Correo Electrónico"
                  _placeholder={{ color: "gray.400" }}
                  className="flex-1"
                  {...register("email", {
                    required: "El correo electrónico es requerido.",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Formato de correo inválido.",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <Text
                  className="text-red-600 text-xs mt-1"
                  data-testid="error-email"
                >
                  {errors.email.message}
                </Text>
              )}
            </div>

            <div>
              <InputGroup className="w-full">
                <div className="flex items-center border rounded-xl p-3 w-full focus-within:ring-2 focus-within:ring-emerald-400 transition">
                  <FaLock className="text-gray-400 mr-3" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    variant="unstyled"
                    placeholder="Contraseña"
                    _placeholder={{ color: "gray.400" }}
                    className="flex-1"
                    {...register("password", {
                      required: "La contraseña es requerida.",
                      minLength: {
                        value: 8,
                        message: "Debe tener al menos 8 caracteres.",
                      },
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                        message:
                          "Debe contener una mayúscula, una minúscula, un número y un carácter especial.",
                      },
                    })}
                  />
                  <InputRightElement className="right-3">
                    <IconButton
                      aria-label="Toggle Password"
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      variant="ghost"
                      size="sm"
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

            {/* <div>
              <InputGroup className="w-full">
                <div className="flex items-center border rounded-xl p-3 w-full focus-within:ring-2 focus-within:ring-emerald-400 transition">
                  <FaLock className="text-gray-400 mr-3" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    variant="unstyled"
                    placeholder="Confirmar Contraseña"
                    _placeholder={{ color: "gray.400" }}
                    className="flex-1"
                    {...register("confirmPassword", {
                      required: "La contraseña es requerida.",
                      minLength: {
                        value: 8,
                        message: "Debe tener al menos 8 caracteres.",
                      },
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                        message:
                          "Debe contener una mayúscula, una minúscula, un número y un carácter especial.",
                      },
                    })}
                  />
                  <InputRightElement className="right-3">
                    <IconButton
                      aria-label="Toggle Password"
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      variant="unstyled"
                      size="sm"
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
            </div> */}

            {/* Mensaje de error de register */}
            {registerError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Text className="text-red-500 text-sm text-center">
                  {registerError}
                </Text>
              </motion.div>
            )}

            <Button
              type="submit"
              colorScheme="green"
              size="lg"
              rounded="full"
              width="full"
              _hover={{ bg: "green.500" }}
            >
              Crear Cuenta
            </Button>

            <Text textAlign="center" fontSize="sm" color="gray.600">
              ¿Ya tienes una cuenta?{" "}
              <Link
                as={RouterLink}
                to="/login"
                color="emerald.500"
                fontWeight="semibold"
                _hover={{ color: "emerald.600" }}
              >
                Iniciar Sesión
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
            Bienvenido a HealthCare
          </Heading>
          <Text color="emerald.100" fontSize="md" textAlign="center" px={6}>
            Regístrate para acceder a una atención médica personalizada y
            eficiente.
            <br /> Tu salud es nuestra prioridad.
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
