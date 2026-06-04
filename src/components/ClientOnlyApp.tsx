import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";

export function ClientOnlyApp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <RouterProvider router={router} />;
}
