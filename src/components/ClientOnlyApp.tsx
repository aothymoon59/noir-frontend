import { RouterProvider } from "react-router-dom";
import { router } from "@/router";

export function ClientOnlyApp() {
  return <RouterProvider router={router} />;
}
