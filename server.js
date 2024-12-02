import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import routes from "./routes/index.js";

dotenv.config()
connectDB();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use(routes);

app.get('/', (req, res) => {
    res.send('Server is running');
})

app.listen(port, () => {
    console.log(`Server is running  at http://localhost:${port}`);
})