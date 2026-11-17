import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    clerkId: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'user' | 'admin' | 'manager';
    favorites: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'manager'], default: 'user' },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Destination' }]
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', UserSchema);