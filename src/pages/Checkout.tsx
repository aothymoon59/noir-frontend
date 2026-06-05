import { Link, useNavigate } from "react-router-dom";
import { Lock, Check, ChevronRight, CreditCard, Truck, Wallet } from "lucide-react";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState("card");
  const navigate = useNavigate();
  const ship = shipping === "express" ? 19 : subtotal > 99 ? 0 : 9;
  const tax = subtotal * 0.08;
  const total = subtotal + ship + tax;

  const place = (e: React.FormEvent) => {
    e.preventDefault();
    clear();
    navigate("/dashboard/orders");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="font-display text-2xl font-bold inline-block mb-2">NOIR<span className="text-gold">.</span></Link>
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

      <form onSubmit={place} className="grid min-w-0 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] gap-8">
        <div className="space-y-6">
          {/* Contact */}
          <section className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-display text-lg font-semibold mb-4">1. Customer Information</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>Email</Label><Input required type="email" placeholder="you@email.com" /></div>
              <div><Label>Phone</Label><Input required placeholder="+1 555 0100" /></div>
            </div>
          </section>

          {/* Shipping */}
          <section className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-display text-lg font-semibold mb-4">2. Shipping Address</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>First name</Label><Input required /></div>
              <div><Label>Last name</Label><Input required /></div>
              <div className="sm:col-span-2"><Label>Address</Label><Input required /></div>
              <div><Label>City</Label><Input required /></div>
              <div><Label>Postal code</Label><Input required /></div>
              <div className="sm:col-span-2"><Label>Country</Label><Input required defaultValue="Bangladesh" /></div>
            </div>
          </section>

          {/* Shipping method */}
          <section className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-display text-lg font-semibold mb-4">3. Shipping Method</h2>
            <RadioGroup value={shipping} onValueChange={setShipping} className="space-y-2">
              {[
                { v: "standard", t: "Standard (3-5 days)", p: subtotal > 99 ? "Free" : "$9.00", icon: Truck },
                { v: "express", t: "Express (1-2 days)", p: "$19.00", icon: Truck },
              ].map((o) => (
                <label key={o.v} className="flex flex-wrap items-center gap-3 p-3 border border-border rounded-md cursor-pointer hover:border-gold sm:flex-nowrap">
                  <RadioGroupItem value={o.v} />
                  <o.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm flex-1">{o.t}</span>
                  <span className="font-semibold text-sm">{o.p}</span>
                </label>
              ))}
            </RadioGroup>
          </section>

          {/* Payment */}
          <section className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-display text-lg font-semibold mb-4">4. Payment Method</h2>
            <RadioGroup value={payment} onValueChange={setPayment} className="space-y-2 mb-4">
              {[
                { v: "card", t: "Credit / Debit Card", icon: CreditCard },
                { v: "cod", t: "Cash on Delivery", icon: Wallet },
                { v: "bkash", t: "bKash", icon: Wallet },
              ].map((o) => (
                <label key={o.v} className="flex items-center gap-3 p-3 border border-border rounded-md cursor-pointer hover:border-gold">
                  <RadioGroupItem value={o.v} />
                  <o.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm flex-1">{o.t}</span>
                </label>
              ))}
            </RadioGroup>
            {payment === "card" && (
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="sm:col-span-2"><Label>Card number</Label><Input placeholder="•••• •••• •••• ••••" /></div>
                <div><Label>Expiry</Label><Input placeholder="MM / YY" /></div>
                <div><Label>CVC</Label><Input placeholder="•••" /></div>
              </div>
            )}
          </section>
        </div>

        <aside className="bg-card border border-border rounded-xl p-6 h-fit sticky top-28">
          <h2 className="font-display text-lg font-semibold mb-4">Order summary</h2>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-2 mb-4">
            {items.map((it) => (
              <div key={it.id} className="flex min-w-0 gap-3 text-sm">
                <div className="relative shrink-0">
                  <img src={it.product.images[0]} className="w-14 h-14 rounded object-cover" />
                  <span className="absolute -top-1 -right-1 bg-foreground text-background text-[10px] rounded-full h-5 w-5 flex items-center justify-center">{it.qty}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{it.product.name}</p>
                  <p className="text-xs text-muted-foreground">{it.size} · {it.color}</p>
                </div>
                <p className="font-semibold">${(it.product.price * it.qty).toFixed(0)}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm pt-4 border-t border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{ship === 0 ? "Free" : `$${ship.toFixed(2)}`}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>${tax.toFixed(2)}</span></div>
          </div>
          <div className="border-t border-border my-4" />
          <div className="flex justify-between items-baseline">
            <span className="font-semibold">Total</span>
            <span className="font-display text-2xl font-bold">${total.toFixed(2)}</span>
          </div>
          <Button type="submit" size="lg" className="w-full mt-6">
            <Lock className="h-4 w-4 mr-2" /> Place order
          </Button>
          <p className="text-[11px] text-center text-muted-foreground mt-3">Your data is encrypted and secure.</p>
        </aside>
      </form>
    </div>
  );
}
