const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const port = process.env.PORT || 5050;
const productRoutes = require("./routes/productRoutes");
dotenv.config();
connectDb();
app.get(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);

app.listen(port, () => console.log(`Server runnning on ${port}`));
