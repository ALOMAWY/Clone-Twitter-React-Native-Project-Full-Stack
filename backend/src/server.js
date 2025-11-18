import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

// Routes
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";


// import commentRoute from "./routes/comment.route.js";

// import notificationRoute from "./routes/notification.route.js";

import commentRoute from "./routes/comment.route.js";
import notificationRoute from "./routes/notification.route.js";

import commentRoute from "./routes/comment.route.js";



import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";
import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";

const app = express();
const PORT = ENV.PORT;

app.use(cors());

app.use(express.json());

app.use(clerkMiddleware());

app.use(arcjetMiddleware);

app.get("/", (req, res) => {
  res.send("Hello From SERVER");
});

// User Routes
app.use("/api/users", userRoute);

// Post Routes
app.use("/api/posts", postRoute);

// Comment Routes
app.use("/api/comment", commentRoute);

// Notification Routes
app.use("/api/notifications", notificationRoute);


// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

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



startServer()
