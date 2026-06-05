import { Outlet } from "react-router-dom";
import { CartProvider, ThemeProvider, WishlistProvider } from "@/lib/store";
import { Toaster } from "@/components/ui/sonner";
import ScrollToTop from "./components/shared/ScrollToTop";

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <Outlet />
          <Toaster />
          <ScrollToTop />
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
