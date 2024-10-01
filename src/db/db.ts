import mongoose from "mongoose";

export default async function connect() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017",
      {
        dbName: "HHAI",
      }
    );
    const connection = mongoose.connection;
    connection.setMaxListeners(20);
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err: Error) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
}
