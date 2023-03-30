import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    }
});

export const TodoModel = mongoose.model("todos", TodoSchema);