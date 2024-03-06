const express = require('express');

const GetVehicleAccToPassengers = require('./../controllers/vehicles/veicle_acct-_passengers')
const AllVehicles = require('./../controllers/vehicles/getVehicles')
const Update = require('./../controllers/vehicles/updateVehicle')
const Delete = require('./../controllers/vehicles/deleteVehicle')

const Add = require('./../controllers/vehicles/addVehicle')

const {AdminAuthenticate} = require('./../middleware/auth/admin_authenticate');

const router = express.Router();

router.post('/add',AdminAuthenticate, Add);

router.get('/all', AllVehicles);
router.get('/:id', GetVehicleAccToPassengers);
router.put('/update/:id',AdminAuthenticate, Update);
router.delete('/delete/:id',AdminAuthenticate, Delete);

module.exports = router;