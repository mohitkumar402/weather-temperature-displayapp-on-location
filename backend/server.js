const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const City = require('./models/city');  // Import model only once

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/weatherApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/saveCity', async (req, res) => {
  try {
    const { city, temp, description, icon } = req.body;
    const newCity = new City({ city, temp, description, icon });
    await newCity.save();
    res.status(201).send('City saved!');
  } catch (error) {
    res.status(500).send('Error saving city.');
  }
});

app.get('/getHistory', async (req, res) => {
  try {
    const cities = await City.find().sort({ _id: -1 }).limit(10);
    res.json(cities);
  } catch (error) {
    res.status(500).send('Error fetching cities');
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
