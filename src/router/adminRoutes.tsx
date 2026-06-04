import type { RouteObject } from "react-router-dom";
import { AdminLayout } from "@/pages/admin/AdminLayout";
import { AdminDashboard, AdminAnalytics } from "@/pages/admin/AdminDashboard";
import {
  AdminProducts, AdminOrders, AdminCategories, AdminCustomers,
  AdminCoupons, AdminBlogs, AdminPages, AdminBrands, AdminMenus,
  AdminMedia, AdminTheme, AdminSettings,
} from "@/pages/admin/AdminPages";
import { HomepageBuilder } from "@/pages/admin/HomepageBuilder";
import {
  ProductForm, CategoryForm, BrandForm, CouponForm,
  BlogForm, PageForm, CustomerView, OrderDetail,
} from "@/pages/admin/AdminForms";

export const adminRoutes: RouteObject[] = [
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "analytics", element: <AdminAnalytics /> },

      { path: "products", element: <AdminProducts /> },
      { path: "products/new", element: <ProductForm /> },
      { path: "products/:id/edit", element: <ProductForm /> },

      { path: "orders", element: <AdminOrders /> },
      { path: "orders/:id", element: <OrderDetail /> },

      { path: "categories", element: <AdminCategories /> },
      { path: "categories/new", element: <CategoryForm /> },
      { path: "categories/:id/edit", element: <CategoryForm /> },

      { path: "brands", element: <AdminBrands /> },
      { path: "brands/new", element: <BrandForm /> },
      { path: "brands/:id/edit", element: <BrandForm /> },

      { path: "customers", element: <AdminCustomers /> },
      { path: "customers/:id", element: <CustomerView /> },

      { path: "coupons", element: <AdminCoupons /> },
      { path: "coupons/new", element: <CouponForm /> },
      { path: "coupons/:id/edit", element: <CouponForm /> },

      { path: "blogs", element: <AdminBlogs /> },
      { path: "blogs/new", element: <BlogForm /> },
      { path: "blogs/:id/edit", element: <BlogForm /> },

      { path: "pages", element: <AdminPages /> },
      { path: "pages/new", element: <PageForm /> },
      { path: "pages/:id/edit", element: <PageForm /> },

      { path: "menus", element: <AdminMenus /> },
      { path: "media", element: <AdminMedia /> },
      { path: "builder", element: <HomepageBuilder /> },
      { path: "theme", element: <AdminTheme /> },
      { path: "settings", element: <AdminSettings /> },
    ],
  },
];
