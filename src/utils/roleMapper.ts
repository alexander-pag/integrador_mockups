export const roleDisplayNames: Record<string, string> = {
  ROLE_ADMIN: "Administrador",
  ROLE_MEDICO: "Médico",
  ROLE_ENFERMERA: "Enfermera",
};

export const getRoleDisplayName = (role: string): string =>
  roleDisplayNames[role] || "Rol desconocido";
