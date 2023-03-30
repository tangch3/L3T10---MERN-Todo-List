import express from 'express'; // api 
import cors from 'cors'; // allows you to set up the rules between the front end and back end.
import mongoose from 'mongoose'; // database management system
import { todoRouter } from './routes/todo.js';
import { userRouter } from './routes/users.js';

const app = express();
const port = process.env.PORT || 8080

/* MIDDLEWARE */
app.use(express.json());
app.use(cors());

app.use("/login", userRouter);
app.use("/todo", todoRouter);

/* MONGODB CONNECTION */
mongoose.connect("mongodb+srv://tangch3:tangch3@cluster0.jdkfwi6.mongodb.net/todo?retryWrites=true&w=majority");

app.listen(port, () => console.log(`SERVER STARTED ON PORT ${port}`))
