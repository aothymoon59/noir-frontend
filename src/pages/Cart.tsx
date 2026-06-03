import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, Tag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Cart() {
  const { items, update, remove, subtotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const shipping = subtotal > 99 || subtotal === 0 ? 0 : 9;
  const discount = applied ? subtotal * 0.1 : 0;
  const total = subtotal - discount + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
        <h1 className="font-display text-3xl md:text-4xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground mt-3">Discover pieces worth keeping.</p>
        <Button size="lg" asChild className="mt-6"><Link to="/category/men">Start shopping</Link></Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl md:text-5xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-3">
          {items.map((it) => (
            <div key={it.id} className="flex gap-4 p-4 border border-border rounded-xl">
              <img src={it.product.images[0]} alt={it.product.name} className="w-24 h-32 md:w-28 md:h-36 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{it.product.brand}</p>
                <Link to={`/product/${it.product.slug}`}>
                  <h3 className="font-display font-semibold mt-1 hover:text-gold">{it.product.name}</h3>
                </Link>
                <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                  {it.size && <span>Size: <span className="text-foreground">{it.size}</span></span>}
                  {it.color && <span>Color: <span className="text-foreground">{it.color}</span></span>}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-border rounded-md">
                    <button onClick={() => update(it.id, it.qty - 1)} className="h-9 w-9 flex items-center justify-center hover:bg-muted"><Minus className="h-3 w-3" /></button>
                    <span className="w-9 text-center text-sm font-semibold">{it.qty}</span>
                    <button onClick={() => update(it.id, it.qty + 1)} className="h-9 w-9 flex items-center justify-center hover:bg-muted"><Plus className="h-3 w-3" /></button>
                  </div>
                  <p className="font-display font-bold text-lg">${(it.product.price * it.qty).toFixed(0)}</p>
                </div>
              </div>
              <button onClick={() => remove(it.id)} className="text-muted-foreground hover:text-destructive self-start p-1">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <aside className="bg-card border border-border rounded-xl p-6 h-fit sticky top-28">
          <h2 className="font-display text-xl font-bold mb-4">Order summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            {applied && <div className="flex justify-between text-success"><span>Discount (WELCOME10)</span><span>-${discount.toFixed(2)}</span></div>}
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping}`}</span></div>
          </div>
          <div className="border-t border-border my-4" />
          <div className="flex justify-between items-baseline">
            <span className="font-semibold">Total</span>
            <span className="font-display text-2xl font-bold">${total.toFixed(2)}</span>
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Coupon code</p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="WELCOME10" className="pl-9" />
              </div>
              <Button variant="outline" onClick={() => setApplied(coupon.toUpperCase() === "WELCOME10")}>Apply</Button>
            </div>
            {applied && <p className="text-xs text-success mt-2">✓ Coupon applied</p>}
          </div>

          <Button size="lg" className="w-full mt-6" asChild>
            <Link to="/checkout">Checkout <ArrowRight className="h-4 w-4 ml-2" /></Link>
          </Button>
          <Link to="/category/men" className="block text-center text-xs text-muted-foreground hover:text-gold mt-3">Continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}
