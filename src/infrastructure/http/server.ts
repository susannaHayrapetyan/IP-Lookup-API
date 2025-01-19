// Load environment variables
import 'dotenv/config';
import express from 'express';
import routes from '../routes';
import { errorHandler } from '../middlewares/error-handler';
import { notFound } from '../middlewares/not-found';

// Initialize the app
const app = express();

// Global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes setup
app.use('/api', routes);

// Handle 404 - Not Found
app.use(notFound);

// Error handling middleware (the last middleware)
app.use(errorHandler);

export default app;