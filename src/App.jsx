import "./App.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Erorr from "./components/Erorr/Erorr";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvder from "./Context/CartContext";
import { Toaster } from 'react-hot-toast';
import CategorieDetails from "./components/CategorieDetails/CategorieDetails";
import OrderUsers from "./components/OrderUsers/OrderUsers";
import CreditCard from "./components/CreditCard/CreditCard";
import ForgotPasswords from "./components/ForgotPasswords/ForgotPasswords";
import ResetCode from "./components/ResetCode/ResetCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Allorders from "./components/Allorders/Allorders";
import Spbrand from "./components/Spbrand/Spbrand";
import Wishlist from "./components/Wishlist/Wishlist";
import ListContextProvider from "./Context/ListContext";
let newQuery = new QueryClient()

let routering = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute> <Home /></ProtectedRoute> },
      { path: "home", element: <ProtectedRoute> <Home /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute> <Cart /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute> <Products /> </ProtectedRoute> },
      { path: "productdetails/:id/:category", element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
      { path: "CategorieDetails/:id/:category/", element: <ProtectedRoute> <CategorieDetails /> </ProtectedRoute> },
      { path: "orderUsers/:cartId", element: <ProtectedRoute> <OrderUsers /> </ProtectedRoute> },
      { path: "allorders", element: <Allorders /> },
      { path: "creditCard", element: <ProtectedRoute> <CreditCard /> </ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
      { path: "/spbrand/:id", element: <ProtectedRoute> <Spbrand /> </ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
      { path: "wishlist", element: <ProtectedRoute> <Wishlist /> </ProtectedRoute> },
      { path: "register", element: <Register /> },
      // { path: "updateMe", element: <UpdateMe /> },
      // http://localhost:5173/
      { path: "login", element: <Login /> },
      { path: "forgotpasswords", element: <ForgotPasswords /> },
      { path: "resetCode", element: <ResetCode /> },
      { path: "resetPassword", element: <ResetPassword /> },
      // { path: "resetPassword", element: <ResetPassword /> },
      { path: "*", element: <Erorr /> },
    ],
  },
]);
function App() {
  return (
    <UserContextProvider>
      <ListContextProvider>
        <CartContextProvder>
          <QueryClientProvider client={newQuery}>
            <HelmetProvider>
              <ReactQueryDevtools />
              <RouterProvider router={routering}></RouterProvider>
              <Toaster />
            </HelmetProvider>
          </QueryClientProvider>
        </CartContextProvder>
      </ListContextProvider>
    </UserContextProvider>
  );
}
export default App;
