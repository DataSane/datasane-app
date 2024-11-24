// src/routes/api/index.js
const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const municipiosRoutes = require('./municipios');
const dashboardRoutes = require('./dashboard');
const alertasRoutes = require('./alertasRoute');
const comentariosRoutes = require('./comentariosRoutes');

router.use('/user', userRoutes);
router.use('/municipios', municipiosRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/alertas', alertasRoutes);
router.use('/comentarios', comentariosRoutes);

module.exports = router;