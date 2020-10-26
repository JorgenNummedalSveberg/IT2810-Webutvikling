import {Document, Schema} from 'mongoose';
import mongoose from "mongoose";

const Movie = new Schema({
    id: {type: String, requred: true, unique: false},
    title: {type: String, requred: true, unique: false},
    year: {type: String, requred: true, unique: false},
    genres: {type: [String], requred: true, unique: false},
    ratings: {type: [Number], requred: true, unique: false},
    poster: {type: String, requred: true, unique: false},
    contentRating: {type: String, requred: true, unique: false},
    duration: {type: Number, requred: true, unique: false},
    releaseDate: {type: String, requred: true, unique: false},
    averageRating: {type: Number, requred: true, unique: false},
    originalTitle: {type: String, requred: true, unique: false},
    storyline: {type: String, requred: true, unique: false},
    actors: {type: [String], requred: true, unique: false},
    imdbRating: {type: Number, requred: true, unique: false},
    posterurl: {type: String, requred: true, unique: false},
    watches: {type: Number, requred: true, unique: false},
});


export interface IMovie extends Document {
    id: string,
    title: string,
    year: string,
    genres: [string],
    ratings: [number],
    poster: string,
    contentRating: string,
    duration: number,
    releaseDate: string,
    averageRating: number,
    originalTitle: string,
    storyline: string,
    actors: [string],
    imdbRating: number,
    posterurl: string,
    watches: number
}

export default mongoose.model<IMovie>('Movie', Movie);