const express = require('express');


const AddCode = require('../controllers/promote code/add_code');
const AllCode = require('../controllers/promote code/all_code');
const SearchCode = require('../controllers/promote code/search_code');
const CodeData = require('../controllers/promote code/get_code_acc_id');
const UpdateCode = require('../controllers/promote code/update_code');
const DeleteCode = require('../controllers/promote code/delete_code');
const CodeDiscount = require('../controllers/promote code/discount');


const router = express.Router();

router.post('/add_code', AddCode);

router.get('/all_code', AllCode);

router.get('/search/:code', SearchCode);

router.get('/code_data/:code', CodeData);

router.put('/update_code/:codeId', UpdateCode);

router.delete('/delete_code/:codeId', DeleteCode);

router.get('/discount/:code', CodeDiscount);
module.exports = router;