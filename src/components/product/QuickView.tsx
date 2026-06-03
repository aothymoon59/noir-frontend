import { useState } from "react";
import { Star, ShoppingBag, Heart } from "lucide-react";
import type { Product } from "@/lib/mock-data";
import { useCart, useWishlist } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function QuickView({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const [img, setImg] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]?.name);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="bg-muted">
            <img src={product.images[img]} alt={product.name} className="w-full h-full aspect-[4/5] object-cover" />
            <div className="flex gap-2 p-3">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setImg(i)}
                  className={cn(
                    "w-14 h-14 rounded-md overflow-hidden border-2",
                    i === img ? "border-gold" : "border-transparent"
                  )}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">{product.brand}</p>
            <h2 className="font-display text-2xl font-bold mt-1">{product.name}</h2>
            <div className="flex items-center gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cn("h-3.5 w-3.5", i < Math.round(product.rating) ? "fill-gold text-gold" : "text-muted")} />
              ))}
              <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
            </div>
            <div className="flex items-baseline gap-3 mt-4">
              <span className="font-display text-3xl font-bold">${product.price}</span>
              {product.comparePrice && <span className="text-base text-muted-foreground line-through">${product.comparePrice}</span>}
            </div>
            <p className="text-sm text-muted-foreground mt-4 flex-1">{product.description}</p>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-wider mb-2">Color: <span className="text-muted-foreground">{color}</span></p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setColor(c.name)}
                    className={cn(
                      "h-8 w-8 rounded-full border-2",
                      color === c.name ? "border-gold" : "border-border"
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs uppercase tracking-wider mb-2">Size</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "h-9 min-w-10 px-3 rounded-md border text-sm",
                      size === s ? "border-gold bg-gold text-gold-foreground" : "border-border hover:border-foreground"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button
                className="flex-1"
                onClick={() => {
                  add(product, { size, color });
                  onClose();
                }}
              >
                <ShoppingBag className="h-4 w-4 mr-2" /> Add to cart
              </Button>
              <Button variant="outline" size="icon" onClick={() => toggle(product)}>
                <Heart className={cn("h-4 w-4", has(product.id) && "fill-destructive text-destructive")} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
