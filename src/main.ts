import e from "express";
import express, { Request, Response } from "express";
import { validateCpf } from "./CpfValidator";
const app = express();
app.use(express.json());
app.listen(3000);

const products = [
  { idProduct: 1, description: "A", price: 1000 },
  { idProduct: 2, description: "B", price: 5000 },
  { idProduct: 3, description: "C", price: 30 },
];

const coupons = [{ code: "VALE20", percentage: 20 }];

app.post("/checkout", (req: Request, res: Response) => {
  const isValid = validateCpf(req.body.cpf);
  if (!isValid) {
    return res.status(422).json({ message: "Invalid cpf" });
  }
  let total = 0;
  for (const item of req.body.items) {
    const product = products.find(
      (product) => product.idProduct === item.idProduct
    );
    if (product) {
      total += product.price * item.quantity;
    } else {
      return res.status(422).json({ message: "Product not found" });
    }
  }

  if (req.body.coupon) {
    const coupon = coupons.find((coupon) => coupon.code === req.body.coupon);
    if (coupon) total -= (total * coupon.percentage) / 100;
  }

  res.json({ total });
});
