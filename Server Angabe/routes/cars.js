const express = require('express');
const {
  getCars,
  deleteCar,
  changeStatus,
  addCar,
} = require('../controllers/cars');

const router = express.Router();

// Routes
router.get('/cars', getCars);
router.patch('/cars/:id', changeStatus);
router.delete('/cars/:id', deleteCar);
router.post('/cars', addCar);

module.exports = router;
