import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuthShell({ title, sub, children, alt }: { title: string; sub: string; children: React.ReactNode; alt: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=1800&fit=crop&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <Link to="/" className="absolute top-8 left-8 font-display text-3xl font-bold text-white">NOIR<span className="text-gold">.</span></Link>
        <div className="absolute bottom-10 left-10 right-10 text-white">
          <p className="font-display text-3xl font-bold">Style is the only beauty that never fades.</p>
          <p className="text-sm text-white/80 mt-2">— Audrey Hepburn</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="lg:hidden font-display text-2xl font-bold inline-block mb-6">NOIR<span className="text-gold">.</span></Link>
          <h1 className="font-display text-3xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground mt-2">{sub}</p>
          <div className="mt-8 space-y-4">{children}</div>
          <p className="text-sm text-muted-foreground text-center mt-8">{alt}</p>
        </div>
      </div>
    </div>
  );
}

export function Login() {
  return (
    <AuthShell
      title="Welcome back"
      sub="Sign in to your account to continue"
      alt={<>Don't have an account? <Link to="/register" className="text-gold underline">Create one</Link></>}
    >
      <div><Label>Email</Label><Input type="email" placeholder="you@email.com" /></div>
      <div><Label>Password</Label><Input type="password" placeholder="••••••••" /></div>
      <div className="flex items-center justify-between text-xs">
        <label className="flex items-center gap-2 text-muted-foreground"><input type="checkbox" /> Remember me</label>
        <Link to="#" className="text-gold underline">Forgot password?</Link>
      </div>
      <Button size="lg" className="w-full" asChild><Link to="/dashboard">Sign in</Link></Button>
      <div className="relative my-2"><div className="border-t border-border" /><span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-background px-3 text-xs text-muted-foreground">or</span></div>
      <Button variant="outline" className="w-full">Continue with Google</Button>
    </AuthShell>
  );
}

export function Register() {
  return (
    <AuthShell
      title="Join NOIR"
      sub="Create your account in seconds"
      alt={<>Already a member? <Link to="/login" className="text-gold underline">Sign in</Link></>}
    >
      <div className="grid grid-cols-2 gap-3">
        <div><Label>First name</Label><Input /></div>
        <div><Label>Last name</Label><Input /></div>
      </div>
      <div><Label>Email</Label><Input type="email" /></div>
      <div><Label>Password</Label><Input type="password" /></div>
      <p className="text-xs text-muted-foreground">By creating an account, you agree to our Terms and Privacy Policy.</p>
      <Button size="lg" className="w-full" asChild><Link to="/dashboard">Create account</Link></Button>
    </AuthShell>
  );
}
