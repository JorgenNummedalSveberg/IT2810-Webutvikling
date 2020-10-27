import {Document, Schema} from 'mongoose';
import mongoose from "mongoose";

const Movie = new Schema({
    id: {type: String, required: true, unique: true},
    title: {type: String, required: true, unique: false},
    year: {type: String, required: true, unique: false},
    genres: {type: [String], required: true, unique: false},
    ratings: {type: [Number], required: true, unique: false},
    poster: {type: String, required: true, unique: false},
    contentRating: {type: String, required: true, unique: false},
    duration: {type: Number, required: true, unique: false},
    releaseDate: {type: String, required: true, unique: false},
    averageRating: {type: Number, required: true, unique: false},
    originalTitle: {type: String, required: true, unique: false},
    storyline: {type: String, required: true, unique: false},
    actors: {type: [String], required: true, unique: false},
    imdbRating: {type: Number, required: true, unique: false},
    posterurl: {type: String, required: true, unique: false},
    watches: {type: Number, required: true, unique: false},
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