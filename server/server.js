const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db-connection.js');

const app = express();

const PORT = 5000;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route /api
app.get('/', (req, res) => {
  res.json({ message: 'Hello from My template ExpressJS' });
});

// create the get request
app.get('/api/species', cors(), async (req, res) => {
 
  try {
    const { rows: species } = await db.query('SELECT * FROM species');
    res.send(species);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

app.get('/api/sightings', cors(), async (req, res) => {
 
  try {
    const { rows: sightings } = await db.query('SELECT individuals.nick_name, sightings.date_time, sightings.healthy, sightings.location FROM individuals INNER JOIN sightings ON individuals.species_id=sightings.individual_id');
    res.send(sightings);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the POST request
app.post('/api/species', cors(), async (req, res) => {
  const newSpecies = { common_name: req.body.common_name, scientific_name: req.body.scientific_name, population: req.body.population, conservation_status: req.body.conservation_status }
  console.log([newSpecies.common_name, newSpecies.scientific_name]);
  const result = await db.query(
      'INSERT INTO species (common_name, scientific_name, population, conservation_status) VALUES($1, $2, $3, $4) RETURNING *',
      [newSpecies.common_name, newSpecies.scientific_name, newSpecies.population, newSpecies.conservation_status]
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});

app.delete('/api/species/:id', async (req, res) => {
  // : acts as a placeholder
  const speciesId = req.params.id;
  console.log(speciesId);
  try {
    await db.query('DELETE FROM species WHERE id=$1', [speciesId]);
    res.send({ status: "success" });
  } catch (e) {
    console.log(e)
    return res.status(400).json({ e });
  }
});



// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
