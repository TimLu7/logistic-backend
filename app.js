const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

//connect to db
async function main() {
  dotenv.config();

  const uri =
    'mongodb+srv://tianyu:1234@cluster0.0bioyzs.mongodb.net/?retryWrites=true&w=majority';

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    console.log('Successfully connected to the database');
  } catch (e) {
    console.log('Could not connect to the database. Error...', e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

//use middleware
const app = express();

const port = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/ping', (req, res) => res.json({ message: 'Server is running!' }));

app.listen(port, () =>
  console.log(`Server running on ${port}, http://localhost:${port}`)
);

//app.use('/api', apiRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something is wrong!');
});
