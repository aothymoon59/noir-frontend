import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider, ThemeProvider, WishlistProvider } from "@/lib/store";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import ProductListing from "@/pages/ProductListing";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import { Login, Register } from "@/pages/Auth";
import { DashboardLayout, DashboardProfile, DashboardOrders, DashboardAddresses, DashboardWishlist, DashboardReviews } from "@/pages/Dashboard";
import { BlogList, BlogDetail } from "@/pages/Blog";
import { About, Contact, FAQ, StaticPage } from "@/pages/Static";
import { AdminLayout } from "@/pages/admin/AdminLayout";
import { AdminDashboard, AdminAnalytics } from "@/pages/admin/AdminDashboard";
import { AdminProducts, AdminOrders, AdminCategories, AdminCustomers, AdminCoupons, AdminBlogs, AdminPages, AdminBrands, AdminMenus, AdminMedia, AdminTheme, AdminSettings } from "@/pages/admin/AdminPages";
import { HomepageBuilder } from "@/pages/admin/HomepageBuilder";

export function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/category/:category" element={<ProductListing />} />
                  <Route path="/category/:category/:sub" element={<ProductListing />} />
                  <Route path="/category/:category/:sub/*" element={<ProductListing />} />
                  <Route path="/new" element={<ProductListing />} />
                  <Route path="/search" element={<ProductListing />} />
                  <Route path="/product/:slug" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/wishlist" element={<Navigate to="/dashboard/wishlist" replace />} />

                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardProfile />} />
                    <Route path="orders" element={<DashboardOrders />} />
                    <Route path="addresses" element={<DashboardAddresses />} />
                    <Route path="wishlist" element={<DashboardWishlist />} />
                    <Route path="reviews" element={<DashboardReviews />} />
                  </Route>

                  <Route path="/blog" element={<BlogList />} />
                  <Route path="/blog/:slug" element={<BlogDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/privacy-policy" element={<StaticPage title="Privacy Policy" intro="Your privacy matters to us. Here's how we handle your data." />} />
                  <Route path="/return-policy" element={<StaticPage title="Return Policy" intro="30-day hassle-free returns on all unworn items." />} />

                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="categories" element={<AdminCategories />} />
                    <Route path="brands" element={<AdminBrands />} />
                    <Route path="customers" element={<AdminCustomers />} />
                    <Route path="coupons" element={<AdminCoupons />} />
                    <Route path="blogs" element={<AdminBlogs />} />
                    <Route path="pages" element={<AdminPages />} />
                    <Route path="menus" element={<AdminMenus />} />
                    <Route path="media" element={<AdminMedia />} />
                    <Route path="builder" element={<HomepageBuilder />} />
                    <Route path="theme" element={<AdminTheme />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>
                </Routes>
              </main>
              <Footer />
            </div>
            <Toaster />
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
