import mongoose, { Schema, Document } from 'mongoose';

export interface IArtisan extends Document {
  name: string;
  email: string;
  password: string;
  bio?: string;
  profileImage?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  products: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

const ArtisanSchema: Schema = new Schema<IArtisan>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String },
    profileImage: { type: String, default: null},
    phone: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IArtisan>('Artisan', ArtisanSchema);
