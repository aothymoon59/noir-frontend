import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./mock-data";

// ============ Theme ============
type Theme = "light" | "dark" | "system";
interface ThemeCtx { theme: Theme; setTheme: (t: Theme) => void; resolved: "light" | "dark"; }
const ThemeContext = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("theme") as Theme) || "dark";
  });

  const resolved = useMemo<"light" | "dark">(() => {
    if (theme === "system" && typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return theme === "light" ? "light" : "dark";
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", resolved === "dark");
    localStorage.setItem("theme", theme);
  }, [resolved, theme]);

  return <ThemeContext.Provider value={{ theme, setTheme, resolved }}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => {
  const c = useContext(ThemeContext);
  if (!c) throw new Error("useTheme must be used inside ThemeProvider");
  return c;
};

// ============ Cart ============
export interface CartItem {
  id: string;
  product: Product;
  qty: number;
  size?: string;
  color?: string;
}
interface CartCtx {
  items: CartItem[];
  add: (p: Product, opts?: { qty?: number; size?: string; color?: string }) => void;
  remove: (id: string) => void;
  update: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  count: number;
}
const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const add: CartCtx["add"] = (p, opts) => {
    const key = `${p.id}-${opts?.size ?? ""}-${opts?.color ?? ""}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === key);
      if (existing) {
        return prev.map((i) => (i.id === key ? { ...i, qty: i.qty + (opts?.qty ?? 1) } : i));
      }
      return [...prev, { id: key, product: p, qty: opts?.qty ?? 1, size: opts?.size, color: opts?.color }];
    });
  };

  const remove = (id: string) => setItems((p) => p.filter((i) => i.id !== id));
  const update = (id: string, qty: number) =>
    setItems((p) => p.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  const clear = () => setItems([]);

  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, update, clear, subtotal, count }}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
};

// ============ Wishlist ============
interface WishCtx {
  items: Product[];
  toggle: (p: Product) => void;
  has: (id: string) => boolean;
  remove: (id: string) => void;
}
const WishContext = createContext<WishCtx | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const toggle = (p: Product) =>
    setItems((prev) => (prev.find((i) => i.id === p.id) ? prev.filter((i) => i.id !== p.id) : [...prev, p]));
  const has = (id: string) => items.some((i) => i.id === id);
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  return <WishContext.Provider value={{ items, toggle, has, remove }}>{children}</WishContext.Provider>;
}
export const useWishlist = () => {
  const c = useContext(WishContext);
  if (!c) throw new Error("useWishlist must be used inside WishlistProvider");
  return c;
};
