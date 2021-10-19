const asyncHandler = require('express-async-handler');
const cm = require('../model/cars.js');

const getCars = asyncHandler(async (req, res) => {
  const { code, data } = await cm.getCars();
  res.status(code).json(data);
});

const changeStatus = asyncHandler(async (req, res) => {
  const { code, data } = await cm.changeStatus();
  res.status(code).json(data);
});

const deleteCar = asyncHandler(async (req, res) => {
  const { code, data } = await cm.deleteCar();
  res.status(code).json(data);
});

const addCar = asyncHandler(async (req, res) => {
  const { code, data } = await cm.addCar();
  res.status(code).json(data);
});

module.exports = { getCars, changeStatus, deleteCar, addCar };
