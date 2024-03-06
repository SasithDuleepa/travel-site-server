const express = require('express');
const  path = require('path');

const authenticateUser= require('../middleware/auth/user authenticate');

const upload = require('../middleware/multer/place');
const AddPlace =  require('./../controllers/place/add_place')
const Placeimg = require('./../controllers/place/place_img')
const AllPlace = require('./../controllers/place/get_Allplaces')
const AllPlaces_admin = require('./../controllers/place/admin_getall')
const PlaceSearch = require('./../controllers/place/place_search')
const GetPlace = require('./../controllers/place/get_place')
const GetPlaceImgNames = require('./../controllers/place/getPlace_img_names')
const UpdatePlace = require('./../controllers/place/updatePlace')
const Delete = require('./../controllers/place/Delete')
const AllPlacesPrioritized = require('./../controllers/place/all_places_odered')

const DeletePlace = require('./../controllers/place/delete_place')


const {AdminAuthenticate} = require('./../middleware/auth/admin_authenticate');



const router = express.Router();
router.use(express.static(path.join((__dirname, "uploads/places"))));

router.get('/placeimg', Placeimg);
router.post('/addplace',upload.fields([
                                        { name: 'cardImg', maxCount: 1 },
                                        { name: 'coverImgs', maxCount: 1 },
                                        { name: 'files', maxCount: 10 },
  ]),AdminAuthenticate, AddPlace);



router.get('/all',AllPlace);

router.get('/all_prioritized',AllPlacesPrioritized);

router.get('/all_admin',AllPlaces_admin);

router.get('/placesearch/:place',PlaceSearch);
router.get('/getplace/:place',GetPlace);
router.get('/getplaceimgnames/:place',GetPlaceImgNames);
router.put('/updateplace/:id',AdminAuthenticate,upload.fields([
  { name: 'newCardImg', maxCount: 1 },
  { name: 'newCoverImg', maxCount: 1 },
  { name: 'newImgs', maxCount: 10 }, // Adjust maxCount
]),UpdatePlace);  


router.delete('/deleteplace/:id',AdminAuthenticate,DeletePlace);
router.delete('/delete/:id',AdminAuthenticate, Delete)
module.exports = router;