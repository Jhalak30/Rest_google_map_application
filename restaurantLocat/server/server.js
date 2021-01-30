import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import cors from "cors";
import restRoutes from "./routes/rests.js";

const app = express();

env.config();
const PORT = process.env.PORT || 5000;
//
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.8hbxs.mongodb.net/${process.env.MONGODB_DATABSE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Database Connected");
  });

app.use(express.json());

app.use(cors());
app.use("/api/rests", restRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
