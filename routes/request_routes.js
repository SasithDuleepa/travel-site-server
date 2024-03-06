const express = require('express');

const AddRequest = require('../controllers/request/add_request');
const PendingRequsts = require('../controllers/request/pending_requests');
const RequestUpdate = require('../controllers/request/update_request');

const PendingHandle = require('../controllers/request/pendingContactusRequests');


const router = express.Router();


router.post('/add', AddRequest);

router.get('/pending', PendingRequsts);

router.post('/update/:id', RequestUpdate);

router.post('/pendingHandle/:id', PendingHandle);

module.exports = router;