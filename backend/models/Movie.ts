import {Document, Schema} from 'mongoose';
import mongoose from "mongoose";

const Movie = new Schema({
    id: {type: String, required: false, unique: true},
    title: {type: String, required: true, unique: false},
    year: {type: String, required: false, unique: false},
    genres: {type: [String], required: false, unique: false},
    ratings: {type: [Number], required: false, unique: false},
    poster: {type: String, required: false, unique: false},
    contentRating: {type: String, required: false, unique: false},
    duration: {type: Number, required: false, unique: false},
    releaseDate: {type: String, required: false, unique: false},
    averageRating: {type: Number, required: false, unique: false},
    originalTitle: {type: String, required: false, unique: false},
    storyline: {type: String, required: false, unique: false},
    actors: {type: [String], required: false, unique: false},
    imdbRating: {type: Number, required: false, unique: false},
    posterurl: {type: String, required: false, unique: false},
    watches: {type: Number, required: false, unique: false},
});


export interface IMovie extends Document {
    id: string,
    title: string,
    year: string,
    genres: string[],
    ratings: number[],
    poster: string,
    contentRating: string,
    duration: number,
    releaseDate: string,
    averageRating: number,
    originalTitle: string,
    storyline: string,
    actors: string[],
    imdbRating: number,
    posterurl: string,
    watches: number
}

export default mongoose.model<IMovie>('Movie', Movie);