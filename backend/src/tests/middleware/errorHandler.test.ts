import request from "supertest";
import express from "express";
import { errorHandler } from "../../middleware";

describe("error-handler.ts", () => {
  it("should return 500 status code and 'Internal Server Error' message", async () => {
    const testApp = express();

    testApp.get("/error", (req, res, next) => {
      throw new Error("Something went wrong");
    });

    testApp.use(errorHandler);

    const res = await request(testApp).get("/error");
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message", "Internal Server Error");
  });
});
