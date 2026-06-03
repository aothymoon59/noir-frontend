import { NavLink, Outlet, Link } from "react-router-dom";
import { User, ShoppingBag, MapPin, Heart, Star, LogOut, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { orders } from "@/lib/mock-data";
import { useWishlist } from "@/lib/store";

const links = [
  { to: "/dashboard", label: "Profile", icon: User, end: true },
  { to: "/dashboard/orders", label: "Orders", icon: ShoppingBag },
  { to: "/dashboard/addresses", label: "Addresses", icon: MapPin },
  { to: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
  { to: "/dashboard/reviews", label: "Reviews", icon: Star },
];

export function DashboardLayout() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="bg-card border border-border rounded-xl p-4 h-fit lg:sticky lg:top-28">
          <div className="flex items-center gap-3 p-2 mb-4">
            <div className="h-12 w-12 rounded-full bg-gold flex items-center justify-center font-display font-bold text-gold-foreground">SA</div>
            <div>
              <p className="font-semibold text-sm">Sara Ahmed</p>
              <p className="text-xs text-muted-foreground">Gold member</p>
            </div>
          </div>
          <nav className="space-y-1">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end}
                className={({ isActive }) => cn("flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors",
                  isActive ? "bg-gold text-gold-foreground font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-muted")}>
                <l.icon className="h-4 w-4" /> {l.label}
              </NavLink>
            ))}
            <Link to="/login" className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md text-muted-foreground hover:text-destructive">
              <LogOut className="h-4 w-4" /> Logout
            </Link>
          </nav>
        </aside>
        <div><Outlet /></div>
      </div>
    </div>
  );
}

export function DashboardProfile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your personal information and preferences.</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { l: "Total orders", v: orders.length, c: "text-foreground" },
          { l: "Saved items", v: 8, c: "text-gold" },
          { l: "Reward points", v: "1,240", c: "text-success" },
        ].map((s) => (
          <div key={s.l} className="bg-card border border-border rounded-xl p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.l}</p>
            <p className={cn("font-display text-3xl font-bold mt-2", s.c)}>{s.v}</p>
          </div>
        ))}
      </div>
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-semibold">Personal Info</h2>
          <Button size="sm" variant="outline"><Edit className="h-3 w-3 mr-1.5" /> Edit</Button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label>First name</Label><Input defaultValue="Sara" /></div>
          <div><Label>Last name</Label><Input defaultValue="Ahmed" /></div>
          <div><Label>Email</Label><Input defaultValue="sara@mail.com" /></div>
          <div><Label>Phone</Label><Input defaultValue="+880 1700 000000" /></div>
        </div>
        <Button className="mt-4">Save changes</Button>
      </div>
    </div>
  );
}

export function DashboardOrders() {
  const statusColor = (s: string) => ({
    Pending: "bg-muted text-muted-foreground",
    Confirmed: "bg-chart-2/20 text-chart-2",
    Processing: "bg-chart-4/20 text-chart-4",
    Packed: "bg-chart-5/20 text-chart-5",
    Shipped: "bg-chart-2/20 text-chart-2",
    Delivered: "bg-success/20 text-success",
    Returned: "bg-destructive/20 text-destructive",
    Cancelled: "bg-destructive/20 text-destructive",
  } as Record<string, string>)[s];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-6">Order History</h1>
      <div className="space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-border">
              <div>
                <p className="font-display font-bold">{o.id}</p>
                <p className="text-xs text-muted-foreground">Placed on {o.date}</p>
              </div>
              <span className={cn("text-xs font-semibold px-3 py-1 rounded-full", statusColor(o.status))}>{o.status}</span>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex -space-x-2">
                {o.items.map((it, i) => <img key={i} src={it.image} className="h-12 w-12 rounded-md border-2 border-card object-cover" />)}
              </div>
              <div className="flex-1 text-sm">
                <p className="text-muted-foreground">{o.items.length} item{o.items.length > 1 ? "s" : ""}</p>
                <p className="font-display font-bold text-lg">${o.total.toFixed(2)}</p>
              </div>
              <Button size="sm" variant="outline">View details</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardAddresses() {
  const addrs = [
    { id: 1, label: "Home", name: "Sara Ahmed", line: "House 24, Road 9, Banani, Dhaka 1213", default: true },
    { id: 2, label: "Office", name: "Sara Ahmed", line: "Floor 7, Gulshan Avenue, Dhaka 1212", default: false },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold">Addresses</h1>
        <Button>Add address</Button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {addrs.map((a) => (
          <div key={a.id} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-gold font-semibold">{a.label}</span>
              {a.default && <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">Default</span>}
            </div>
            <p className="font-semibold mt-2">{a.name}</p>
            <p className="text-sm text-muted-foreground mt-1">{a.line}</p>
            <div className="flex gap-2 mt-4"><Button size="sm" variant="outline">Edit</Button><Button size="sm" variant="ghost">Remove</Button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardWishlist() {
  const { items, remove } = useWishlist();
  if (items.length === 0) return <div className="text-center py-16"><Heart className="h-12 w-12 text-muted-foreground mx-auto mb-3" /><p className="text-muted-foreground">Your wishlist is empty.</p></div>;
  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-6">Wishlist</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <div key={p.id} className="bg-card border border-border rounded-xl overflow-hidden">
            <Link to={`/product/${p.slug}`}><img src={p.images[0]} alt={p.name} className="aspect-[4/5] w-full object-cover" /></Link>
            <div className="p-3">
              <p className="text-xs text-muted-foreground uppercase">{p.brand}</p>
              <p className="font-display font-semibold text-sm line-clamp-1">{p.name}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold">${p.price}</span>
                <Button size="sm" variant="ghost" onClick={() => remove(p.id)}><Heart className="h-4 w-4 fill-destructive text-destructive" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardReviews() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-6">My Reviews</h1>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-1">{Array.from({length:5}).map((_,j)=><Star key={j} className="h-4 w-4 fill-gold text-gold" />)}</div>
            <p className="font-display font-semibold mt-2">Atelier Oversized Tee</p>
            <p className="text-sm text-muted-foreground mt-1">Loved the fabric quality and fit. Worth every penny.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
