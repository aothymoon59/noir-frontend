import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Activity, ArrowUpRight } from "lucide-react";
import { products, orders, revenueData, topCategoriesData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend
} from "recharts";

const COLORS = ["#c9a84c", "#f0d78c", "#867660", "#3a3a3a", "#1a1a1a"];

function Stat({ label, value, delta, up, icon: Icon }: any) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-gold" />
        </div>
        <span className={cn("text-xs font-semibold flex items-center gap-0.5", up ? "text-success" : "text-destructive")}>
          {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {delta}
        </span>
      </div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="font-display text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back. Here's what's happening today.</p>
        </div>
        <Button>Export report <ArrowUpRight className="h-3 w-3 ml-1" /></Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Revenue" value="$184,290" delta="+12.4%" up icon={DollarSign} />
        <Stat label="Orders" value="1,284" delta="+8.1%" up icon={ShoppingBag} />
        <Stat label="Customers" value="9,432" delta="+3.6%" up icon={Users} />
        <Stat label="Conversion" value="3.42%" delta="-0.3%" up={false} icon={Activity} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-semibold">Revenue overview</h2>
              <p className="text-xs text-muted-foreground">Last 12 months</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c9a84c" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#c9a84c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(127,127,127,0.15)" vertical={false} />
              <XAxis dataKey="month" stroke="currentColor" className="text-xs" fontSize={11} />
              <YAxis stroke="currentColor" className="text-xs" fontSize={11} />
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Area type="monotone" dataKey="revenue" stroke="#c9a84c" strokeWidth={2} fill="url(#g)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-display font-semibold mb-1">Top categories</h2>
          <p className="text-xs text-muted-foreground mb-4">By revenue share</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={topCategoriesData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
                {topCategoriesData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {topCategoriesData.map((c, i) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{background:COLORS[i]}} />{c.name}</span>
                <span className="text-muted-foreground">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <h2 className="font-display font-semibold mb-4">Recent orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
                <th className="text-left py-2">Order</th><th className="text-left py-2">Customer</th>
                <th className="text-left py-2">Status</th><th className="text-right py-2">Total</th>
              </tr></thead>
              <tbody>
                {orders.slice(0, 6).map((o) => (
                  <tr key={o.id} className="border-b border-border/50">
                    <td className="py-3 font-mono text-xs">{o.id}</td>
                    <td className="py-3">{o.customer}</td>
                    <td className="py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-muted">{o.status}</span></td>
                    <td className="py-3 text-right font-semibold">${o.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-display font-semibold mb-4">Best sellers</h2>
          <div className="space-y-3">
            {products.slice(0, 5).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-xl font-display font-bold text-gold w-5">{i + 1}</span>
                <img src={p.images[0]} className="h-10 w-10 rounded object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">${p.price} · {p.reviewCount} sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold">Analytics</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-display font-semibold mb-4">Orders by month</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData}>
              <CartesianGrid stroke="rgba(127,127,127,0.15)" vertical={false} />
              <XAxis dataKey="month" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Bar dataKey="orders" fill="#c9a84c" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-display font-semibold mb-4">Revenue trend</h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <CartesianGrid stroke="rgba(127,127,127,0.15)" vertical={false} />
              <XAxis dataKey="month" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Area type="monotone" dataKey="revenue" stroke="#c9a84c" fill="#c9a84c" fillOpacity={0.2} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
