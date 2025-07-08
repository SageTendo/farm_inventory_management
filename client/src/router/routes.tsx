import { Link, Navigate, RouteObject } from "react-router-dom";
import Dashboard from "../ui/views/Dashboard";
import { Products } from "../ui/views/product/Products.tsx";
import { NewProduct } from "../ui/views/product/NewProduct.tsx";
import { ManageProduct } from "../ui/views/product/ManageProduct.tsx";
import { Users } from "../ui/views/user/Users.tsx";
import { NewUser } from "../ui/views/user/NewUser.tsx";
import { ManageUser } from "../ui/views/user/ManageUser.tsx";
import { SettingsPage } from "../ui/views/user/SettingsPage.tsx";
import LoginComponent from "../ui/views/auth/Login";
import { Layout } from "../ui/components/Layout.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

// Using const assertion to make these strings readonly types
export const paths = {
  root: "/",
  login: "/login",
  dashboard: "/dashboard",
  products: "/products",
  newProduct: "/products/new",
  manageProduct: "/products/:id/manage",
  stock: "/stock",
  sales: "/sales",
  users: "/users",
  newUser: "/users/new",
  manageUser: "/users/:id/manage",
  settings: "/settings",
  logout: "/logout",
} as const;

// This will be for authenticated users
const protectedRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: paths.root,
        element: <Layout />,
        children: [
          { index: true, element: <Navigate to={paths.dashboard} replace /> },
          { path: paths.dashboard, element: <Dashboard /> },
          { path: paths.products, element: <Products /> },
          { path: paths.newProduct, element: <NewProduct /> },
          { path: paths.manageProduct, element: <ManageProduct /> },
          { path: paths.stock, element: <div>Stock</div> },
          { path: paths.sales, element: <div>Sales</div> },
          { path: paths.users, element: <Users /> },
          { path: paths.newUser, element: <NewUser /> },
          { path: paths.manageUser, element: <ManageUser /> },
          { path: paths.settings, element: <SettingsPage /> },
          { path: paths.logout, element: <div>Logout</div> },
        ],
      },
    ],
  },
];

// This will be for public users
const publicRoutes: RouteObject[] = [
  {
    path: paths.login,
    element: <LoginComponent />,
  },
];

const routes: RouteObject[] = [
  ...publicRoutes,
  ...protectedRoutes,
  {
    path: "*",
    element: (
      <div className="d-flex flex-column align-items-center justify-content-center h-100">
        <h1 className="text-danger">404: Page Not Found</h1>
        <p className="text-muted">The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-primary">Go to Home</Link>
      </div>
    )
  }
]

export { protectedRoutes, publicRoutes };
export default routes; 