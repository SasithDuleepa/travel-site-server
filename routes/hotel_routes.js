const express = require('express');

const AddHotels = require('../controllers/hotels/addHotels');
const {GetHotels, GetLuxuryHotels, GetSemiluxuryHotels} = require('../controllers/hotels/get_hotels');
const HotelPrices = require('../controllers/hotels/get_hotelPrices');
const PriceAccToHotelAndDate = require('../controllers/hotels/price_accto_hotel_date');

const PriceAcctoLuxury = require('../controllers/hotels/price_accto_luxury');
const GetAll = require('../controllers/hotels/getAllHotels');

const PriceAcctoSemiLuxury = require('../controllers/hotels/price_accto_semi');
const SearchHotel = require('../controllers/hotels/searchHotel');
const GetHotelAndPrice = require('../controllers/hotels/get_hotelandprice');
const UpdateHotels = require('../controllers/hotels/update_hotels');
const DeleteHotels = require('../controllers/hotels/delete_hotel');

const GetHotelAcctoId = require('../controllers/hotels/hotel_accto_id');

const GetReportHotels = require('../controllers/hotels/reportHotel');

const {AdminAuthenticate} = require('./../middleware/auth/admin_authenticate');

const router = express.Router();


router.post('/add', AdminAuthenticate,AddHotels);
router.get('/hotels', GetHotels);
router.get('/luxury', GetLuxuryHotels);
router.get('/semi', GetSemiluxuryHotels);

router.get('/prices/:id', HotelPrices);
router.get('/price/:id/:date', PriceAccToHotelAndDate);    

router.get('/luxury/price/:id/:date', PriceAcctoLuxury);

router.get('/semi/price/:id/:date', PriceAcctoSemiLuxury);

router.get('/search/:hotel', SearchHotel);
router.get('/hotel/:id',GetHotelAndPrice);

router.put('/update/:id',UpdateHotels);

router.delete('/delete/:id', DeleteHotels);

router.get('/hotel/hotel/:id', GetHotelAcctoId);


router.get('/report', GetReportHotels);


router.get('/all', GetAll);
module.exports = router;