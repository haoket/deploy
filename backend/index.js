import express from "express";
import bodyParser from "body-parser";
import config from "./src/config/config.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import orderItemRoutes from "./src/routes/orderItemsRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import cartRoutes from "./src/routes/cartRoute.js";
import blogRoute from "./src/routes/blogRoute.js";
import payment from "./src/routes/payment.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
//
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true }));
// my-routes
authRoutes(app);
categoryRoutes(app);
orderItemRoutes(app);
orderRoutes(app);
productRoutes(app);
userRoutes(app);
cartRoutes(app);
blogRoute(app);
payment(app);
app.get("/", (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.send("Hello😁 Welcome ecommerce API!");
});

// Đặt tên thư mục chứa hình ảnh
const imageDirectory = path.join(__dirname, 'src/image');

// Sử dụng middleware để phục vụ hình ảnh từ thư mục "images"
app.use('/image', express.static(imageDirectory));


app.listen(config.port, () => {
  console.log(`Server is running on ${config.url}`);

});
