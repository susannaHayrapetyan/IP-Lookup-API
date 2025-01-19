// Load environment variables
import 'dotenv/config';
import express from 'express';
import routes from '../routes';
import { errorHandler } from '../middlewares/error-handler';

// Initialize the app
const app = express();

// Global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes setup
app.use('/api', routes);

// Error handling middleware (the last middleware)
app.use(errorHandler);

export default app;