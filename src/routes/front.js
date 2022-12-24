const express = require('express');
const router = express.Router();
const frontController = require('../controllers/frontController');

//Rutas
router.get('/', frontController.home);
router.get('/favoritas', frontController.favoritas);
router.get('/formulario', frontController.formulario);



module.exports = router;