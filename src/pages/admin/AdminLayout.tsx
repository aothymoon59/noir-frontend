import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import {
  LayoutDashboard, Package, ShoppingBag, Users, Tags, Layers,
  Image, Palette, Settings, BarChart3, FileText, Menu as MenuIcon,
  LayoutTemplate, Ticket, Bell, Search, Sun, Moon, PanelLeftClose,
  PanelLeftOpen, Store,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
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

function SidebarContent({ onNavigate, collapsed = false }: { onNavigate?: () => void; collapsed?: boolean }) {
  return (
    <>
      <Link
        to="/"
        onClick={onNavigate}
        className={cn(
          "flex h-16 items-center border-b border-sidebar-border px-4 font-display font-bold",
          collapsed ? "justify-center text-xl" : "text-2xl",
        )}
        title="Open storefront"
      >
        {collapsed ? (
          <Store className="h-5 w-5 text-gold" />
        ) : (
          <>
            NOIR<span className="text-gold">.</span>
            <span className="ml-1 font-sans text-xs uppercase tracking-widest text-muted-foreground">Admin</span>
          </>
        )}
      </Link>
      <nav className="flex-1 overflow-y-auto p-3 space-y-6">
        {groups.map((g) => (
          <div key={g.label}>
            {!collapsed && <p className="text-[10px] uppercase tracking-widest text-muted-foreground px-3 mb-2 font-semibold">{g.label}</p>}
            <div className="space-y-0.5">
              {g.items.map((i) => (
                <NavLink key={i.to} to={i.to} end={(i as any).end} onClick={onNavigate}
                  title={collapsed ? i.label : undefined}
                  className={({ isActive }) => cn("flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                    collapsed && "justify-center px-2",
                    isActive ? "bg-gold text-gold-foreground font-semibold"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground")}>
                  <i.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span className="truncate">{i.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </>
  );
}

export function AdminLayout() {
  const { resolved, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-muted/25 lg:flex">
      {/* Desktop sidebar */}
      <aside className={cn("sticky top-0 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 lg:flex", collapsed ? "w-20" : "w-72")}>
        <SidebarContent collapsed={collapsed} />
      </aside>

      {/* Mobile drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0 w-[min(20rem,calc(100vw-2rem))] bg-sidebar text-sidebar-foreground border-sidebar-border flex flex-col">
          <SidebarContent onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between gap-3 px-3 sm:px-4 md:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)}>
            <MenuIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden lg:inline-flex" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
          <div className="min-w-0 lg:hidden">
            <p className="font-display text-lg font-bold">NOIR<span className="text-gold">.</span></p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Admin CMS</p>
          </div>
          <div className="relative hidden flex-1 md:block md:max-w-md">
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
          </div>
          <div className="px-3 pb-3 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search products, orders, customers..." className="h-9 pl-9" />
            </div>
          </div>
        </header>
        <main className="flex-1 min-w-0 p-3 sm:p-4 md:p-6 xl:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
