import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/layout";
import { Products, NewProduct, EditProduct } from "../pages/products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // is equivalent to path: "/",
        element: <Products />,
      },
      {
        path: "/products/new",
        element: <NewProduct />,
      },
      {
        path: "/products/:id",
        element: <EditProduct />,
      },
    ],
  },
]);
