import { useState, type ReactNode } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft, Save, Trash2, Plus, X, Upload,
  Tag, Calendar, Percent, Package, Truck, MapPin, Mail, Phone,
} from "lucide-react";
import { toast } from "sonner";
import { products, orders } from "@/lib/mock-data";

/* ---------- shared bits ---------- */

function FormHeader({ title, sub, onSave, onDelete, backTo }: {
  title: string; sub?: string; onSave?: () => void; onDelete?: () => void; backTo: string;
}) {
  return (
    <div className="sticky top-16 z-10 -mx-3 mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background/90 px-3 py-3 backdrop-blur-xl sm:static sm:mx-0 sm:mb-6 sm:border-0 sm:bg-transparent sm:p-0">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon"><Link to={backTo}><ArrowLeft className="h-4 w-4" /></Link></Button>
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">{title}</h1>
          {sub && <p className="text-sm text-muted-foreground mt-0.5">{sub}</p>}
        </div>
      </div>
      <div className="flex w-full gap-2 sm:w-auto">
        {onDelete && <Button variant="outline" onClick={onDelete}><Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete</Button>}
        <Button onClick={onSave} className="flex-1 sm:flex-none"><Save className="h-3.5 w-3.5 mr-1.5" /> Save</Button>
      </div>
    </div>
  );
}

function Card({ title, children, sub }: { title: string; sub?: string; children: ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="mb-4">
        <h2 className="font-display font-semibold text-lg">{title}</h2>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-wider font-semibold">{label}</Label>
      {children}
      {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

function ChipInput({ values, setValues, placeholder }: {
  values: string[]; setValues: (v: string[]) => void; placeholder?: string;
}) {
  const [draft, setDraft] = useState("");
  const add = () => { const v = draft.trim(); if (v && !values.includes(v)) setValues([...values, v]); setDraft(""); };
  return (
    <div className="flex flex-wrap items-center gap-2 p-2 rounded-md border border-input bg-background min-h-10">
      {values.map((v) => (
        <Badge key={v} variant="secondary" className="gap-1">
          {v}
          <button onClick={() => setValues(values.filter((x) => x !== v))}><X className="h-3 w-3" /></button>
        </Badge>
      ))}
      <input
        value={draft} onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(); } }}
        onBlur={add} placeholder={placeholder}
        className="flex-1 min-w-32 bg-transparent text-sm outline-none px-1"
      />
    </div>
  );
}

function ImageDropzone({ multiple = false }: { multiple?: boolean }) {
  return (
    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-gold/50 transition-colors cursor-pointer">
      <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
      <p className="text-sm font-medium">Drop {multiple ? "images" : "image"} or click to upload</p>
      <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP up to 5MB</p>
    </div>
  );
}

