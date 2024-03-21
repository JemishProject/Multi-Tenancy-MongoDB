const express = require('express');
const { addEmployee, getEmployee } = require('../controller/employee.controller');
const route = express.Router();

route.post("/add", addEmployee);
route.get("/get", getEmployee);

module.exports = route;