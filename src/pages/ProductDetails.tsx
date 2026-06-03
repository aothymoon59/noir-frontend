import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Heart, ShoppingBag, Zap, MessageCircle, Truck, RefreshCw, Shield, ChevronRight, Minus, Plus } from "lucide-react";
import { getProduct, products } from "@/lib/mock-data";
import { useCart, useWishlist } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProductCard } from "@/components/product/ProductCard";

export default function ProductDetails() {
  const { slug } = useParams();
  const p = getProduct(slug ?? "");
  const [img, setImg] = useState(0);
  const [size, setSize] = useState(p.sizes[1] ?? p.sizes[0]);
  const [color, setColor] = useState(p.colors[0]?.name);
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  const fbt = products.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-6">
      <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-gold">Home</Link><ChevronRight className="h-3 w-3" />
        <Link to={`/category/${p.category}`} className="hover:text-gold capitalize">{p.category}</Link><ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{p.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
        {/* Gallery */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-2 w-16 md:w-20">
            {p.images.map((src, i) => (
              <button key={i} onClick={() => setImg(i)} className={cn("aspect-square rounded-md overflow-hidden border-2", i === img ? "border-gold" : "border-transparent")}>
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
            <div className="aspect-square rounded-md bg-foreground text-background flex flex-col items-center justify-center text-[10px] cursor-pointer hover:bg-gold hover:text-gold-foreground">
              <span className="text-lg">▶</span>VIDEO
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex-1 aspect-[4/5] rounded-xl overflow-hidden bg-muted cursor-zoom-in">
                <img src={p.images[img]} alt={p.name} className="w-full h-full object-cover" />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0">
              <img src={p.images[img]} alt={p.name} className="w-full" />
            </DialogContent>
          </Dialog>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs text-gold uppercase tracking-widest">{p.brand}</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-2">{p.name}</h1>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={cn("h-4 w-4", i < Math.round(p.rating) ? "fill-gold text-gold" : "text-muted")} />)}</div>
            <span className="text-sm text-muted-foreground">{p.rating.toFixed(1)} · {p.reviewCount} reviews</span>
            <span className={cn("text-xs px-2 py-0.5 rounded-full", p.inStock ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive")}>
              {p.inStock ? "In stock" : "Sold out"}
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-6">
            <span className="font-display text-4xl font-bold">${p.price}</span>
            {p.comparePrice && <>
              <span className="text-xl text-muted-foreground line-through">${p.comparePrice}</span>
              <span className="text-sm bg-destructive/10 text-destructive px-2 py-0.5 rounded font-semibold">
                Save ${p.comparePrice - p.price}
              </span>
            </>}
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Color: <span className="text-muted-foreground">{color}</span></p>
            </div>
            <div className="flex gap-2">
              {p.colors.map((c) => (
                <button key={c.hex} onClick={() => setColor(c.name)}
                  className={cn("h-10 w-10 rounded-full border-2 ring-offset-2 ring-offset-background", color === c.name ? "border-gold ring-2 ring-gold" : "border-border")}
                  style={{ backgroundColor: c.hex }} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Size</p>
              <Dialog>
                <DialogTrigger className="text-xs text-gold underline">Size guide</DialogTrigger>
                <DialogContent>
                  <h3 className="font-display text-xl font-bold mb-3">Size Guide</h3>
                  <table className="w-full text-sm">
                    <thead><tr className="border-b"><th className="text-left p-2">Size</th><th>Chest</th><th>Waist</th><th>Length</th></tr></thead>
                    <tbody>
                      {[["XS",36,30,26],["S",38,32,27],["M",40,34,28],["L",42,36,29],["XL",44,38,30],["XXL",46,40,31]].map(([s,c,w,l]) => (
                        <tr key={s} className="border-b"><td className="p-2 font-semibold">{s}</td><td className="text-center">{c}"</td><td className="text-center">{w}"</td><td className="text-center">{l}"</td></tr>
                      ))}
                    </tbody>
                  </table>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex gap-2 flex-wrap">
              {p.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)}
                  className={cn("h-11 min-w-12 px-4 rounded-md border text-sm font-medium", size === s ? "border-gold bg-gold text-gold-foreground" : "border-border hover:border-foreground")}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center border border-border rounded-md">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-11 w-11 flex items-center justify-center hover:bg-muted"><Minus className="h-3 w-3" /></button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="h-11 w-11 flex items-center justify-center hover:bg-muted"><Plus className="h-3 w-3" /></button>
            </div>
            <Button size="lg" className="flex-1" onClick={() => add(p, { qty, size, color })}>
              <ShoppingBag className="h-4 w-4 mr-2" /> Add to cart
            </Button>
            <Button size="lg" variant="outline" onClick={() => toggle(p)}>
              <Heart className={cn("h-4 w-4", has(p.id) && "fill-destructive text-destructive")} />
            </Button>
          </div>
          <div className="flex gap-3 mt-3">
            <Button size="lg" variant="secondary" className="flex-1 bg-foreground text-background hover:bg-foreground/90">
              <Zap className="h-4 w-4 mr-2" /> Buy now
            </Button>
            <Button size="lg" variant="outline" className="flex-1 text-success border-success hover:bg-success/10">
              <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp order
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-border">
            {[{i:Truck,t:"Free shipping",s:"$99+"},{i:RefreshCw,t:"Easy returns",s:"30 days"},{i:Shield,t:"Authenticity",s:"Guaranteed"}].map(({i:Icon,t,s})=>(
              <div key={t} className="text-center">
                <Icon className="h-5 w-5 text-gold mx-auto mb-1.5" />
                <p className="text-xs font-semibold">{t}</p><p className="text-[11px] text-muted-foreground">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="desc" className="mt-16">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          {[["desc","Description"],["spec","Specifications"],["size","Size Chart"],["ship","Shipping"],["return","Returns"]].map(([v,l]) => (
            <TabsTrigger key={v} value={v} className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent px-5 py-3 font-display uppercase text-xs tracking-wider">
              {l}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="desc" className="py-8 prose prose-invert max-w-3xl">
          <p className="text-muted-foreground leading-relaxed">{p.description}</p>
          <ul className="mt-4 space-y-2">
            {p.features.map((f) => <li key={f} className="flex gap-2"><span className="text-gold">✦</span>{f}</li>)}
          </ul>
        </TabsContent>
        <TabsContent value="spec" className="py-8">
          <dl className="grid sm:grid-cols-2 gap-y-2 max-w-2xl text-sm">
            {[["Brand", p.brand],["Fabric", p.fabric],["Category", p.category],["SKU", p.id.toUpperCase()],["Country", "Bangladesh"],["Care", "Machine wash cold"]].map(([k,v]) => (
              <div key={k} className="contents"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>
            ))}
          </dl>
        </TabsContent>
        <TabsContent value="size" className="py-8">Refer to the size guide modal on the product info.</TabsContent>
        <TabsContent value="ship" className="py-8 text-muted-foreground max-w-2xl">Free standard shipping on orders over $99. Express delivery available at checkout. Most orders ship within 1–2 business days.</TabsContent>
        <TabsContent value="return" className="py-8 text-muted-foreground max-w-2xl">30-day hassle-free returns. Items must be unworn and in original condition with tags attached.</TabsContent>
      </Tabs>

      {/* Frequently bought together */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold mb-6">Frequently bought together</h2>
        <div className="flex flex-wrap items-center gap-4 bg-card border border-border rounded-xl p-6">
          {fbt.map((x, i) => (
            <div key={x.id} className="flex items-center gap-3">
              <img src={x.images[0]} alt="" className="h-24 w-24 rounded-lg object-cover" />
              {i < fbt.length - 1 && <Plus className="h-4 w-4 text-muted-foreground" />}
            </div>
          ))}
          <div className="ml-auto text-right">
            <p className="text-xs text-muted-foreground">Bundle price</p>
            <p className="font-display text-2xl font-bold">${fbt.reduce((s,x)=>s+x.price,0)}</p>
            <Button className="mt-2">Add all to cart</Button>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="mt-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">You may also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {related.map((r) => <ProductCard key={r.id} p={r} />)}
        </div>
      </section>
    </div>
  );
}
