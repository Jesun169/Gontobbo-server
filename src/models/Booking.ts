import mongoose, { Schema, Document } from 'mongoose';

export enum BookingStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
}

export interface IBooking extends Document {
    user: string;                 // Clerk userId (string, not ObjectId)
    destination: mongoose.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    guests: number;
    totalPrice: number;
    currency: string;
    status: BookingStatus;
    specialRequests?: string;
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
    {
        user: { type: String, required: true, index: true },  // Clerk userId
        destination: { type: Schema.Types.ObjectId, ref: 'Destination', required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        guests: { type: Number, required: true, min: 1 },
        totalPrice: { type: Number, required: true },
        currency: { type: String, default: 'USD' },
        status: {
            type: String,
            enum: Object.values(BookingStatus),
            default: BookingStatus.PENDING,
        },
        specialRequests: { type: String },
    },
    { timestamps: true }
);

export const Booking = mongoose.model<IBooking>('Booking', BookingSchema);