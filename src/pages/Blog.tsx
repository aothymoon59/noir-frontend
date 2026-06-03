import { Link, useParams } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { blogPosts } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export function BlogList() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">Journal</p>
        <h1 className="font-display text-4xl md:text-6xl font-bold">Stories & Style</h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Inspiration, behind-the-scenes, and conversations with the people shaping fashion.</p>
      </div>

      {/* Featured */}
      <Link to={`/blog/${blogPosts[0].slug}`} className="group grid md:grid-cols-2 gap-8 bg-card border border-border rounded-2xl overflow-hidden mb-12">
        <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
          <img src={blogPosts[0].cover} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <p className="text-xs uppercase tracking-wider text-gold">{blogPosts[0].category} · Featured</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 group-hover:text-gold">{blogPosts[0].title}</h2>
          <p className="text-muted-foreground mt-4">{blogPosts[0].excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-6">
            <span className="flex items-center gap-1"><User className="h-3 w-3" /> {blogPosts[0].author}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {blogPosts[0].date}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {blogPosts[0].readTime}</span>
          </div>
        </div>
      </Link>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.slice(1).map((b) => (
          <Link key={b.id} to={`/blog/${b.slug}`} className="group">
            <div className="aspect-[4/3] overflow-hidden rounded-xl"><img src={b.cover} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
            <p className="text-xs uppercase tracking-wider text-gold mt-4">{b.category}</p>
            <h3 className="font-display text-xl font-semibold mt-1 group-hover:text-gold">{b.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{b.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function BlogDetail() {
  const { slug } = useParams();
  const post = blogPosts.find((b) => b.slug === slug) ?? blogPosts[0];
  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold mb-6">
        <ArrowLeft className="h-3 w-3" /> Back to journal
      </Link>
      <p className="text-xs uppercase tracking-wider text-gold">{post.category}</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">{post.title}</h1>
      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4 mb-8">
        <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
      </div>
      <img src={post.cover} alt="" className="w-full aspect-video object-cover rounded-2xl mb-8" />
      <div className="prose prose-lg max-w-none text-foreground/90">
        <p className="text-xl text-muted-foreground leading-relaxed">{post.excerpt}</p>
        <p className="mt-6">{post.content} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut ligula ut nisi pretium volutpat. Curabitur efficitur, mi at viverra sodales, sapien sapien tempor mauris, et faucibus erat tortor a magna.</p>
        <p className="mt-4">Donec sit amet sapien dignissim, dignissim arcu vitae, posuere ligula. Nam efficitur lectus a turpis luctus tincidunt. Suspendisse potenti.</p>
        <h2 className="font-display text-2xl font-bold mt-8">Key takeaways</h2>
        <ul className="mt-4 space-y-2">
          <li>Quality fabrics outlast trends every time.</li>
          <li>Investing in fit beats investing in label.</li>
          <li>A timeless capsule beats a crowded closet.</li>
        </ul>
      </div>
    </article>
  );
}
