// src/routes/api/index.js
const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const municipiosRoutes = require('./municipios');

router.use('/user', userRoutes);
router.use('/municipios', municipiosRoutes);

module.exports = router;