import 'dotenv/config';  // Load environment variables
import app from './infrastructure/http/server';
import { connectToDatabase, closeDatabaseConnection } from './infrastructure/database/connection';

// Start the server
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, async () => {
  try {
    // Connect to the database
    await connectToDatabase();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error('Failed to start the server:', error);
    // Exit the process on failure
    process.exit(1);
  }
});

// Graceful shutdown
const shutdownGracefully = () => {
  console.log('Received shutdown signal. Closing server gracefully...');

  // Close the database connection
  closeDatabaseConnection();

  // Gracefully stop the server
  server.close((err) => {
    if (err) {
      console.error('Error while closing server:', err);
      process.exit(1);
    } else {
      console.log('Server shut down gracefully');
      process.exit(0);
    }
  });
};

// Listen for termination signals (SIGINT, SIGTERM)
process.on('SIGINT', shutdownGracefully);  // For Ctrl+C (SIGINT)
process.on('SIGTERM', shutdownGracefully);  // For termination signal (SIGTERM)