import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  unit: string;
  offerTag?: string;
  description: string;
  image: string;
  badge?: string;
  inStock: boolean;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    unit: { type: String, required: true, default: 'unit' },
    offerTag: { type: String },
    description: { type: String, required: true },
    image: { type: String, required: true },
    badge: { type: String },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
