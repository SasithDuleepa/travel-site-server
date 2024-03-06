const express = require('express');

const {EditeTourRate,GetTourRate} = require('../controllers/data/tour_rate');
const {EditeDayTourRate,GetDayTourRate} = require('../controllers/data/daytour_rate'); 

const {EditeDayTourDiscountRate,GetDayTourDiscountRate} = require('../controllers/data/daytour_dicount_rate')




const router = express.Router();


router.post('/tour', EditeTourRate);
router.get('/tour', GetTourRate);

router.post('/daytour', EditeDayTourRate);
router.get('/daytour', GetDayTourRate);

router.post('/daytour_discount', EditeDayTourDiscountRate);
router.get('/daytour_discount', GetDayTourDiscountRate);




module.exports = router;