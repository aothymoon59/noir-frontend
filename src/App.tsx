import { Outlet } from "react-router-dom";
import { CartProvider, ThemeProvider, WishlistProvider } from "@/lib/store";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <Outlet />
          <Toaster />
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
