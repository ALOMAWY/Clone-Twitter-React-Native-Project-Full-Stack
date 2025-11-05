import express from "express";

const app = express();
const PORT = 5001;
app.listen(PORT, () => console.log("Server-is-up & running on PORT:" + PORT));
