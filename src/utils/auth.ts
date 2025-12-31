export type Role = "client" | "admin";

export const login = (role: Role) => {
  localStorage.setItem("auth_role", role);
};

export const logout = () => {
  localStorage.removeItem("auth_role");
};

export const getRole = (): Role | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_role") as Role | null;
};

export const isAuthorized = (role: Role) => {
  return getRole() === role;
};
