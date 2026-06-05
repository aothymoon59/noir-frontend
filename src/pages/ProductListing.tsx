import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Grid3x3, List, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { products } from "@/lib/mock-data";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const BRANDS = ["Atelier 9", "Noir & Co", "Maison Lux", "Veluxe", "Studio Ren", "Ember"];
const COLORS = ["Black", "Ivory", "Gold", "Olive", "Navy", "Burgundy", "Sand"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const FABRICS = ["Cotton", "Linen", "Silk", "Wool", "Denim", "Polyester", "Cashmere"];

function FilterPanel({
  price, setPrice, brand, setBrand, color, setColor, size, setSize, fabric, setFabric, inStock, setInStock, discount, setDiscount,
}: any) {
  const toggle = (arr: string[], v: string, set: (a: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-3">Price</h4>
        <Slider value={price} onValueChange={setPrice} min={0} max={500} step={10} />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>${price[0]}</span><span>${price[1]}</span>
        </div>
      </div>
      <FilterGroup label="Brand">
        {BRANDS.map((b) => (
          <label key={b} className="flex items-center gap-2 cursor-pointer">
            <Checkbox checked={brand.includes(b)} onCheckedChange={() => toggle(brand, b, setBrand)} />
            <span className="text-sm">{b}</span>
          </label>
        ))}
      </FilterGroup>
      <FilterGroup label="Color">
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button key={c} onClick={() => toggle(color, c, setColor)}
              className={cn("text-xs px-3 py-1.5 rounded-full border", color.includes(c) ? "bg-gold text-gold-foreground border-gold" : "border-border")}>
              {c}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup label="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button key={s} onClick={() => toggle(size, s, setSize)}
              className={cn("h-9 w-12 rounded-md border text-sm", size.includes(s) ? "bg-foreground text-background border-foreground" : "border-border")}>
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup label="Fabric">
        {FABRICS.map((f) => (
          <label key={f} className="flex items-center gap-2 cursor-pointer">
            <Checkbox checked={fabric.includes(f)} onCheckedChange={() => toggle(fabric, f, setFabric)} />
            <span className="text-sm">{f}</span>
          </label>
        ))}
      </FilterGroup>
      <FilterGroup label="Availability">
        <label className="flex items-center gap-2"><Checkbox checked={inStock} onCheckedChange={(v) => setInStock(!!v)} /><span className="text-sm">In stock only</span></label>
        <label className="flex items-center gap-2"><Checkbox checked={discount} onCheckedChange={(v) => setDiscount(!!v)} /><span className="text-sm">On sale</span></label>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-3">{label}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export default function ProductListing() {
  const params = useParams();
  const [search] = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("featured");
  const [price, setPrice] = useState([0, 500]);
  const [brand, setBrand] = useState<string[]>([]);
  const [color, setColor] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [fabric, setFabric] = useState<string[]>([]);
  const [inStock, setInStock] = useState(false);
  const [discount, setDiscount] = useState(false);

  const q = search.get("q")?.toLowerCase();

  const filtered = useMemo(() => {
    let list = products.slice();
    if (params.category) list = list.filter((p) => p.category === params.category);
    if (params.sub) list = list.filter((p) => p.subcategory === params.sub);
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    list = list.filter((p) => p.price >= price[0] && p.price <= price[1]);
    if (brand.length) list = list.filter((p) => brand.includes(p.brand));
    if (color.length) list = list.filter((p) => p.colors.some((c) => color.includes(c.name)));
    if (size.length) list = list.filter((p) => p.sizes.some((s) => size.includes(s)));
    if (fabric.length) list = list.filter((p) => fabric.includes(p.fabric));
    if (inStock) list = list.filter((p) => p.inStock);
    if (discount) list = list.filter((p) => p.comparePrice);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [params, q, price, brand, color, size, fabric, inStock, discount, sort]);

  const filterProps = { price, setPrice, brand, setBrand, color, setColor, size, setSize, fabric, setFabric, inStock, setInStock, discount, setDiscount };

  const title = params.sub
    ? params.sub.replace(/-/g, " ")
    : params.category
    ? params.category
    : q
    ? `Results for "${q}"`
    : "All products";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">Shop</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold capitalize mt-1">{title}</h1>
        <p className="text-sm text-muted-foreground mt-2">{filtered.length} products</p>
      </div>

      <div className="grid min-w-0 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] gap-8">
        {/* Sidebar filters */}
        <aside className="hidden lg:block sticky top-28 self-start">
          <FilterPanel {...filterProps} />
        </aside>

        <div className="min-w-0">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-border">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[min(20rem,calc(100vw-2rem))] overflow-y-auto">
                <h3 className="font-display text-xl font-bold mb-6">Filters</h3>
                <FilterPanel {...filterProps} />
              </SheetContent>
            </Sheet>

            <div className="flex min-w-0 items-center gap-2 ml-auto">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-[min(160px,48vw)]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
              <div className="hidden md:flex border border-border rounded-md">
                <button onClick={() => setView("grid")} className={cn("p-2", view === "grid" && "bg-muted")}><Grid3x3 className="h-4 w-4" /></button>
                <button onClick={() => setView("list")} className={cn("p-2 border-l border-border", view === "list" && "bg-muted")}><List className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          {view === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((p) => <ProductCard key={p.id} p={p} view="list" />)}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No products match your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
