import express from 'express';
import { TodoModel } from "../models/Todo.js";
import { verifyToken } from './users.js';

const router = express.Router();

/* DISPLAY ALL RECORDS */
router.get("/", verifyToken, async (req, res) => {
    try {
        const response = await TodoModel.find({})
        res.json(response);
    } catch (err) {
        res.json(err)
    }
})

/* ADD TODO RECORD */
router.post("/add", verifyToken, todoLength, async (req, res) => {
    const todo = new TodoModel(req.body);
    try {
        const response = await todo.save();
        res.json(response)
    } catch (err) {
        res.json(err)
    }
})

/* DELETE TODO RECORD */
router.delete("/:id", async (req, res) => {
    // find the car by id and delete from mongodb
    const {id} = req.params;

    try {
        await TodoModel.findByIdAndDelete(id)
        res.json("Todo Deleted")
    } catch (err) {
        res.json(err)
    }
})


/* UPDATE CAR */
router.put("/:id", async (req, res) => {

    const {id} = req.params;

    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(id, req.body);
        res.json(updatedTodo)
    } catch (err) {
        res.json(err)
    }
})

export {router as todoRouter };


/* MIDDLEWARE TO CHECK IF TODO IS MORE THAN 140 LENGTH */

function todoLength(req, res, next) {
    const todoCharacters = req.body.task;
    if(todoCharacters.length < 140 ) {
        next();
    } else {
        res.json({  message: "Todo is longer than 140 characters. Please make it shorter" })
    }
}

/* MIDDELWARE TO VERIFY USER IS LOGGED IN */