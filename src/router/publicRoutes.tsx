import { Navigate, type RouteObject } from "react-router-dom";
import Home from "@/pages/Home";
import ProductListing from "@/pages/ProductListing";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import { BlogList, BlogDetail } from "@/pages/Blog";
import { About, Contact, FAQ, StaticPage } from "@/pages/Static";
import {
  DashboardLayout, DashboardProfile, DashboardOrders,
  DashboardAddresses, DashboardWishlist, DashboardReviews,
} from "@/pages/Dashboard";

export const publicRoutes: RouteObject[] = [
  { index: true, element: <Home /> },
  { path: "category/:category", element: <ProductListing /> },
  { path: "category/:category/:sub", element: <ProductListing /> },
  { path: "category/:category/:sub/*", element: <ProductListing /> },
  { path: "new", element: <ProductListing /> },
  { path: "search", element: <ProductListing /> },
  { path: "product/:slug", element: <ProductDetails /> },
  { path: "cart", element: <Cart /> },
  { path: "checkout", element: <Checkout /> },
  { path: "wishlist", element: <Navigate to="/dashboard/wishlist" replace /> },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardProfile /> },
      { path: "orders", element: <DashboardOrders /> },
      { path: "addresses", element: <DashboardAddresses /> },
      { path: "wishlist", element: <DashboardWishlist /> },
      { path: "reviews", element: <DashboardReviews /> },
    ],
  },
  { path: "blog", element: <BlogList /> },
  { path: "blog/:slug", element: <BlogDetail /> },
  { path: "about", element: <About /> },
  { path: "contact", element: <Contact /> },
  { path: "faq", element: <FAQ /> },
  { path: "privacy-policy", element: <StaticPage title="Privacy Policy" intro="Your privacy matters to us." /> },
  { path: "return-policy", element: <StaticPage title="Return Policy" intro="30-day hassle-free returns." /> },
];
