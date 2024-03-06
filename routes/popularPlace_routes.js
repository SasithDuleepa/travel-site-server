const express = require('express');

const GetPopularPlace = require('./../controllers/popular place/popular_place')
const Update = require('./../controllers/popular place/update')
const AddPopularPlace = require('./../controllers/popular place/add')

const {AdminAuthenticate} = require('./../middleware/auth/admin_authenticate');

const router = express.Router();

router.get('/place', GetPopularPlace)

router.post('/update',AdminAuthenticate, Update)

router.post('/add',AdminAuthenticate, AddPopularPlace)

module.exports = router;