import mongoose, { Schema, Document } from "mongoose";

interface OrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  priceAtPurchase: number; 
}

export interface Order extends Document {
  user: mongoose.Types.ObjectId;
  items: OrderItem[];
  total: number;
  status: "pendente" | "pago" | "enviado" | "cancelado";
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<OrderItem>({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  priceAtPurchase: { type: Number, required: true },
});

const OrderSchema = new Schema<Order>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [OrderItemSchema], required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pendente", "pago", "enviado", "cancelado"],
      default: "pendente",
    },
  },
  { timestamps: true }
);

export default mongoose.model<Order>("Order", OrderSchema);
