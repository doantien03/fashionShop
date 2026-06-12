const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/mongodb");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

//route
app.use("/api/auth", require("./routes/userRoute"));
app.use("/api/products", require("./routes/productRoute"));
app.use("/api/orders", require("./routes/orderRoute"));
app.use("/api/cart", require("./routes/cartRoute"));
app.use("/api/news", require("./routes/newsRoute"));

app.use("/api/dashboard",require("./routes/dashboardRoute"));
app.use("/api/upload",require("./routes/uploadRoute"));
app.use("/api/users",require("./routes/userRoute"));

// static
app.use("/admin", express.static(path.join(__dirname, "../admin")));
app.use(express.static(path.join(__dirname, "../frontend")));

// SPA fallback
app.use("/admin", (req, res, next) => {
  const ext = path.extname(req.path);
  if (ext) return res.status(404).end();
  res.sendFile(path.join(__dirname, "../admin/index.html"));
});

app.use((req, res, next) => {
  const ext = path.extname(req.path);

  if (req.path.startsWith("/api")) return next();
  if (req.path.startsWith("/admin")) return next();
  if (ext) return res.status(404).end();

  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// test route
app.get("/", (req, res) => {
    res.json({ message: "Server is running " });
});

app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
});