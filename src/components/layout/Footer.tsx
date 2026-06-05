import { Link, useLocation } from "react-router-dom";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  const loc = useLocation();
  if (loc.pathname.startsWith("/admin")) return null;
  return (
    <footer className="border-t border-border bg-card mt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          <div className="sm:col-span-2">
            <div className="font-display text-3xl font-bold mb-4">
              NOIR<span className="text-gold">.</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              Premium fashion crafted with intention. Modern silhouettes, timeless tailoring, and fabrics that last.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon"><Instagram className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon"><Twitter className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon"><Facebook className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon"><Youtube className="h-4 w-4" /></Button>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 uppercase text-xs tracking-widest">Shop</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/category/men" className="hover:text-gold">Men</Link></li>
              <li><Link to="/category/women" className="hover:text-gold">Women</Link></li>
              <li><Link to="/category/kids" className="hover:text-gold">Kids</Link></li>
              <li><Link to="/category/wedding" className="hover:text-gold">Wedding</Link></li>
              <li><Link to="/category/accessories" className="hover:text-gold">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 uppercase text-xs tracking-widest">Help</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/faq" className="hover:text-gold">FAQ</Link></li>
              <li><Link to="/return-policy" className="hover:text-gold">Returns</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-gold">Privacy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-gold">About</Link></li>
              <li><Link to="/blog" className="hover:text-gold">Journal</Link></li>
              <li><Link to="/admin" className="hover:text-gold">Admin</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-muted-foreground">© 2025 NOIR. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Crafted with intention in Dhaka · Milan · NYC</p>
        </div>
      </div>
    </footer>
  );
}
