const express = require('express');
const  path = require('path');

const upload = require('../middleware/multer/tour');

const AddTourCategory = require('../controllers/tours/add_tours');

const ToursSearch= require('../controllers/tours/tours_search');
const GetToursAccToId = require('../controllers/tours/tour_acc_Id')
const GetTourCategoryAccToId =  require('../controllers/tours/tourcategory_acc_id')
const ToursAccToTourCategory =require('../controllers/tours/tours_acc_tourcategory')


const ToursAccToId = require('../controllers/tours/tour_tour_id')
const GetTourDays = require('../controllers/tours/tour_days')

const TourPlacesAccToDateId = require('../controllers/tours/tour_places')

const Places = require('./../controllers/tours/places')

const TourPlaces = require('./../controllers/tours/tour_places_accto_day')

const TourImg = require('./../controllers/tours/tour_img')

const TourUpdate = require('./../controllers/tours/tour_update')

const DeleteTour = require('./../controllers/tours/delete_tour')

const {AdminAuthenticate} = require('./../middleware/auth/admin_authenticate');


const router = express.Router();
router.use(express.static(path.join((__dirname, "uploads/tour"))));

// router.post('/addTourCategory',upload.array('file',10),AdminAuthenticate, AddTourCategory);

router.post('/addTourCategory',upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'file', maxCount: 10 },
]),AdminAuthenticate, AddTourCategory);

router.get('/toursSearch/:tour',ToursSearch);    
router.get('/tour/:tour', GetToursAccToId)

router.get('/tour/tour/:tour', ToursAccToId)
router.get('/tourcategory/:tourcategory', GetTourCategoryAccToId)


router.get('/tours/:tourcategory',ToursAccToTourCategory)


router.get('/tourdays/:tourid',GetTourDays)

router.get('/tourplaces/:tourdateid',TourPlacesAccToDateId)

router.get('/places/:tourId',Places)

router.get('/tour_places/:tourdateid',TourPlaces)

router.get('/tourimg',TourImg)

router.put('/tourupdate/:id',upload.fields([
    { name: 'new_image', maxCount: 1 },
    { name: 'new_cover_image', maxCount: 1 },
]),AdminAuthenticate,TourUpdate)

router.delete('/tourdelete/:id',AdminAuthenticate,DeleteTour)



module.exports = router;