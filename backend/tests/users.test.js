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

// Ruta GET para obtener una lista de usuarios
describe('GET /users', () => {
  it('should return a list of users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// Ruta GET para obtener un usuario por ID
describe('GET /users/:id', () => {
  it('should return a user by ID', async () => {
    const userId = 'USER_ID'; // Reemplaza con un ID válido existente en la base de datos

    const res = await request(app).get(`/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', userId);
    // Realiza pruebas adicionales según lo necesites para verificar que el usuario se haya obtenido correctamente
  });

  it('should return a 500 error if the user is not found', async () => {
    const res = await request(app).get('/users/INVALID_ID');
    expect(res.statusCode).toEqual(500);
  });
});

// Ruta GET para obtener el número total de usuarios
describe('GET /users/get/count', () => {
  it('should return the total count of users', async () => {
    const res = await request(app).get('/users/get/count');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('userCount');
    expect(typeof res.body.userCount).toBe('number');
  });
});

// Ruta POST para agregar un nuevo usuario
describe('POST /users', () => {
  it('should add a new user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password',
      country: 'United States',
      profession: 'Developer',
      photoUser: 'path/to/photo.jpg',
      isAdmin: false
    };

    const res = await request(app).post('/users').send(newUser);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    // Realiza pruebas adicionales según lo necesites para verificar que el usuario se haya agregado correctamente
  });
});

// Ruta POST para el inicio de sesión de usuarios
describe('POST /users/login', () => {
  it('should log in a user', async () => {
    const userCredentials = {
      email: 'johndoe@example.com',
      password: 'password'
    };

    const res = await request(app).post('/users/login').send(userCredentials);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('token');
    // Realiza pruebas adicionales según lo necesites para verificar que el inicio de sesión sea exitoso
  });

  it('should return a 400 error if the user is not found', async () => {
    const userCredentials = {
      email: 'invaliduser@example.com',
      password: 'password'
    };

    const res = await request(app).post('/users/login').send(userCredentials);
    expect(res.statusCode).toEqual(400);
  });

  it('should return a 400 error if the password is incorrect', async () => {
    const userCredentials = {
      email: 'johndoe@example.com',
      password: 'incorrectpassword'
    };

    const res = await request(app).post('/users/login').send(userCredentials);
    expect(res.statusCode).toEqual(400);
  });
});

// Ruta POST para registrar nuevos usuarios
describe('POST /users/register', () => {
  it('should register a new user', async () => {
    const newUser = {
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      password: 'password',
      country: 'United States',
      profession: 'Designer',
      photoUser: 'path/to/photo.jpg',
      isAdmin: false
    };

    const res = await request(app).post('/users/register').send(newUser);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    // Realiza pruebas adicionales según lo necesites para verificar que el usuario se haya registrado correctamente
  });
});

// Ruta PUT para actualizar un usuario por ID
describe('PUT /users/:id', () => {
  it('should update a user by ID', async () => {
    const userId = 'USER_ID'; // Reemplaza con un ID válido existente en la base de datos
    const updatedUser = {
      name: 'Updated Name',
      email: 'updatedemail@example.com',
      phone: '123456789',
      country: 'Updated Country',
      profession: 'Updated Profession',
      photoUser: 'path/to/updatedphoto.jpg',
      isAdmin: true
    };

    const res = await request(app).put(`/users/${userId}`).send(updatedUser);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', userId);
  });

  it('should return a 404 error if the user is not found', async () => {
    const res = await request(app).put('/users/INVALID_ID');
    expect(res.statusCode).toEqual(404);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
