const express = require('express');
const  path = require('path');


const upload = require('../middleware/multer/dayTour');
const AddDayTour = require('../controllers/day tour/add_dayTour');
const DayTourImg =  require('../controllers/day tour/day_tour_img');
const DayTour = require('../controllers/day tour/day_tours');
const DayTourAccToId = require('../controllers/day tour/daytour_id');
const DayTourPlaces = require('../controllers/day tour/daytour_places');
const DayTourUpdate = require('../controllers/day tour/update_daytour');
const DaytourPlaces = require('../controllers/day tour/daytourPlaces');
const DayTourSearch = require('../controllers/day tour/day_tour_search')

const Delete = require('../controllers/day tour/delete_daytour');


const {AdminAuthenticate} = require('./../middleware/auth/admin_authenticate');


const router = express.Router();
router.use(express.static(path.join((__dirname, "uploads/day_tour"))));

router.post('/add', upload.fields([
    { name: 'coverImg', maxCount: 1 },
    { name: 'homeImage', maxCount: 1 },
    { name: 'file', maxCount: 10 },
]),AdminAuthenticate, AddDayTour);
router.get('/daytourimg', DayTourImg);
router.get('/daytours', DayTour);
router.get('/daytour/:id', DayTourAccToId);
router.get('/places/:id', DayTourPlaces);
router.put('/update/:id', upload.fields([
    { name: 'coverImg', maxCount: 1 },
    { name: 'file', maxCount: 10 },
    { name: 'homeImg', maxCount: 1 },
]),AdminAuthenticate, DayTourUpdate);
router.get('/place/:id', DaytourPlaces);

router.delete('/delete/:id',AdminAuthenticate, Delete);


router.get('/search/:tour',DayTourSearch)

module.exports = router;