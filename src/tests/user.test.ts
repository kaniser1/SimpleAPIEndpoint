import mongoose from "mongoose";
import { expect } from "chai";
import request from "supertest";
import { app } from "../app";
import { User } from "../models/user";
import dotenv from "dotenv";

dotenv.config();

describe("GET /users", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_TEST_URI || "");
  });

  after(async () => {
    await User.deleteOne({ email: "john@example.com" });
    await mongoose.disconnect();
  });

  it("should return an empty array when no users exist", async () => {
    const res = await request(app).get("/users");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array").that.is.empty;
  });

  it("should return users when they exist", async () => {
    const user = new User({
      name: "John Doe",
      email: "john@example.com",
      age: 30,
    });
    await user.save();

    const res = await request(app).get("/users");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array").that.has.lengthOf(1);
    expect(res.body[0]).to.include({
      name: "John Doe",
      email: "john@example.com",
      age: 30,
    });
  });
});
