import {Document, Schema} from 'mongoose';
import mongoose from "mongoose";

const User = new Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false},
    movies: {type: [String], required: true, unique: false}
});


export interface IUser extends Document {
    userName: string,
    password: string,
    movies: string[],
}

export default mongoose.model<IUser>('User', User);