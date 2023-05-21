const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");

const categoriesRouter = require("../routers/categories");

const app = express();
app.use(express.json());
app.use("/api/categories", categoriesRouter);

beforeAll(async () => {
  await mongoose.connect(
    "mongodb+srv://user1:FEAFZknFsDRNwraB@cluster0.38oyb7r.mongodb.net/dataplants-db",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
});

// test for GET request
describe("GET /api/categories", () => {
  it("responds with a json containing a list of all categories", (done) => {
    request(app)
      .get("/api/categories")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// test for GET request by id
describe("GET /api/categories/:id", () => {
  it("responds with a json containing a specific category", (done) => {
    const id = "64424b71f6b57526de0652db";
    request(app)
      .get(`/api/categories/${id}`)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// test for POST request
describe("POST /api/categories", () => {
  it("responds with a json containing the created category", async () => {
    const newCategory = {
      name: "TestCategory",
      icon: "TestIcon",
      color: "TestColor",
    };

    try {
      const response = await request(app)
        .post("/api/categories")
        .send(newCategory)
        .expect("Content-Type", /json/)
        .expect(200);
    } catch (err) {
      console.error(err.response);
      throw err;
    }
  });
});

// test for PUT request
describe("PUT /api/categories/:id", () => {
  it("responds with a json containing the updated category", (done) => {
    const id = "64424b71f6b57526de0652db";
    const updatedCategory = {
      name: "UpdatedCategory",
      icon: "UpdatedIcon",
      color: "UpdatedColor",
    };
    request(app)
      .put(`/api/categories/${id}`)
      .send(updatedCategory)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// test for DELETE request
describe("DELETE /api/categories/:id", () => {
  it("responds with a json showing successful deletion message", (done) => {
    const id = "64424b71f6b57526de0652db";
    request(app)
      .delete(`/api/categories/${id}`)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
