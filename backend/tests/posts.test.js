const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");

const postsRouter = require("../routers/posts");

const app = express();
app.use(express.json());
app.use("/api/posts", postsRouter);

beforeAll(async () => {
  await mongoose.connect(
    "mongodb+srv://user1:FEAFZknFsDRNwraB@cluster0.38oyb7r.mongodb.net/dataplants-db",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
});

// Test for GET request
describe("GET /api/posts", () => {
  it("responds with a json containing a list of posts", async () => {
    const response = await request(app)
      .get("/api/posts")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);

    expect(response.body[0]).toHaveProperty("specie");
    expect(response.body[0]).toHaveProperty("user");
    expect(response.body[0]).toHaveProperty("location");
  });
});

// Test for GET request with species filter
describe("GET /api/posts/speciesFilter", () => {
  it("responds with a json containing the posts filtered by species", async () => {
    const speciesId = "6442795bfd83fcab715f71bc";

    const response = await request(app)
      .get(`/api/posts/speciesFilter`)
      .query({ species: speciesId });

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");

    response.body.forEach((post) => {
      expect(post.specie).toBe(speciesId);
    });
  });
});

// Test for GET request with user filter
describe("GET /api/posts/usersFilter", () => {
  it("responds with a json containing the posts filtered by user", async () => {
    const userId = "64411708d2a101b0bb3f04c4";

    const response = await request(app)
      .get(`/api/posts/usersFilter`)
      .query({ users: userId });

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");

    // Check that the returned posts are filtered by the specified user
    response.body.forEach((post) => {
      expect(post.user._id).toBe(userId);
    });
  }, 100000); // Set timeout to 10 seconds
});

describe("GET /api/posts/:id", () => {
  it("responds with a json containing the post", async () => {
    const postId = "64494f81384bac7654a84637";

    const response = await request(app).get(`/api/posts/${postId}`);

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body._id).toBe(postId);
  });
});

describe("GET /api/posts/get/count", () => {
  it("responds with a json containing the post count", async () => {
    const response = await request(app).get(`/api/posts/get/count`);

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toHaveProperty("postCount");
  });
});

describe("GET /api/posts/get/verified", () => {
  it("responds with a json containing verified posts", async () => {
    const response = await request(app).get(`/api/posts/get/verified`);

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    response.body.forEach((post) => {
      expect(post).toHaveProperty("isVerified", true);
    });
  });
});

describe("POST /api/posts", () => {
  it("responds with a json containing the created post", async () => {
    // replace with actual data
    const postData = {
      specie: "60a9b1d2f1daf5250a5b2a60",
      description: "some_description",
      user: "60a9b1d2f1daf5250a5b2a61",
      location: "some_location",
      image: "some_image_url",
    };

    const response = await request(app).post(`/api/posts`).send(postData);

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toMatchObject(postData);
  });
});

describe("DELETE /api/posts/:id", () => {
  it("responds with a success message", async () => {
    const postId = "some_valid_id"; // replace with an actual post id from your db

    const response = await request(app).delete(`/api/posts/${postId}`);

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({
      success: true,
      message: "the post is delated",
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
