import mongoose, { Schema, Document } from 'mongoose';

export interface IQuote extends Document {
  quoteId: string;
  customerName: string;
  phone: string;
  email?: string;
  materialCategory: string;
  estimatedQuantity?: string;
  deliverySiteAddress?: string;
  notes?: string;
  status: 'PENDING' | 'REVIEWED' | 'DISPATCHED' | 'COMPLETED';
  createdAt: Date;
}

const QuoteSchema: Schema = new Schema(
  {
    quoteId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    materialCategory: { type: String, default: 'General Building Materials' },
    estimatedQuantity: { type: String },
    deliverySiteAddress: { type: String },
    notes: { type: String },
    status: {
      type: String,
      enum: ['PENDING', 'REVIEWED', 'DISPATCHED', 'COMPLETED'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  }
);

export const QuoteModel = mongoose.model<IQuote>('Quote', QuoteSchema);
