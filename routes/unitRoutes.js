
const express = require('express');
const router = express.Router();
const unitController = require('../controllers/unitController');
const verifyToken = require('../middleware/authMiddlewere');

router.post('/new_unit', unitController.createUnit);
router.get('/get_unit', verifyToken, unitController.getAllUnits);
router.get('/get_unit/:id', unitController.getUnitById);
router.put('/update_unit/:id', unitController.updateUnit);
router.delete('/remove_unit/:id', unitController.deleteUnit);

module.exports = router;



