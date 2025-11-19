import { Link, Navigate, RouteObject } from "react-router-dom";
import Dashboard from "../ui/views/Dashboard";
import { Products } from "../ui/views/product/Products";
import { NewProduct } from "../ui/views/product/NewProduct";
import { ManageProduct } from "../ui/views/product/ManageProduct";
import { Users } from "../ui/views/user/Users";
import { NewUser } from "../ui/views/user/NewUser";
import { ManageUser } from "../ui/views/user/ManageUser";
import { SettingsPage } from "../ui/views/user/SettingsPage";
import LoginComponent from "../ui/views/Login";
import { Layout } from "../ui/components/shared/Layout";
import ProtectedRoute from "./ProtectedRoute";
import { Shop } from "../ui/views/Shop";

// Using const assertion to make these strings readonly types
export const paths = {
  root: "/",
  login: "/login",
  dashboard: "/dashboard",
  pos: "/pos",
  products: "/products",
  newProduct: "/products/new",
  manageProduct: "/products/:productId/manage",
  stock: "/stock",
  sales: "/sales",
  users: "/users",
  newUser: "/users/new",
  manageUser: "/users/:userId/manage",
  settings: "/settings",
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
          { path: paths.pos, element: <Shop /> },
          { path: paths.products, element: <Products /> },
          { path: paths.newProduct, element: <NewProduct /> },
          { path: paths.manageProduct, element: <ManageProduct /> },
          { path: paths.stock, element: <div>Stock</div> },
          { path: paths.sales, element: <div>Sales</div> },
          { path: paths.users, element: <Users /> },
          { path: paths.newUser, element: <NewUser /> },
          { path: paths.manageUser, element: <ManageUser /> },
          { path: paths.settings, element: <SettingsPage /> },
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
      <div className="flex flex-col items-center justify-center h-screen-dvh">
        <h1 className="text-red-600">404: Page Not Found</h1>
        <p className="text-gray-600">
          The page you are looking for does not exist.
        </p>
        <br />
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white text-xl rounded-lg"
        >
          Return Home
        </Link>
      </div>
    ),
  },
];

export { protectedRoutes, publicRoutes };
export default routes;
