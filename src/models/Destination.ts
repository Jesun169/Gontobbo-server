import mongoose, { Schema, Document } from 'mongoose';

export interface IDestination extends Document {
    name: string;
    location: { city: string; country: string };
    images: string[];
    description: string;
    price: { amount: number; currency: string; per: string };
    rating: { average: number; count: number };
    category: string[];
}

const DestinationSchema: Schema = new Schema({
    name: { type: String, required: true },
    location: {
        city: { type: String, required: true },
        country: { type: String, required: true }
    },
    images: [{ type: String }],
    description: { type: String, required: true },
    price: {
        amount: { type: Number, required: true },
        currency: { type: String, default: 'USD' },
        per: { type: String, default: 'night' }
    },
    rating: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    category: [{ type: String }]
}, { timestamps: true });

export const Destination = mongoose.model<IDestination>('Destination', DestinationSchema);