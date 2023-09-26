import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import ProductDesc from "./pages/ProductDesc";
import Profile from "./pages/Profile";
import Shipping from "./pages/Shipping";
import PrivateRoutes from "./components/PrivateRoutes";
import AdminRoutes from "./components/AdminRoutes";
import PlaceOrder from "./pages/PlaceOrder";
import OrderPage from "./pages/OrderPage";
import MyOrders from "./pages/MyOrders";
import toast, { Toaster } from "react-hot-toast";
import AdminPage from "./pages/admin/AdminPage";
import OrderList from "./pages/admin/OrderList";
import ProductList from "./pages/admin/ProductList";
import UserList from "./pages/admin/UserList";
import AddProduct from "./pages/admin/AddProduct";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDesc />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="" element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Route>
        <Route path="" element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/addproduct" element={<AddProduct />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
