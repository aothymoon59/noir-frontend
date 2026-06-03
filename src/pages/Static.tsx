import { Award, Users, Heart, Sparkles, Mail, Phone, MapPin, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function About() {
  return (
    <div>
      <section className="relative h-[60vh] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1485518882345-15568b007407?w=1800&h=900&fit=crop&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="relative container mx-auto px-4 h-full flex items-end pb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">About us</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold max-w-2xl">Craft meets <span className="text-gradient-gold">contemporary</span></h1>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Our story</h2>
        </div>
        <div className="space-y-4 text-muted-foreground">
          <p>Founded in 2018, NOIR was born from a simple obsession: clothes that age beautifully. We craft garments at the intersection of heritage tailoring and modern silhouettes — pieces designed to be worn, washed, and loved for years, not seasons.</p>
          <p>Every fabric is sourced from mills with decades of expertise. Every stitch is placed with intention. From our atelier in Dhaka to wardrobes in over 40 countries, we believe luxury is in the quiet details.</p>
        </div>
      </section>
      <section className="container mx-auto px-4 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { i: Award, t: "Award-winning", v: "Best in Class 2024" },
            { i: Users, t: "Customers", v: "120,000+" },
            { i: Heart, t: "5-star reviews", v: "12,500+" },
            { i: Sparkles, t: "Countries shipped", v: "40+" },
          ].map(({ i: Icon, t, v }) => (
            <div key={t} className="bg-card border border-border rounded-xl p-6 text-center">
              <Icon className="h-8 w-8 text-gold mx-auto mb-3" />
              <p className="font-display text-2xl font-bold">{v}</p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{t}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">Get in touch</p>
        <h1 className="font-display text-4xl md:text-6xl font-bold">Contact Us</h1>
      </div>
      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        {[
          { i: Mail, t: "Email", v: "hello@noir.com" },
          { i: Phone, t: "Phone", v: "+880 1700 000 000" },
          { i: MapPin, t: "Atelier", v: "Gulshan-2, Dhaka 1212" },
        ].map(({ i: Icon, t, v }) => (
          <div key={t} className="bg-card border border-border rounded-xl p-6 text-center">
            <Icon className="h-6 w-6 text-gold mx-auto mb-3" />
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{t}</p>
            <p className="font-display font-semibold mt-1">{v}</p>
          </div>
        ))}
      </div>
      <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl mx-auto">
        <h2 className="font-display text-2xl font-bold mb-6">Send us a message</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label>Name</Label><Input /></div>
          <div><Label>Email</Label><Input type="email" /></div>
          <div className="sm:col-span-2"><Label>Subject</Label><Input /></div>
          <div className="sm:col-span-2"><Label>Message</Label><Textarea rows={5} /></div>
        </div>
        <Button size="lg" className="w-full mt-6">Send message</Button>
      </div>
    </div>
  );
}

export function FAQ() {
  const items = [
    { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days. Express options are available at checkout." },
    { q: "What is your return policy?", a: "We offer 30-day hassle-free returns on all unworn items with original tags." },
    { q: "Do you ship internationally?", a: "Yes, we ship to 40+ countries. International orders typically arrive in 7-14 days." },
    { q: "How do I find my size?", a: "Use our detailed size guide on each product page, or chat with a stylist for help." },
    { q: "Can I cancel my order?", a: "Orders can be cancelled within 1 hour of placement. After that, please request a return." },
    { q: "Do you offer alterations?", a: "Yes, complimentary alterations are available at our atelier locations." },
  ];
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">Help center</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
      </div>
      <Accordion type="single" collapsible className="bg-card border border-border rounded-xl">
        {items.map((it, i) => (
          <AccordionItem key={i} value={`i${i}`} className="px-6">
            <AccordionTrigger className="text-left font-display font-semibold">{it.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{it.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export function StaticPage({ title, intro }: { title: string; intro: string }) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground text-lg mb-8">{intro}</p>
      <div className="prose max-w-none space-y-4 text-foreground/90">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <h2 className="font-display text-2xl font-bold mt-8">Section one</h2>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <h2 className="font-display text-2xl font-bold mt-8">Section two</h2>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
        <ul>
          <li>Item one explanation</li>
          <li>Item two explanation</li>
          <li>Item three explanation</li>
        </ul>
      </div>
    </div>
  );
}
