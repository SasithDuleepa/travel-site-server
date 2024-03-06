const express = require('express');

const {GetAbout,UpdateAbout} = require('../controllers/descriptions/about');
const {GetSlider,UpdateSlider} = require('../controllers/descriptions/tp_slider');
const {GetTP,UpdateTP} = require('../controllers/descriptions/tour_package');
const {GetDTP,UpdateDTP} = require('../controllers/descriptions/daytour_package');
const {GetChairman,UpdateChairman} = require('../controllers/descriptions/chairman');
const {GetPopularPlaces,UpdatePopularPlaces} = require('../controllers/descriptions/popular_places');
 

const router = express.Router();

router.get('/about',GetAbout);
router.put('/about',UpdateAbout);

router.get('/slider',GetSlider);
router.put('/slider',UpdateSlider);

router.get('/tour_package',GetTP);
router.put('/tour_package',UpdateTP);

router.get('/daytour_package',GetDTP);
router.put('/daytour_package',UpdateDTP);


router.get('/chairman',GetChairman);
router.put('/chairman',UpdateChairman);

router.get('/popular_places',GetPopularPlaces);
router.put('/popular_places',UpdatePopularPlaces);



module.exports = router;