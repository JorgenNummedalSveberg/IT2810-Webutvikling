import {Document, Schema} from 'mongoose';
import mongoose from "mongoose";

const User = new Schema({
    id: {type: String, required: false, unique: true},
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false},
    movies: {type: [String], required: true, unique: false}
});


export interface IUser extends Document {
    id: string,
    userName: string,
    password: string,
    movies: string[],
}

export default mongoose.model<IUser>('User', User);