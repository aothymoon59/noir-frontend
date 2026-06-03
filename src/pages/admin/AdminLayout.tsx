import { NavLink, Outlet, Link } from "react-router-dom";
import {
  LayoutDashboard, Package, ShoppingBag, Users, Tags, Layers,
  Image, Palette, Settings, BarChart3, FileText, Menu as MenuIcon,
  LayoutTemplate, Ticket, Bell, Search, Sun, Moon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/store";

const groups = [
  {
    label: "Overview",
    items: [
      { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
      { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Catalog",
    items: [
      { to: "/admin/products", label: "Products", icon: Package },
      { to: "/admin/categories", label: "Categories", icon: Layers },
      { to: "/admin/brands", label: "Brands", icon: Tags },
    ],
  },
  {
    label: "Sales",
    items: [
      { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
      { to: "/admin/customers", label: "Customers", icon: Users },
      { to: "/admin/coupons", label: "Coupons", icon: Ticket },
    ],
  },
  {
    label: "Content",
    items: [
      { to: "/admin/blogs", label: "Blogs", icon: FileText },
      { to: "/admin/pages", label: "Pages CMS", icon: FileText },
      { to: "/admin/menus", label: "Menus", icon: MenuIcon },
      { to: "/admin/media", label: "Media", icon: Image },
    ],
  },
  {
    label: "Storefront",
    items: [
      { to: "/admin/builder", label: "Homepage Builder", icon: LayoutTemplate },
      { to: "/admin/theme", label: "Theme Settings", icon: Palette },
      { to: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function AdminLayout() {
  const { resolved, setTheme } = useTheme();
  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <Link to="/" className="font-display text-2xl font-bold p-6 border-b border-sidebar-border">
          NOIR<span className="text-gold">.</span><span className="text-xs text-muted-foreground ml-1 font-sans uppercase tracking-widest">Admin</span>
        </Link>
        <nav className="flex-1 overflow-y-auto p-3 space-y-6">
          {groups.map((g) => (
            <div key={g.label}>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground px-3 mb-2 font-semibold">{g.label}</p>
              <div className="space-y-0.5">
                {g.items.map((i) => (
                  <NavLink key={i.to} to={i.to} end={(i as any).end}
                    className={({ isActive }) => cn("flex items-center gap-3 px-3 py-2 text-sm rounded-md",
                      isActive ? "bg-gold text-gold-foreground font-semibold" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground")}>
                    <i.icon className="h-4 w-4" /> {i.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 h-16 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 gap-4">
          <div className="relative flex-1 max-w-md hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search anything..." className="pl-9 h-9" />
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <Button variant="ghost" size="icon" onClick={() => setTheme(resolved === "dark" ? "light" : "dark")}>
              {resolved === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
            <div className="h-8 w-8 rounded-full bg-gold flex items-center justify-center font-bold text-xs text-gold-foreground">A</div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 min-w-0"><Outlet /></main>
      </div>
    </div>
  );
}
