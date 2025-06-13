import { Request, Response } from "express";
import Order from "../models/OrderModel";
import Product from "../models/ProductModel";
import { AuthenticatedRequest } from "../middlewares/authmiddlewares"; // req.userId

export const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ message: "Itens do pedido são obrigatórios" });
      return 
    }

    const populatedItems = [];

    let total = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        res.status(404).json({ message: `Produto não encontrado: ${item.product}` });
        return 
      }

      const price = product.price;
      const quantity = item.quantity;

      total += price * quantity;

      populatedItems.push({
        product: product._id,
        quantity,
        priceAtPurchase: price,
      });
    }

    const newOrder = new Order({
      user: req.userId,
      items: populatedItems,
      total,
      status: "pendente",
    });

    await newOrder.save();

    res.status(201).json({ message: "Pedido criado com sucesso", order: newOrder });
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ message: "Erro ao criar pedido", error });
  }
};
