import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  artisan: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  category?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema<IProduct>(
  {
    artisan: { type: mongoose.Schema.Types.ObjectId, ref: 'Artisan', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