/* ============================================================
   PRODUCT FORM
============================================================ */
export function ProductForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const editing = !!id;
  const existing = editing ? products.find((p) => p.id === id) : undefined;

  const [sizes, setSizes] = useState<string[]>(existing?.sizes ?? ["S", "M", "L", "XL"]);
  const [colors, setColors] = useState<string[]>(existing?.colors?.map((c) => c.name) ?? ["Black", "White"]);
  const [tags, setTags] = useState<string[]>(["new", "trending"]);
  const [variants, setVariants] = useState([
    { sku: "SKU-001", size: "M", color: "Black", price: existing?.price ?? 89, stock: 24 },
  ]);

  const save = () => { toast.success(editing ? "Product updated" : "Product created"); nav("/admin/products"); };
  const del = () => { toast.success("Product deleted"); nav("/admin/products"); };

  return (
    <div>
      <FormHeader title={editing ? "Edit product" : "New product"}
        sub={editing ? existing?.name : "Add a new product to your catalog"}
        backTo="/admin/products" onSave={save} onDelete={editing ? del : undefined} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="General">
            <Field label="Product name"><Input defaultValue={existing?.name} placeholder="Oversized cotton tee" /></Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Slug" hint="Used in URL"><Input defaultValue={existing?.slug} placeholder="oversized-cotton-tee" /></Field>
              <Field label="SKU"><Input placeholder="NOIR-TEE-001" /></Field>
            </div>
            <Field label="Short description"><Input placeholder="One-line summary shown on cards" /></Field>
            <Field label="Full description">
              <Textarea rows={6} defaultValue={existing?.description} placeholder="Tell the story of this piece..." />
            </Field>
          </Card>

          <Card title="Media" sub="First image is the cover">
            <ImageDropzone multiple />
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {(existing?.images ?? []).map((src, i) => (
                <div key={i} className="relative aspect-square rounded-md overflow-hidden border border-border group">
                  <img src={src} className="w-full h-full object-cover" />
                  {i === 0 && <span className="absolute top-1 left-1 text-[10px] bg-gold text-gold-foreground px-1.5 py-0.5 rounded">Cover</span>}
                  <button className="absolute top-1 right-1 h-5 w-5 rounded-full bg-background/80 opacity-0 group-hover:opacity-100 transition">
                    <X className="h-3 w-3 mx-auto" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Pricing">
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Price"><Input type="number" defaultValue={existing?.price} placeholder="0.00" /></Field>
              <Field label="Compare at" hint="Strike-through"><Input type="number" defaultValue={existing?.comparePrice} placeholder="0.00" /></Field>
              <Field label="Cost per item"><Input type="number" placeholder="0.00" /></Field>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md bg-muted/40">
              <div><p className="text-sm font-medium">Charge tax on this product</p><p className="text-xs text-muted-foreground">VAT / GST is auto-calculated</p></div>
              <Switch defaultChecked />
            </div>
          </Card>

          <Card title="Variants" sub="Combine size + color + price + stock">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Sizes"><ChipInput values={sizes} setValues={setSizes} placeholder="Add size" /></Field>
              <Field label="Colors"><ChipInput values={colors} setValues={setColors} placeholder="Add color" /></Field>
            </div>
            <Separator />
            <div className="space-y-2">
              {variants.map((v, i) => (
                <div key={i} className="grid gap-2 rounded-lg border border-border p-3 sm:grid-cols-2 xl:grid-cols-12 xl:items-end">
                  <div className="xl:col-span-3"><Field label="SKU"><Input defaultValue={v.sku} /></Field></div>
                  <div className="xl:col-span-2"><Field label="Size"><Input defaultValue={v.size} /></Field></div>
                  <div className="xl:col-span-2"><Field label="Color"><Input defaultValue={v.color} /></Field></div>
                  <div className="xl:col-span-2"><Field label="Price"><Input type="number" defaultValue={v.price} /></Field></div>
                  <div className="xl:col-span-2"><Field label="Stock"><Input type="number" defaultValue={v.stock} /></Field></div>
                  <Button variant="ghost" size="icon" className="justify-self-end xl:justify-self-auto" onClick={() => setVariants(variants.filter((_, j) => j !== i))}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setVariants([...variants, { sku: "", size: "", color: "", price: 0, stock: 0 }])}>
                <Plus className="h-3.5 w-3.5 mr-1.5" /> Add variant
              </Button>
            </div>
          </Card>

          <Card title="SEO">
            <Field label="Meta title"><Input placeholder="Best oversized tee — Noir" /></Field>
            <Field label="Meta description"><Textarea rows={3} placeholder="Up to 160 characters" /></Field>
            <Field label="Keywords"><ChipInput values={tags} setValues={setTags} placeholder="Add keyword" /></Field>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Status">
            <Field label="Status">
              <Select defaultValue="active">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <div className="flex items-center justify-between p-3 rounded-md bg-muted/40">
              <p className="text-sm font-medium">Featured</p><Switch />
            </div>
            <div className="flex items-center justify-between p-3 rounded-md bg-muted/40">
              <p className="text-sm font-medium">New arrival</p><Switch defaultChecked />
            </div>
          </Card>

          <Card title="Organization">
            <Field label="Category">
              <Select defaultValue={existing?.category}>
                <SelectTrigger><SelectValue placeholder="Pick category" /></SelectTrigger>
                <SelectContent>
                  {["men", "women", "kids", "accessories"].map(c =>
                    <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Brand">
              <Select defaultValue={existing?.brand}>
                <SelectTrigger><SelectValue placeholder="Pick brand" /></SelectTrigger>
                <SelectContent>
                  {["Atelier 9", "Noir & Co", "Maison Lux", "Veluxe"].map(b =>
                    <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Collections"><ChipInput values={["Summer 25"]} setValues={() => {}} placeholder="Add collection" /></Field>
          </Card>

          <Card title="Attributes">
            <Field label="Fabric">
              <Select defaultValue={existing?.fabric ?? "Cotton"}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Cotton", "Linen", "Silk", "Wool", "Denim", "Polyester", "Cashmere"].map((f) => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Fit"><Input placeholder="Regular, relaxed, slim" /></Field>
            <Field label="Care"><Input placeholder="Machine wash cold" /></Field>
          </Card>

          <Card title="Inventory">
            <Field label="Total stock"><Input type="number" defaultValue={120} /></Field>
            <Field label="Low stock alert"><Input type="number" defaultValue={5} /></Field>
            <div className="flex items-center justify-between p-3 rounded-md bg-muted/40">
              <p className="text-sm font-medium">Track inventory</p><Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 rounded-md bg-muted/40">
              <p className="text-sm font-medium">Continue selling when sold out</p><Switch />
            </div>
          </Card>

          <Card title="Shipping">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Weight (kg)"><Input type="number" defaultValue={0.3} /></Field>
              <Field label="Origin"><Input defaultValue="BD" /></Field>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Field label="L"><Input type="number" placeholder="cm" /></Field>
              <Field label="W"><Input type="number" placeholder="cm" /></Field>
              <Field label="H"><Input type="number" placeholder="cm" /></Field>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   CATEGORY FORM
============================================================ */
export function CategoryForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const editing = !!id;
  return (
    <div>
      <FormHeader title={editing ? "Edit category" : "New category"} backTo="/admin/categories"
        onSave={() => { toast.success("Category saved"); nav("/admin/categories"); }}
        onDelete={editing ? () => { toast.success("Deleted"); nav("/admin/categories"); } : undefined} />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Details">
            <Field label="Name"><Input placeholder="T-shirts" /></Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Slug"><Input placeholder="t-shirts" /></Field>
              <Field label="Parent category">
                <Select>
                  <SelectTrigger><SelectValue placeholder="None (top-level)" /></SelectTrigger>
                  <SelectContent>{["Men", "Women", "Kids", "Accessories"].map(c => <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </Field>
            </div>
            <Field label="Description"><Textarea rows={4} /></Field>
            <Field label="Sort order" hint="Lower numbers appear first"><Input type="number" defaultValue={0} /></Field>
          </Card>
          <Card title="SEO">
            <Field label="Meta title"><Input /></Field>
            <Field label="Meta description"><Textarea rows={3} /></Field>
          </Card>
        </div>
        <div className="space-y-6">
          <Card title="Visibility">
            <div className="flex items-center justify-between p-3 rounded-md bg-muted/40">
              <p className="text-sm font-medium">Show in mega menu</p><Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 rounded-md bg-muted/40">
              <p className="text-sm font-medium">Featured</p><Switch />
            </div>
          </Card>
          <Card title="Banner image"><ImageDropzone /></Card>
          <Card title="Icon"><ImageDropzone /></Card>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   BRAND FORM
============================================================ */
export function BrandForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const editing = !!id;
  return (
    <div>
      <FormHeader title={editing ? "Edit brand" : "New brand"} backTo="/admin/brands"
        onSave={() => { toast.success("Brand saved"); nav("/admin/brands"); }}
        onDelete={editing ? () => { toast.success("Deleted"); nav("/admin/brands"); } : undefined} />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Brand details">
            <Field label="Brand name"><Input placeholder="Atelier 9" /></Field>
            <Field label="Slug"><Input placeholder="atelier-9" /></Field>
            <Field label="Tagline"><Input placeholder="Crafted in Paris" /></Field>
            <Field label="Story"><Textarea rows={5} placeholder="Tell the brand's story..." /></Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Website"><Input placeholder="https://" /></Field>
              <Field label="Country of origin"><Input placeholder="France" /></Field>
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card title="Logo"><ImageDropzone /></Card>
          <Card title="Cover banner"><ImageDropzone /></Card>
          <Card title="Status">
            <div className="flex items-center justify-between p-3 rounded-md bg-muted/40">
              <p className="text-sm font-medium">Featured on homepage</p><Switch />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   COUPON FORM
============================================================ */
export function CouponForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const editing = !!id;
  const [type, setType] = useState("percentage");
  return (
    <div>
      <FormHeader title={editing ? "Edit coupon" : "New coupon"} backTo="/admin/coupons"
        onSave={() => { toast.success("Coupon saved"); nav("/admin/coupons"); }}
        onDelete={editing ? () => { toast.success("Deleted"); nav("/admin/coupons"); } : undefined} />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Coupon">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Code" hint="Customers will enter this at checkout">
                <Input placeholder="WELCOME10" className="uppercase font-mono" />
              </Field>
              <Field label="Description"><Input placeholder="10% off first order" /></Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Discount type">
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed amount</SelectItem>
                    <SelectItem value="free-shipping">Free shipping</SelectItem>
                    <SelectItem value="bxgy">Buy X get Y</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label={type === "percentage" ? "Discount %" : "Discount amount"}>
                <div className="relative">
                  <Input type="number" placeholder="10" />
                  {type === "percentage" ? <Percent className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" /> : <Tag className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />}
                </div>
              </Field>
            </div>
          </Card>
          <Card title="Conditions">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Min purchase amount"><Input type="number" placeholder="0" /></Field>
              <Field label="Max discount cap"><Input type="number" placeholder="No limit" /></Field>
            </div>
            <Field label="Applies to">
              <Select defaultValue="all">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All products</SelectItem>
                  <SelectItem value="categories">Specific categories</SelectItem>
                  <SelectItem value="products">Specific products</SelectItem>
                  <SelectItem value="brands">Specific brands</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Customer eligibility">
              <Select defaultValue="all">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Everyone</SelectItem>
                  <SelectItem value="new">First-time buyers</SelectItem>
                  <SelectItem value="vip">VIP / Gold members</SelectItem>
                  <SelectItem value="specific">Specific customers</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </Card>
        </div>
        <div className="space-y-6">
          <Card title="Validity">
            <Field label="Starts at">
              <div className="relative"><Input type="datetime-local" /><Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" /></div>
            </Field>
            <Field label="Expires at">
              <div className="relative"><Input type="datetime-local" /><Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" /></div>
            </Field>
          </Card>
          <Card title="Usage limits">
            <Field label="Total uses"><Input type="number" placeholder="Unlimited" /></Field>
            <Field label="Per customer"><Input type="number" defaultValue={1} /></Field>
            <div className="flex items-center justify-between p-3 rounded-md bg-muted/40">
              <p className="text-sm font-medium">Active</p><Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 rounded-md bg-muted/40">
              <p className="text-sm font-medium">Combine with other offers</p><Switch />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   BLOG FORM
============================================================ */
export function BlogForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const editing = !!id;
  const [tags, setTags] = useState<string[]>(["fashion", "trends"]);
  return (
    <div>
      <FormHeader title={editing ? "Edit post" : "New post"} backTo="/admin/blogs"
        onSave={() => { toast.success("Post saved"); nav("/admin/blogs"); }}
        onDelete={editing ? () => { toast.success("Deleted"); nav("/admin/blogs"); } : undefined} />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Article">
            <Field label="Title"><Input placeholder="Five trends defining the season" /></Field>
            <Field label="Slug"><Input placeholder="five-trends-defining-the-season" /></Field>
            <Field label="Excerpt"><Textarea rows={3} placeholder="Short summary shown in listing" /></Field>
            <Field label="Content" hint="Markdown supported"><Textarea rows={14} placeholder="Write your story..." /></Field>
          </Card>
          <Card title="SEO">
            <Field label="Meta title"><Input /></Field>
            <Field label="Meta description"><Textarea rows={3} /></Field>
          </Card>
        </div>
        <div className="space-y-6">
          <Card title="Publish">
            <Field label="Status">
              <Select defaultValue="draft">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Publish date"><Input type="datetime-local" /></Field>
            <Field label="Author"><Input defaultValue="Editorial Team" /></Field>
          </Card>
          <Card title="Cover image"><ImageDropzone /></Card>
          <Card title="Taxonomy">
            <Field label="Category">
              <Select defaultValue="trends">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Trends", "Style guide", "Behind the seams", "Sustainability"].map(c =>
                    <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Tags"><ChipInput values={tags} setValues={setTags} placeholder="Add tag" /></Field>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE FORM
============================================================ */
export function PageForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const editing = !!id;
  return (
    <div>
      <FormHeader title={editing ? "Edit page" : "New page"} backTo="/admin/pages"
        onSave={() => { toast.success("Page saved"); nav("/admin/pages"); }}
        onDelete={editing ? () => { toast.success("Deleted"); nav("/admin/pages"); } : undefined} />
      <Tabs defaultValue="content">
        <TabsList><TabsTrigger value="content">Content</TabsTrigger><TabsTrigger value="seo">SEO</TabsTrigger><TabsTrigger value="settings">Settings</TabsTrigger></TabsList>
        <TabsContent value="content" className="pt-4 space-y-6">
          <Card title="Page">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Title"><Input placeholder="About us" /></Field>
              <Field label="Slug"><Input placeholder="about" /></Field>
            </div>
            <Field label="Body" hint="HTML / rich text"><Textarea rows={18} /></Field>
          </Card>
        </TabsContent>
        <TabsContent value="seo" className="pt-4 space-y-6">
          <Card title="SEO">
            <Field label="Meta title"><Input /></Field>
            <Field label="Meta description"><Textarea rows={3} /></Field>
            <Field label="Social share image"><ImageDropzone /></Field>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="pt-4 space-y-6">
          <Card title="Settings">
            <Field label="Template">
              <Select defaultValue="default"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="fullwidth">Full-width</SelectItem>
                  <SelectItem value="landing">Landing</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <div className="flex items-center justify-between p-3 rounded-md bg-muted/40">
              <p className="text-sm font-medium">Show in footer</p><Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 rounded-md bg-muted/40">
              <p className="text-sm font-medium">Published</p><Switch defaultChecked />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ============================================================
   CUSTOMER VIEW
============================================================ */
export function CustomerView() {
  const nav = useNavigate();
  const c = orders[0];
  return (
    <div>
      <FormHeader title={c.customer} sub={c.email} backTo="/admin/customers"
        onSave={() => toast.success("Saved")} />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Profile">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name"><Input defaultValue={c.customer} /></Field>
              <Field label="Email"><Input defaultValue={c.email} /></Field>
              <Field label="Phone"><Input placeholder="+1 555 0123" /></Field>
              <Field label="Date of birth"><Input type="date" /></Field>
            </div>
            <Field label="Notes"><Textarea rows={3} /></Field>
          </Card>
          <Card title="Recent orders">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs uppercase text-muted-foreground"><tr>
                  <th className="text-left py-2">Order</th><th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Total</th><th className="text-left py-2">Status</th>
                </tr></thead>
                <tbody>{orders.slice(0, 5).map(o => (
                  <tr key={o.id} className="border-t border-border">
                    <td className="py-3 font-mono">{o.id}</td><td>{o.date}</td>
                    <td>${o.total.toFixed(2)}</td><td><Badge variant="secondary">{o.status}</Badge></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card title="Lifetime value">
            <div className="grid grid-cols-2 gap-3">
              <div><p className="text-xs text-muted-foreground">Orders</p><p className="font-display text-2xl font-bold">12</p></div>
              <div><p className="text-xs text-muted-foreground">Spent</p><p className="font-display text-2xl font-bold">$1,420</p></div>
            </div>
          </Card>
          <Card title="Tags">
            <ChipInput values={["VIP", "Newsletter"]} setValues={() => {}} placeholder="Add tag" />
          </Card>
          <Card title="Default address">
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> 12 Rue de Rivoli, Paris</p>
              <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> +33 1 23 45 67 89</p>
              <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> {c.email}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ORDER DETAIL
============================================================ */
export function OrderDetail() {
  const o = orders[0];
  return (
    <div>
      <FormHeader title={`Order ${o.id}`} sub={`Placed ${o.date}`} backTo="/admin/orders"
        onSave={() => toast.success("Order updated")} />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Items">
            <div className="space-y-3">
              {o.items.map((it, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-md bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded bg-muted flex items-center justify-center"><Package className="h-4 w-4 text-muted-foreground" /></div>
                    <div><p className="font-medium text-sm">{it.name}</p><p className="text-xs text-muted-foreground">Qty {it.qty}</p></div>
                  </div>
                  <p className="font-semibold">${(it.price * it.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <Separator />
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${o.total.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>$0.00</span></div>
              <div className="flex justify-between font-display font-bold text-lg pt-2 border-t border-border"><span>Total</span><span>${o.total.toFixed(2)}</span></div>
            </div>
          </Card>
          <Card title="Timeline">
            <div className="space-y-3 text-sm">
              {["Order placed", "Payment confirmed", "Packed", "Shipped"].map((s, i) => (
                <div key={s} className="flex gap-3"><div className="h-2 w-2 rounded-full bg-gold mt-1.5" /><div><p className="font-medium">{s}</p><p className="text-xs text-muted-foreground">2 hours ago</p></div></div>
              ))}
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card title="Status">
            <Select defaultValue={o.status}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Pending", "Confirmed", "Processing", "Packed", "Shipped", "Delivered", "Returned", "Cancelled"].map(s =>
                  <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Field label="Tracking number"><Input placeholder="DHL1234567" /></Field>
            <Field label="Carrier">
              <Select><SelectTrigger><SelectValue placeholder="Select carrier" /></SelectTrigger>
                <SelectContent>{["DHL", "FedEx", "UPS", "Aramex"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
          </Card>
          <Card title="Customer">
            <p className="font-medium">{o.customer}</p>
            <p className="text-xs text-muted-foreground">{o.email}</p>
          </Card>
          <Card title="Shipping address">
            <div className="text-sm text-muted-foreground flex gap-2">
              <Truck className="h-4 w-4 mt-0.5 shrink-0" />
              <span>12 Rue de Rivoli<br />75001 Paris, France</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
