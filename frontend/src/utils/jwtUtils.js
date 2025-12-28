import { jwtDecode } from "jwt-decode";

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    return {
      email: decoded.sub,
      role: decoded.role?.replace("ROLE_", ""),
      name: decoded.name || decoded.sub,
    };
  } catch {
    return null;
  }
};
