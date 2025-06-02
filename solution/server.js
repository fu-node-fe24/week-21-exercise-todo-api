import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import keysRouter from './routes/keys.js';
import authRouter from './routes/auth.js';
import todosRouter from './routes/todos.js';
import logger from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';

// Config
const app = express();
dotenv.config();
const PORT = process.env.PORT;
mongoose.connect(process.env.CONNECTION_STRING);
const database = mongoose.connection;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(logger);

// Routes
app.use('/api/keys', keysRouter);
app.use('/api/auth', authRouter);
app.use('/api/todos', todosRouter);

database.on('error', () => console.log(error));

database.once('connected', () => {
    console.log('DB Connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);        
    });
});

app.use(errorHandler);