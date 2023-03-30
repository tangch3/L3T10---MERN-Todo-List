// Tell MongoDB what the Users collection will look like i.e. data structure
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

export const UserModel = mongoose.model("users", UserSchema) // Users is what the collection will be called in MongoDB