import express, { NextFunction, Request, Response } from "express";
// import booksRouter from './controllers/BooksController';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "../swaggerOptions";
import { RegisterRoutes } from "./routes/routes";
import { ValidateError } from "tsoa";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
const port = 3000;
app.use(bodyParser.json());
const specs = swaggerJsdoc(swaggerOptions);
RegisterRoutes(app);
app.use(function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});

// Simple route to test the connection
app.get("/", async (req: Request, res: Response) => {
  res.send("server is up and running");
});

try {
  const swaggerDocument = require("./swagger/swagger.json");
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
  console.log("Unable to load swagger.json", err);
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
