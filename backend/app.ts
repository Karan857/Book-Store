import express from "express";
import cors from 'cors'

import bookRoute from "./routes/bookRoute.ts";
import category from "./routes/categoryRoute.ts";
import auth from './routes/authRoute.ts'

const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/books", bookRoute);
app.use("/api/category", category);
app.use("/api/auth", auth);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
