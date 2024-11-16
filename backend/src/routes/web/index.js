// src/routes/web/index.js
const express = require('express');
const router = express.Router();

const loginRoutes = require('./login');
const dashboardRoutes = require('./dashboard');
const analistasRoutes = require('./analistas');
const municipiosRoutes = require('./municipios');
const relatoriosRoutes = require('./relatorios');
const alertasRoutes = require('./alertas');

router.use('/', loginRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/analistas', analistasRoutes);
router.use('/municipios', municipiosRoutes);
router.use('/relatorios', relatoriosRoutes);
router.use('/alertas', alertasRoutes);

module.exports = router;