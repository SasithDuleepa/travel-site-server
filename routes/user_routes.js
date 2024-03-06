
const express = require('express');

const Register = require('./../controllers/user/register');
const LogIn = require('./../controllers/user/login');
const UpdateMailPassword = require('./../controllers/user/updateMailPassword');
const UserAccToId = require('./../controllers/user/userAccToId');
const SaveUser = require('./../controllers/user/save_user');



const router = express.Router();

router.post('/add', Register);

router.post('/login', LogIn);

router.put('/update', UpdateMailPassword);

router.get('/:id', UserAccToId);

router.post('/save', SaveUser);

module.exports = router;