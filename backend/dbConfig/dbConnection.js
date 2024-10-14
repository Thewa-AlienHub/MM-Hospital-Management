import mongoose from 'mongoose';

class Database {
  static instance = null; // Holds the singleton instance
  static isConnecting = false; // Flag to indicate if a connection attempt is ongoing

  constructor() {
    // Prevent direct instantiation
    if (Database.instance) {
      return Database.instance;
    }
    Database.instance = this;
  }

  async connect() {
    if (!Database.isConnecting) {
      Database.isConnecting = true; // Set the flag to indicate connection is ongoing
      try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log('DB Connected Successfully');
      } catch (error) {
        console.error('DB Error: ' + error);
      } finally {
        Database.isConnecting = false; // Reset the flag after attempting connection
      }
    } else {
      console.log('Connection attempt already in progress');
    }
  }
}

// Export the singleton instance
const dbConnection = new Database();
export default dbConnection;
