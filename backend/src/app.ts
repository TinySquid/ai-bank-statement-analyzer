import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import { errorHandler } from "./middleware";

import api from "./routes/api/api";

const CORS_WHITELIST = (process.env.CORS_WHITELIST || "").replace(/\s+/g, "").split(",") || [
  "http://localhost:3000",
  "http://localhost:5173",
];

const app = express();

const whitelist = CORS_WHITELIST;

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(helmet());

app.use(morgan("combined"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", api);

app.use(errorHandler);

export default app;
