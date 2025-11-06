import express from "express";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";

const app = express();
const PORT = ENV.PORT;


const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log("Server-is-up & running on PORT:" + PORT)
    );
  } catch (error) {
    console.error("", error);
  }
};

app.get("/", (req, res) => {
  res.send("Hello From SERVER");
});

startServer()
