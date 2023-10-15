import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database Connected: ${conn.connection.host} `.cyan.underline);
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
  }
};

export default connectDB;
