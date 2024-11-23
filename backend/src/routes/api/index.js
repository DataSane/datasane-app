// src/routes/api/index.js
const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const municipiosRoutes = require('./municipios');
const dashboardRoutes = require('./dashboard');

router.use('/user', userRoutes);
router.use('/municipios', municipiosRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;