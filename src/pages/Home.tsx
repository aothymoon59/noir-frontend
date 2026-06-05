import { Link } from "react-router-dom";
import { ArrowRight, Truck, RefreshCw, Shield, Sparkles, Star } from "lucide-react";
import { products, featuredCategories, testimonials, blogPosts } from "@/lib/mock-data";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const featured = products.slice(0, 8);
  const trending = products.slice(8, 16);
  const newArrivals = products.slice(4, 12);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-card">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center min-h-[80vh] py-12">
          <div className="space-y-6 z-10">
            <p className="text-xs uppercase tracking-[0.18em] sm:tracking-[0.3em] text-gold">Winter Collection 2025</p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
              Wear the<br />
              <span className="text-gradient-gold">Moment.</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-md">
              Tailored silhouettes, luxe fabrics, and obsessive craft. Discover pieces designed to outlast trends.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button size="lg" asChild>
                <Link to="/category/men">Shop Men <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/category/women">Shop Women</Link>
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {testimonials.map((t) => (
                  <img key={t.id} src={t.avatar} className="h-8 w-8 rounded-full border-2 border-background" alt="" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3 w-3 fill-gold text-gold" />)}
                </div>
                <p className="text-xs text-muted-foreground">12,500+ five-star reviews</p>
              </div>
            </div>
          </div>
          <div className="relative h-[60vh] lg:h-[80vh]">
            <div className="absolute right-0 top-0 w-3/4 h-2/3 rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&h=1200&fit=crop&q=80" alt="Hero" className="w-full h-full object-cover" />
            </div>
            <div className="absolute left-0 bottom-0 w-2/3 h-1/2 rounded-2xl overflow-hidden border-4 border-background shadow-luxe">
              <img src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=700&h=900&fit=crop&q=80" alt="Hero 2" className="w-full h-full object-cover" />
            </div>
            <div className="absolute right-3 bottom-3 sm:right-8 sm:bottom-8 bg-background/95 backdrop-blur-xl border border-border rounded-xl p-4 shadow-2xl max-w-[min(220px,calc(100%-1.5rem))]">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Trending now</p>
              <p className="font-display font-semibold mt-1">Cashmere Overcoat</p>
              <p className="text-gold font-bold">$429</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border bg-card/50">
        <div className="container mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { i: Truck, t: "Free shipping", s: "On orders over $99" },
            { i: RefreshCw, t: "30-day returns", s: "Hassle free" },
            { i: Shield, t: "Secure payment", s: "100% protected" },
            { i: Sparkles, t: "Premium fabrics", s: "Lab tested" },
          ].map(({ i: Icon, t, s }) => (
            <div key={t} className="flex items-center gap-3">
              <Icon className="h-6 w-6 text-gold shrink-0" />
              <div>
                <p className="text-sm font-semibold">{t}</p>
                <p className="text-xs text-muted-foreground">{s}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] sm:tracking-[0.3em] text-gold mb-2">Shop by category</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Explore the Edit</h2>
          </div>
          <Link to="/category/men" className="text-sm text-muted-foreground hover:text-gold hidden md:flex items-center gap-1">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {featuredCategories.map((c) => (
            <Link key={c.id} to={c.href} className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
              <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="font-display font-semibold text-base md:text-lg">{c.name}</p>
                <p className="text-xs opacity-80">{c.count} items</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] sm:tracking-[0.3em] text-gold mb-2">Curated for you</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Featured Pieces</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Promo banner */}
      <section className="container mx-auto px-4 py-12">
        <div className="relative overflow-hidden rounded-2xl bg-foreground text-background grid lg:grid-cols-2 min-h-[400px]">
          <div className="p-8 md:p-14 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.18em] sm:tracking-[0.3em] text-gold mb-4">Limited offer</p>
            <h3 className="font-display text-4xl md:text-6xl font-bold leading-tight">
              The Wedding<br /><span className="text-gold">Edit</span>
            </h3>
            <p className="mt-4 text-background/70 max-w-md">Sherwanis, gowns, and ceremonial pieces. Handcrafted for the moments that matter most.</p>
            <Button size="lg" variant="secondary" className="w-fit mt-6 bg-gold text-gold-foreground hover:bg-gold/90" asChild>
              <Link to="/category/wedding">Shop the Edit <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&h=800&fit=crop&q=80" alt="Wedding" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.18em] sm:tracking-[0.3em] text-gold mb-2">Right now</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">Trending</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {trending.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* New arrivals strip */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.18em] sm:tracking-[0.3em] text-gold mb-2">Fresh drops</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">New Arrivals</h2>
        </div>
        <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-4 snap-x">
          {newArrivals.map((p) => (
            <div key={p.id} className="snap-start shrink-0 w-[min(240px,82vw)] md:w-[280px]">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.18em] sm:tracking-[0.3em] text-gold mb-2">Loved by thousands</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">What customers say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-card border border-border rounded-xl p-6">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
              </div>
              <p className="text-foreground mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] sm:tracking-[0.3em] text-gold mb-2">From the journal</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Stories & Style</h2>
          </div>
          <Link to="/blog" className="text-sm hover:text-gold flex items-center gap-1">All articles <ArrowRight className="h-3 w-3" /></Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((b) => (
            <Link key={b.id} to={`/blog/${b.slug}`} className="group">
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <img src={b.cover} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <p className="text-xs uppercase tracking-wider text-gold mt-4">{b.category}</p>
              <h3 className="font-display text-xl font-semibold mt-1 group-hover:text-gold">{b.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{b.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-card border border-border rounded-2xl p-8 md:p-14 text-center">
          <Sparkles className="h-8 w-8 text-gold mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-5xl font-bold">Join the inner circle</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Get early access to drops, exclusive offers, and styling tips delivered to your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-8">
            <Input placeholder="your@email.com" className="h-12" />
            <Button size="lg" className="shrink-0">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
