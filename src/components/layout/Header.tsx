import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  ChevronRight,
} from "lucide-react";
import { megaMenu, type MenuNode } from "@/lib/mock-data";
import { useCart, useWishlist, useTheme } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

function NestedMenu({ nodes, depth = 0 }: { nodes: MenuNode[]; depth?: number }) {
  return (
    <ul className={cn("space-y-1", depth > 0 && "pl-3 border-l border-border/60 ml-2 mt-1")}>
      {nodes.map((n) => (
        <li key={n.href} className="group/item">
          <Link
            to={n.href}
            className="flex items-center justify-between py-1.5 text-sm text-muted-foreground hover:text-gold transition-colors"
          >
            <span>{n.label}</span>
            {n.children && <ChevronRight className="h-3.5 w-3.5 opacity-50" />}
          </Link>
          {n.children && <NestedMenu nodes={n.children} depth={depth + 1} />}
        </li>
      ))}
    </ul>
  );
}

function MegaPanel({ node }: { node: MenuNode }) {
  if (!node.children) return null;
  return (
    <div className="absolute left-1/2 top-full z-50 w-[min(680px,calc(100vw-2rem))] -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
      <div className="bg-popover border border-border rounded-xl shadow-2xl p-5 grid grid-cols-3 xl:grid-cols-4 gap-5">
        {node.children.map((col) => (
          <div key={col.href}>
            <Link
              to={col.href}
              className="font-display text-sm font-semibold text-foreground hover:text-gold transition-colors block mb-3 uppercase tracking-wider"
            >
              {col.label}
            </Link>
            {col.children && <NestedMenu nodes={col.children} />}
          </div>
        ))}
        <div className="col-span-1 row-span-full rounded-lg overflow-hidden relative bg-muted hidden md:block">
          <img
            src={`https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop&q=80`}
            alt="Featured"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
            <div>
              <p className="text-xs text-gold uppercase tracking-widest mb-1">Featured</p>
              <p className="font-display text-white text-lg">New {node.label} Collection</p>
              <Link to={node.href} className="text-xs text-white/80 underline mt-1 inline-block">
                Shop now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenuItem({ node, depth = 0 }: { node: MenuNode; depth?: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn(depth > 0 && "pl-4")}>
      <div className="flex items-center justify-between py-2 border-b border-border/40">
        <Link to={node.href} className="text-sm font-medium">
          {node.label}
        </Link>
        {node.children && (
          <button onClick={() => setOpen(!open)} className="p-1">
            <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
          </button>
        )}
      </div>
      {open && node.children && (
        <div className="ml-2 border-l border-border/40">
          {node.children.map((c) => (
            <MobileMenuItem key={c.href} node={c} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const { count } = useCart();
  const { items: wish } = useWishlist();
  const { resolved, setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const loc = useLocation();
  const isAdmin = loc.pathname.startsWith("/admin");
  if (isAdmin) return null;

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      {/* Announcement */}
      <div className="bg-foreground text-background text-center px-3 py-2 text-[11px] sm:text-xs tracking-wider uppercase">
        Free shipping on orders over $99 · <span className="text-gold">Holiday sale up to 40% off</span>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex min-w-0 items-center justify-between gap-2 h-16 md:h-20">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[min(20rem,calc(100vw-2rem))] overflow-y-auto">
              <div className="font-display text-2xl font-bold mb-6">
                NOIR<span className="text-gold">.</span>
              </div>
              <div className="space-y-1">
                {megaMenu.map((n) => (
                  <MobileMenuItem key={n.href} node={n} />
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-border space-y-2">
                <Link to="/blog" className="block py-2 text-sm">Blog</Link>
                <Link to="/about" className="block py-2 text-sm">About</Link>
                <Link to="/contact" className="block py-2 text-sm">Contact</Link>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="font-display text-2xl md:text-3xl font-bold tracking-tight shrink-0">
            NOIR<span className="text-gold">.</span>
          </Link>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {megaMenu.map((n) => (
              <div key={n.href} className="group relative">
                <Link
                  to={n.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-gold transition-colors uppercase tracking-wider"
                >
                  {n.label}
                  {n.children && <ChevronDown className="h-3 w-3 opacity-50" />}
                </Link>
                <MegaPanel node={n} />
              </div>
            ))}
            <Link to="/blog" className="px-4 py-2 text-sm font-medium uppercase tracking-wider hover:text-gold transition-colors">
              Journal
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-0 sm:gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10" onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 sm:h-10 sm:w-10"
              onClick={() => setTheme(resolved === "dark" ? "light" : "dark")}
            >
              {resolved === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link to="/dashboard" className="hidden sm:block">
              <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
            </Link>
            <Link to="/wishlist" className="relative hidden sm:block">
              <Button variant="ghost" size="icon"><Heart className="h-5 w-5" /></Button>
              {wish.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold text-gold-foreground text-[10px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {wish.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10"><ShoppingBag className="h-5 w-5" /></Button>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold text-gold-foreground text-[10px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        {searchOpen && (
          <form onSubmit={onSearch} className="pb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                autoFocus
                placeholder="Search for products, brands and more..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="pl-11 h-12 text-base"
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1">
                <X className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </header>
  );
}
