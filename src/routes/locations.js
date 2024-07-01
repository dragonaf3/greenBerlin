let express = require('express');
let router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoCRUDs = require('../db/mongoCRUDs');
const fs = require('fs')

// Multer Setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // Appending extension
    }
});

const upload = multer({storage: storage});

router.post('/', upload.single('image'), async function (req, res) {
    try {
        const newLocation = req.body;
        if (req.file) {
            newLocation.image = '/uploads/' + req.file.filename;
        }
        const newLocationId = await mongoCRUDs.createLocation(newLocation);
        res.status(201).set('Location', `/loc/${newLocationId}`).send();
    } catch (err) {
        res.status(500).send('Error inserting location');
    }
});

router.get('/', async function (req, res) {
    try {
        const locations = await mongoCRUDs.getAllLocations();
        res.status(200).json(locations);
    } catch (err) {
        res.status(500).send('Error fetching locations');
    }
});

router.get('/:id', async function (req, res) {
    try {
        const location = await mongoCRUDs.getLocationById(req.params.id);
        if (location) res.status(200).json(location);
        else res.status(404).send('Location not found');
    } catch (err) {
        res.status(500).send('Error fetching location');
    }
});

router.put('/:id', upload.single('image'), async function (req, res) {
    try {
        const updatedLocation = req.body;
        const existingLocation = await mongoCRUDs.getLocationById(req.params.id);

        if (existingLocation) {
            if (req.file) {
                // Delete the old image file if a new one is uploaded
                if (existingLocation.image) {
                    const oldImagePath = path.join(__dirname, '../../public', existingLocation.image);
                    console.log('Trying to delete old image file at:', oldImagePath);
                    fs.access(oldImagePath, fs.constants.F_OK, (err) => {
                        if (!err) {
                            fs.unlink(oldImagePath, (err) => {
                                if (err) {
                                    console.error('Failed to delete old image file:', err);
                                } else {
                                    console.log('Successfully deleted old image file:', oldImagePath);
                                }
                            });
                        } else {
                            console.error('Old image file does not exist:', oldImagePath);
                        }
                    });
                }
                updatedLocation.image = '/uploads/' + req.file.filename;
            } else {
                // Keep the old image if no new one is uploaded
                updatedLocation.image = existingLocation.image;
            }

            const updatedCount = await mongoCRUDs.updateLocation(req.params.id, updatedLocation);
            if (updatedCount > 0) res.status(204).send();
            else res.status(404).send('Location not found');
        } else {
            res.status(404).send('Location not found');
        }
    } catch (err) {
        res.status(500).send('Error updating location');
    }
});

router.delete('/:id', async function (req, res) {
    try {
        const location = await mongoCRUDs.getLocationById(req.params.id);
        if (location) {
            // Delete the image file if it exists
            if (location.image) {
                const imagePath = path.join(__dirname, '../../public', location.image);
                console.log('Trying to delete image file at:', imagePath);
                fs.access(imagePath, fs.constants.F_OK, (err) => {
                    if (!err) {
                        fs.unlink(imagePath, (err) => {
                            if (err) {
                                console.error('Failed to delete image file:', err);
                            } else {
                                console.log('Successfully deleted image file:', imagePath);
                            }
                        });
                    } else {
                        console.error('Image file does not exist:', imagePath);
                    }
                });
            }
            const deletedCount = await mongoCRUDs.deleteLocation(req.params.id);
            if (deletedCount > 0) {
                res.status(204).send();
            } else {
                res.status(404).send('Location not found');
            }
        } else {
            res.status(404).send('Location not found');
        }
    } catch (err) {
        res.status(500).send('Error deleting location');
    }
});

module.exports = router;
