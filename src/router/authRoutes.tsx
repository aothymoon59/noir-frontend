import type { RouteObject } from "react-router-dom";
import { Login, Register } from "@/pages/Auth";

export const authRoutes: RouteObject[] = [
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
];
