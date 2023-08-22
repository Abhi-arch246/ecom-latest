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
import PlaceOrder from "./pages/PlaceOrder";
import OrderPage from "./pages/OrderPage";

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
