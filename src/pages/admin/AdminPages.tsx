import { useState } from "react";
import { Link } from "react-router-dom";
import { products, orders, megaMenu, blogPosts, featuredCategories, type MenuNode } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Search, Plus, MoreHorizontal, Edit, Trash2, Filter, Download,
  Image as ImageIcon, ChevronRight, GripVertical, Eye, Save, Link as LinkIcon,
  Menu as MenuIcon, Layers, Navigation, CircleDot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,
  DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

function PageHeader({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
      <div>
        <h1 className="font-display text-3xl font-bold">{title}</h1>
        {sub && <p className="text-sm text-muted-foreground mt-1">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

function Toolbar() {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <div className="relative min-w-48 flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search..." className="pl-9 h-9" />
      </div>
      <Button variant="outline" size="sm"><Filter className="h-3.5 w-3.5 mr-1.5" /> Filter</Button>
      <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5 mr-1.5" /> Export</Button>
    </div>
  );
}

export function AdminProducts() {
  return (
    <div>
      <PageHeader title="Products" sub={`${products.length} total products`}
        action={<Button asChild><Link to="/admin/products/new"><Plus className="h-3.5 w-3.5 mr-1.5" /> Add product</Link></Button>} />
      <Toolbar />
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50"><tr className="text-xs text-muted-foreground uppercase tracking-wider">
              <th className="text-left p-4"><input type="checkbox" /></th>
              <th className="text-left p-4">Product</th><th className="text-left p-4">Category</th>
              <th className="text-left p-4">Brand</th><th className="text-left p-4">Stock</th>
              <th className="text-left p-4">Price</th><th className="text-left p-4">Status</th>
              <th className="p-4"></th>
            </tr></thead>
            <tbody>
              {products.slice(0, 12).map((p) => (
                <tr key={p.id} className="border-t border-border hover:bg-muted/30">
                  <td className="p-4"><input type="checkbox" /></td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} className="h-10 w-10 rounded object-cover" />
                      <div><p className="font-medium">{p.name}</p><p className="text-xs text-muted-foreground">{p.id.toUpperCase()}</p></div>
                    </div>
                  </td>
                  <td className="p-4 capitalize">{p.category}</td>
                  <td className="p-4">{p.brand}</td>
                  <td className="p-4">{p.inStock ? "120" : "0"}</td>
                  <td className="p-4 font-semibold">${p.price}</td>
                  <td className="p-4"><span className={cn("text-xs px-2 py-0.5 rounded-full", p.inStock ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive")}>{p.inStock ? "Active" : "Sold out"}</span></td>
                  <td className="p-4 text-right">
                    <Button asChild variant="ghost" size="icon"><Link to={`/admin/products/${p.id}/edit`}><Edit className="h-3.5 w-3.5" /></Link></Button>
                    <Button variant="ghost" size="icon"><Trash2 className="h-3.5 w-3.5" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function AdminOrders() {
  return (
    <div>
      <PageHeader title="Orders" sub={`${orders.length} total orders`} />
      <Toolbar />
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50"><tr className="text-xs text-muted-foreground uppercase tracking-wider">
              <th className="text-left p-4">Order</th><th className="text-left p-4">Date</th>
              <th className="text-left p-4">Customer</th><th className="text-left p-4">Items</th>
              <th className="text-left p-4">Total</th><th className="text-left p-4">Status</th>
              <th className="p-4"></th>
            </tr></thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-border hover:bg-muted/30">
                  <td className="p-4 font-mono">{o.id}</td>
                  <td className="p-4 text-muted-foreground">{o.date}</td>
                  <td className="p-4"><p className="font-medium">{o.customer}</p><p className="text-xs text-muted-foreground">{o.email}</p></td>
                  <td className="p-4">{o.items.length}</td>
                  <td className="p-4 font-semibold">${o.total.toFixed(2)}</td>
                  <td className="p-4">
                    <Select defaultValue={o.status}>
                      <SelectTrigger className="h-8 w-32 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>{["Pending","Confirmed","Processing","Packed","Shipped","Delivered","Returned","Cancelled"].map(s=>
                        <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </td>
                  <td className="p-4 text-right"><Button variant="ghost" size="icon"><MoreHorizontal className="h-3.5 w-3.5" /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CategoryNode({ node, depth = 0 }: { node: any; depth?: number }) {
  return (
    <>
      <div className={cn("flex items-center justify-between py-2.5 px-3 hover:bg-muted/40 rounded-md")} style={{ paddingLeft: 12 + depth * 24 }}>
        <div className="flex items-center gap-2">
          {node.children && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
          <span className="text-sm font-medium">{node.label}</span>
          <span className="text-xs text-muted-foreground">{node.children?.length ?? 0} sub</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="h-3 w-3" /></Button>
          <Button variant="ghost" size="icon" className="h-7 w-7"><Trash2 className="h-3 w-3" /></Button>
        </div>
      </div>
      {node.children?.map((c: any) => <CategoryNode key={c.href} node={c} depth={depth + 1} />)}
    </>
  );
}

export function AdminCategories() {
  return (
    <div>
      <PageHeader title="Categories" sub="Manage nested categories with drag & drop"
        action={<Button asChild><Link to="/admin/categories/new"><Plus className="h-3.5 w-3.5 mr-1.5" /> Add category</Link></Button>} />
      <div className="bg-card border border-border rounded-xl p-3">
        {megaMenu.map((n) => <CategoryNode key={n.href} node={n} />)}
      </div>
    </div>
  );
}

export function AdminCustomers() {
  const customers = orders.slice(0, 10).map((o, i) => ({ ...o, orders: 3 + i, joined: o.date }));
  return (
    <div>
      <PageHeader title="Customers" sub="9,432 total customers" />
      <Toolbar />
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full text-sm">
          <thead className="bg-muted/50"><tr className="text-xs uppercase tracking-wider text-muted-foreground">
            <th className="text-left p-4">Customer</th><th className="text-left p-4">Email</th>
            <th className="text-left p-4">Orders</th><th className="text-left p-4">Joined</th>
          </tr></thead>
          <tbody>{customers.map((c, i) => (
            <tr key={i} className="border-t border-border hover:bg-muted/30">
              <td className="p-4"><div className="flex items-center gap-3"><div className="h-9 w-9 rounded-full bg-gold/20 flex items-center justify-center font-semibold text-xs">{c.customer.split(" ").map((x) => x[0]).join("")}</div><span className="font-medium">{c.customer}</span></div></td>
              <td className="p-4 text-muted-foreground">{c.email}</td>
              <td className="p-4">{c.orders}</td><td className="p-4 text-muted-foreground">{c.joined}</td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
    </div>
  );
}

export function AdminCoupons() {
  const coupons = [
    { code: "WELCOME10", desc: "10% off first order", uses: 240, expires: "Dec 31, 2025", active: true },
    { code: "GOLD20", desc: "20% off gold members", uses: 88, expires: "Jan 15, 2026", active: true },
    { code: "FLASH30", desc: "30% off flash sale", uses: 1240, expires: "Nov 30, 2025", active: false },
  ];
  return (
    <div>
      <PageHeader title="Coupons" action={<Button asChild><Link to="/admin/coupons/new"><Plus className="h-3.5 w-3.5 mr-1.5" /> Create coupon</Link></Button>} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((c) => (
          <div key={c.code} className="bg-card border border-border rounded-xl p-5 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gold/10" />
            <div className="flex items-center justify-between">
              <span className={cn("text-xs px-2 py-0.5 rounded-full", c.active ? "bg-success/20 text-success" : "bg-muted")}>{c.active ? "Active" : "Expired"}</span>
            </div>
            <p className="font-display text-2xl font-bold mt-3 tracking-wider">{c.code}</p>
            <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
            <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
              <span>{c.uses} uses</span><span>Exp {c.expires}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminBlogs() {
  return (
    <div>
      <PageHeader title="Blog posts" action={<Button asChild><Link to="/admin/blogs/new"><Plus className="h-3.5 w-3.5 mr-1.5" /> New post</Link></Button>} />
      <div className="grid md:grid-cols-2 gap-4">
        {blogPosts.map((b) => (
          <div key={b.id} className="flex gap-4 bg-card border border-border rounded-xl p-4">
            <img src={b.cover} className="w-32 h-24 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gold uppercase tracking-wider">{b.category}</p>
              <p className="font-display font-semibold mt-1 line-clamp-1">{b.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{b.date} · {b.author}</p>
              <div className="flex gap-1 mt-2"><Button size="sm" variant="ghost"><Edit className="h-3 w-3" /></Button><Button size="sm" variant="ghost"><Trash2 className="h-3 w-3" /></Button></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminPages() {
  const pages = ["About Us", "Contact", "Privacy Policy", "Return Policy", "FAQ", "Shipping Policy"];
  return (
    <div>
      <PageHeader title="Pages CMS" action={<Button asChild><Link to="/admin/pages/new"><Plus className="h-3.5 w-3.5 mr-1.5" /> New page</Link></Button>} />
      <div className="bg-card border border-border rounded-xl divide-y divide-border">
        {pages.map((p) => (
          <div key={p} className="flex items-center justify-between p-4 hover:bg-muted/30">
            <div><p className="font-medium">{p}</p><p className="text-xs text-muted-foreground">/{p.toLowerCase().replace(/\s+/g, "-")}</p></div>
            <div><Button asChild size="sm" variant="outline"><Link to="/admin/pages/1/edit"><Edit className="h-3 w-3 mr-1.5" /> Edit</Link></Button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminBrands() {
  const brands = ["Atelier 9", "Noir & Co", "Maison Lux", "Veluxe", "Studio Ren", "Ember"];
  return (
    <div>
      <PageHeader title="Brands" action={<Button asChild><Link to="/admin/brands/new"><Plus className="h-3.5 w-3.5 mr-1.5" /> Add brand</Link></Button>} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {brands.map((b) => (
          <div key={b} className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="h-16 w-16 rounded-full bg-gold/10 mx-auto flex items-center justify-center font-display font-bold text-gold text-xl">{b[0]}</div>
            <p className="font-display font-semibold mt-3">{b}</p>
            <p className="text-xs text-muted-foreground">24 products</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminMenus() {
  const [items, setItems] = useState<MenuNode[]>(megaMenu);
  const [selectedHref, setSelectedHref] = useState(megaMenu[0]?.href ?? "");
  const [draft, setDraft] = useState({ label: "", href: "", parent: "root" });

  const selected = findMenuNode(items, selectedHref) ?? items[0];
  const totalItems = countMenuItems(items);
  const maxDepth = getMenuDepth(items);

  const addMenuItem = () => {
    if (!draft.label.trim()) return;

    const href = draft.href.trim() || `/category/${draft.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    const nextItem: MenuNode = { label: draft.label.trim(), href };

    if (draft.parent === "root") {
      setItems([...items, nextItem]);
    } else {
      setItems(addChildMenuItem(items, draft.parent, nextItem));
    }

    setSelectedHref(href);
    setDraft({ label: "", href: "", parent: "root" });
  };

  return (
    <div>
      <PageHeader
        title="Menus"
        sub="Build unlimited nested storefront navigation with mock data"
        action={
          <Dialog>
            <DialogTrigger asChild>
              <Button><Plus className="h-3.5 w-3.5 mr-1.5" /> Add menu item</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add menu item</DialogTitle>
                <DialogDescription>Create a top-level item or nest it under any existing menu link.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Menu label</Label>
                  <Input value={draft.label} onChange={(e) => setDraft({ ...draft, label: e.target.value })} placeholder="Blazers" />
                </div>
                <div className="space-y-1.5">
                  <Label>URL</Label>
                  <Input value={draft.href} onChange={(e) => setDraft({ ...draft, href: e.target.value })} placeholder="/category/women/blazers" />
                </div>
                <div className="space-y-1.5">
                  <Label>Parent</Label>
                  <Select value={draft.parent} onValueChange={(parent) => setDraft({ ...draft, parent })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="root">Top level</SelectItem>
                      {flattenMenu(items).map((item) => (
                        <SelectItem key={item.href} value={item.href}>
                          {"- ".repeat(item.depth)}{item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={addMenuItem}><Save className="h-3.5 w-3.5 mr-1.5" /> Add item</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Menu items", value: totalItems, icon: MenuIcon },
          { label: "Top level", value: items.length, icon: Navigation },
          { label: "Nested depth", value: maxDepth, icon: Layers },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
              <Icon className="h-4 w-4 text-gold" />
            </div>
            <p className="mt-2 font-display text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="rounded-lg border border-border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
            <div>
              <h2 className="font-display text-lg font-semibold">Primary mega menu</h2>
              <p className="text-xs text-muted-foreground">Use the handle for future drag-and-drop ordering, then click an item to edit.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Eye className="h-3.5 w-3.5 mr-1.5" /> Preview</Button>
              <Button size="sm"><Save className="h-3.5 w-3.5 mr-1.5" /> Save mock</Button>
            </div>
          </div>
          <div className="p-3">
            {items.map((item) => (
              <MenuBuilderNode
                key={item.href}
                node={item}
                selectedHref={selectedHref}
                onSelect={setSelectedHref}
              />
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold">Item settings</h2>
                <p className="text-xs text-muted-foreground">Mock edit state for the selected menu item.</p>
              </div>
              <Badge variant="secondary">{selected?.children?.length ?? 0} child</Badge>
            </div>
            {selected ? (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Navigation label</Label>
                  <Input value={selected.label} readOnly />
                </div>
                <div className="space-y-1.5">
                  <Label>Link target</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input value={selected.href} readOnly className="pl-9" />
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-md bg-muted/40 p-3">
                  <div>
                    <p className="text-sm font-medium">Show in storefront</p>
                    <p className="text-xs text-muted-foreground">Visible in header mega menu</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-md bg-muted/40 p-3">
                  <div>
                    <p className="text-sm font-medium">Featured column</p>
                    <p className="text-xs text-muted-foreground">Highlight this branch in the menu panel</p>
                  </div>
                  <Switch defaultChecked={selected.featured} />
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Select a menu item to edit.</p>
            )}
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <h2 className="font-display text-lg font-semibold">How to add more menus</h2>
            <div className="mt-3 space-y-3 text-sm text-muted-foreground">
              <p>Click <span className="font-medium text-foreground">Add menu item</span>, enter label and URL, then choose a parent.</p>
              <p>For now this is mock local state. To permanently add defaults, update <span className="font-mono text-foreground">megaMenu</span> in <span className="font-mono text-foreground">src/lib/mock-data.ts</span>.</p>
              <p>Later with RTK Query, save this same tree shape from your Menus API.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function MenuBuilderNode({
  node,
  depth = 0,
  selectedHref,
  onSelect,
}: {
  node: MenuNode;
  depth?: number;
  selectedHref: string;
  onSelect: (href: string) => void;
}) {
  const active = selectedHref === node.href;

  return (
    <div className="min-w-0 space-y-1">
      <div
        className={cn(
          "flex w-full min-w-0 items-center gap-2 rounded-md border py-2 pr-2 transition-colors",
          active ? "border-gold bg-gold/10" : "border-transparent hover:border-border hover:bg-muted/40",
        )}
        style={{ paddingLeft: 12 + depth * 20 }}
      >
        <button
          type="button"
          onClick={() => onSelect(node.href)}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
          {node.children?.length ? (
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          ) : (
            <CircleDot className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          )}
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium">{node.label}</span>
            <span className="block truncate text-xs text-muted-foreground">{node.href}</span>
          </span>
        </button>
        <div className="flex shrink-0 items-center gap-1">
          <Badge variant="outline" className="min-w-8 justify-center">{node.children?.length ?? 0}</Badge>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Edit className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      {node.children?.map((child) => (
        <MenuBuilderNode key={child.href} node={child} depth={depth + 1} selectedHref={selectedHref} onSelect={onSelect} />
      ))}
    </div>
  );
}

function flattenMenu(nodes: MenuNode[], depth = 0): Array<MenuNode & { depth: number }> {
  return nodes.flatMap((node) => [
    { ...node, depth },
    ...flattenMenu(node.children ?? [], depth + 1),
  ]);
}

function findMenuNode(nodes: MenuNode[], href: string): MenuNode | undefined {
  for (const node of nodes) {
    if (node.href === href) return node;
    const child = findMenuNode(node.children ?? [], href);
    if (child) return child;
  }
  return undefined;
}

function addChildMenuItem(nodes: MenuNode[], parentHref: string, item: MenuNode): MenuNode[] {
  return nodes.map((node) => {
    if (node.href === parentHref) {
      return { ...node, children: [...(node.children ?? []), item] };
    }
    return { ...node, children: addChildMenuItem(node.children ?? [], parentHref, item) };
  });
}

function countMenuItems(nodes: MenuNode[]): number {
  return nodes.reduce((total, node) => total + 1 + countMenuItems(node.children ?? []), 0);
}

function getMenuDepth(nodes: MenuNode[], depth = 1): number {
  if (!nodes.length) return 0;
  return Math.max(...nodes.map((node) => getMenuDepth(node.children ?? [], depth + 1)), depth);
}

export function AdminMedia() {
  return (
    <div>
      <PageHeader title="Media Library" action={<Button><Plus className="h-3.5 w-3.5 mr-1.5" /> Upload</Button>} />
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {products.slice(0, 18).flatMap(p => p.images.slice(0, 2)).map((src, i) => (
          <div key={i} className="aspect-square rounded-lg overflow-hidden border border-border bg-muted">
            <img src={src} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminTheme() {
  return (
    <div className="max-w-3xl">
      <PageHeader title="Theme Settings" sub="Customize your storefront branding" />
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-display font-semibold mb-4">Brand</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label>Store name</Label><Input defaultValue="NOIR" /></div>
            <div><Label>Tagline</Label><Input defaultValue="Wear the moment." /></div>
            <div><Label>Logo</Label><div className="border border-dashed border-border rounded-md h-20 flex items-center justify-center text-xs text-muted-foreground"><ImageIcon className="h-4 w-4 mr-2" /> Upload logo</div></div>
            <div><Label>Favicon</Label><div className="border border-dashed border-border rounded-md h-20 flex items-center justify-center text-xs text-muted-foreground"><ImageIcon className="h-4 w-4 mr-2" /> Upload favicon</div></div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-display font-semibold mb-4">Colors</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[["Primary","#0d0d0d"],["Accent","#c9a84c"],["Background","#f8f8f6"]].map(([l,v]) => (
              <div key={l}><Label>{l}</Label><div className="flex gap-2"><div className="h-10 w-10 rounded border border-border" style={{background: v}} /><Input defaultValue={v} /></div></div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-display font-semibold mb-4">Typography</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label>Heading font</Label><Select defaultValue="outfit"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="outfit">Outfit</SelectItem><SelectItem value="playfair">Playfair Display</SelectItem><SelectItem value="cormorant">Cormorant</SelectItem></SelectContent></Select></div>
            <div><Label>Body font</Label><Select defaultValue="figtree"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="figtree">Figtree</SelectItem><SelectItem value="inter">Inter</SelectItem><SelectItem value="karla">Karla</SelectItem></SelectContent></Select></div>
          </div>
        </div>
        <Button size="lg">Save changes</Button>
      </div>
    </div>
  );
}

export function AdminSettings() {
  return (
    <div className="max-w-3xl">
      <PageHeader title="Settings" />
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div><Label>Store email</Label><Input defaultValue="hello@noir.com" /></div>
        <div><Label>Currency</Label><Select defaultValue="usd"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="usd">USD</SelectItem><SelectItem value="bdt">BDT</SelectItem><SelectItem value="eur">EUR</SelectItem></SelectContent></Select></div>
        <div><Label>Time zone</Label><Input defaultValue="GMT+6 Dhaka" /></div>
        <Button>Save</Button>
      </div>
    </div>
  );
}
