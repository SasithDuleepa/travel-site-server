const express = require('express');

const BookDayTour = require('../controllers/day tour book/dayTourBook');
const PendingDayTours = require('../controllers/day tour book/pendingDayTours');
const GetDayTours = require('../controllers/day tour book/getDayTours');

const BookTour = require('../controllers/tour book/tourBook');
const PendingTours = require('../controllers/tour book/pendingTours');
const GetTours = require('../controllers/tour book/getTours');
const ToursAccToAgent = require('../controllers/tour book/toursAccToAgent');
const ToursAccToCode  = require('../controllers/tour book/toursAccToCode');

const {AdminAuthenticate} = require('./../middleware/auth/admin_authenticate');

const router = express.Router();

router.get('/getDayTours', GetDayTours);
router.post('/bookDayTour', BookDayTour);
router.get('/pendingDayTours/:id', PendingDayTours);

router.get('/getTours', GetTours);
router.post('/bookTour', BookTour);
router.get('/pendingTours/:id', PendingTours);
router.get('/toursAccToAgent/:id', ToursAccToAgent);
router.get('/toursAccToCode/:id', ToursAccToCode);

module.exports = router;