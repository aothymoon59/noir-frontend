import { Link } from "react-router-dom";
import { useState } from "react";
import { Heart, Eye, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/lib/mock-data";
import { useCart, useWishlist } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { QuickView } from "./QuickView";

export function ProductCard({ p, view = "grid" }: { p: Product; view?: "grid" | "list" }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const [open, setOpen] = useState(false);
  const wished = has(p.id);
  const discount = p.comparePrice ? Math.round((1 - p.price / p.comparePrice) * 100) : 0;

  if (view === "list") {
    return (
      <div className="group flex min-w-0 gap-3 md:gap-6 p-3 md:p-4 border border-border rounded-xl hover:border-gold/40 transition-all">
        <Link to={`/product/${p.slug}`} className="shrink-0 w-24 sm:w-32 md:w-48 aspect-[4/5] overflow-hidden rounded-lg bg-muted">
          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </Link>
        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{p.brand}</p>
            <Link to={`/product/${p.slug}`}>
              <h3 className="font-display font-semibold text-base md:text-lg mt-1 line-clamp-1 hover:text-gold">{p.name}</h3>
            </Link>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-3 w-3 fill-gold text-gold" />
              <span className="text-xs text-muted-foreground">{p.rating.toFixed(1)} ({p.reviewCount})</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2 hidden md:block">{p.description}</p>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-2 mt-3">
            <div>
              <span className="font-display text-lg font-bold">${p.price}</span>
              {p.comparePrice && <span className="text-sm text-muted-foreground line-through ml-2">${p.comparePrice}</span>}
            </div>
            <Button size="sm" onClick={() => add(p, { size: p.sizes[0], color: p.colors[0]?.name })}>
              <ShoppingBag className="h-3.5 w-3.5 mr-1.5" /> Add
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="group relative">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
          <Link to={`/product/${p.slug}`}>
            <img
              src={p.images[0]}
              alt={p.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-500"
            />
            <img
              src={p.images[1] ?? p.images[0]}
              alt={p.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-500 scale-105"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {discount > 0 && (
              <span className="bg-destructive text-destructive-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                -{discount}%
              </span>
            )}
            {p.badge === "new" && (
              <span className="bg-gold text-gold-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">New</span>
            )}
            {p.badge === "best" && (
              <span className="bg-foreground text-background text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">Bestseller</span>
            )}
            {!p.inStock && (
              <span className="bg-background text-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border">Out of stock</span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={() => toggle(p)}
            className={cn(
              "absolute top-3 right-3 h-9 w-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center transition-all",
              wished ? "text-destructive" : "text-foreground hover:text-gold"
            )}
            aria-label="Toggle wishlist"
          >
            <Heart className={cn("h-4 w-4", wished && "fill-current")} />
          </button>

          {/* Hover actions */}
          <div className="absolute inset-x-3 bottom-3 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
            <Button size="sm" className="flex-1" onClick={() => add(p, { size: p.sizes[0], color: p.colors[0]?.name })}>
              <ShoppingBag className="h-3.5 w-3.5 mr-1.5" /> Add to cart
            </Button>
            <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
              <Eye className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{p.brand}</p>
          <Link to={`/product/${p.slug}`}>
            <h3 className="font-display font-medium text-sm line-clamp-1 hover:text-gold transition-colors">{p.name}</h3>
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-base">${p.price}</span>
              {p.comparePrice && <span className="text-xs text-muted-foreground line-through">${p.comparePrice}</span>}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-gold text-gold" />
              <span className="text-xs text-muted-foreground">{p.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex gap-1 pt-1">
            {p.colors.slice(0, 4).map((c) => (
              <span
                key={c.hex}
                className="h-3 w-3 rounded-full border border-border"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>

      <QuickView product={p} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
