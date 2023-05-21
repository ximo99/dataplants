const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");

const speciesRouter = require("../routers/species");

const app = express();
app.use(express.json());
app.use("/api/species", speciesRouter);

beforeAll(async () => {
  await mongoose.connect(
    "mongodb+srv://user1:FEAFZknFsDRNwraB@cluster0.38oyb7r.mongodb.net/dataplants-db",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
});

// test for GET all species
describe('GET /species', () => {
  it('should return a list of species', async () => {
    const res = await request(app).get('/species');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0); // assuming some species are in the DB
  });
});

// test for GET specie by ID
describe('GET /species/:id', () => {
  it('should return a specie if a correct id is provided', async () => {
    // assuming this id exists in the DB
    const specieId = 'SPECIE_ID';
    const res = await request(app).get(`/species/${specieId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', specieId);
  });

  it('should return a 500 error if the id does not exist', async () => {
    const res = await request(app).get('/species/NON_EXISTING_ID');
    expect(res.statusCode).toEqual(500);
  });
});

// Ruta GET para obtener especies verificadas
describe('GET /species/get/verified', () => {
  it('should return a list of verified species', async () => {
    const res = await request(app).get('/species/get/verified');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// Ruta POST para agregar una nueva especie
describe('POST /species', () => {
  it('should add a new specie', async () => {
    const newSpecie = {
      scientific_name: 'Scientific Name',
      common_name: 'Common Name',
      description: 'Description',
      category: 'Category ID',
      user: 'User ID',
      division: 'Division',
      family: 'Family',
      gender: 'Gender',
      state_conservation: 'State Conservation',
      isVerified: true
    };

    const res = await request(app)
      .post('/species')
      .attach('image', 'path/to/image.jpg') // Agrega la ruta correcta de la imagen
      .field(newSpecie);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    // Realiza pruebas adicionales según lo necesites para verificar que la especie se haya agregado correctamente
  });
});

// Ruta PUT para actualizar una especie por ID
describe('PUT /species/:id', () => {
  it('should update a specie by ID', async () => {
    const specieId = 'SPECIE_ID'; // Reemplaza con un ID válido existente en la base de datos
    const updatedSpecie = {
      scientific_name: 'Updated Scientific Name',
      common_name: 'Updated Common Name',
      description: 'Updated Description',
      division: 'Updated Division',
      family: 'Updated Family',
      gender: 'Updated Gender',
      state_conservation: 'Updated State Conservation',
      isVerified: false
    };

    const res = await request(app)
      .put(`/species/${specieId}`)
      .send(updatedSpecie);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', specieId);
    // Realiza pruebas adicionales según lo necesites para verificar que la especie se haya actualizado correctamente
  });

  it('should return a 400 error if the ID is invalid', async () => {
    const res = await request(app).put('/species/INVALID_ID');
    expect(res.statusCode).toEqual(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
