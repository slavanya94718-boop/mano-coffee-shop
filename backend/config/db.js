const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully to:', process.env.MONGO_URI);
  } catch (error) {
    console.error('❌ DB Connection Error:', error.message);
    // process.exit(1);   // ← ithai comment pannu first time test ku
  }
};

module.exports = connectDB;