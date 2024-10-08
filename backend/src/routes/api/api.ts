import express from "express";
import uploadRouter from "./upload/upload";
import reportsRouter from "./reports/reports";

const api = express.Router();

api.use("/statements", uploadRouter);
api.use("/reports", reportsRouter);

export default api;
