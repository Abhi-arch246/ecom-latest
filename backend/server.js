const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const port = process.env.PORT || 5050;
const cookieParser = require("cookie-parser");
const productRoutes = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");

dotenv.config();
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.get("/api/paypal/config", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.listen(port, () => console.log(`Server runnning on ${port}`));
