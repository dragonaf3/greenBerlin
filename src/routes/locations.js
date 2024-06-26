let express = require('express');
let router = express.Router();
const mongoCRUDs = require('../db/mongoCRUDs');

router.post('/', async function(req, res) {
  try {
    const newLocationId = await mongoCRUDs.createLocation(req.body);
    res.status(201).set('Location', `/loc/${newLocationId}`).send();
  } catch (err) {
    res.status(500).send('Error inserting location');
  }
});

router.get('/', async function(req, res) {
  try {
    const locations = await mongoCRUDs.getAllLocations();
    res.status(200).json(locations);
  } catch (err) {
    res.status(500).send('Error fetching locations');
  }
});

router.get('/:id', async function(req, res) {
  try {
    const location = await mongoCRUDs.getLocationById(req.params.id);
    if (location) res.status(200).json(location);
    else res.status(404).send('Location not found');
  } catch (err) {
    res.status(500).send('Error fetching location');
  }
});

router.put('/:id', async function(req, res) {
  try {
    const updatedCount = await mongoCRUDs.updateLocation(req.params.id, req.body);
    if (updatedCount > 0) res.status(204).send();
    else res.status(404).send('Location not found');
  } catch (err) {
    res.status(500).send('Error updating location');
  }
});

router.delete('/:id', async function(req, res) {
  try {
    const deletedCount = await mongoCRUDs.deleteLocation(req.params.id);
    if (deletedCount > 0) res.status(204).send();
    else res.status(404).send('Location not found');
  } catch (err) {
    res.status(500).send('Error deleting location');
  }
});

module.exports = router;
