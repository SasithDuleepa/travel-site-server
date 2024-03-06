const express = require('express');
const  path = require('path');

const upload = require('./../middleware/multer/tourCategory');
const AddTourCateggory = require('./../controllers/tour category/add_TourCategory.js')
const tourCategoryImg = require('./../controllers/tour category/tourCategory_img.js')
const GetTourCategories = require('./../controllers/tour category/get_tourCategory.js')
const TourCategory = require('./../controllers/tour category/tour_category.js')
const TourAccToCategoryId = require('./../controllers/tour category/tour_accto_categoryid.js')
const UpdateTourCategory = require('./../controllers/tour category/update.js')
const Delete = require('./../controllers/tour category/delete.js');
const TourCategorySearch = require('./../controllers/tour category/search.js');

const {AdminAuthenticate} = require('./../middleware/auth/admin_authenticate');

const router = express.Router();

router.use(express.static(path.join((__dirname, "uploads/tour_category"))));
router.get('/img',tourCategoryImg);


router.post('/add',upload.array('file'),AdminAuthenticate,AddTourCateggory);

router.get('/tourcategory/:id',TourCategory);

router.get('/tour/:id',TourAccToCategoryId);

router.put('/update/:id',upload.array('file'),AdminAuthenticate,UpdateTourCategory);

router.delete('/delete/:id',AdminAuthenticate,Delete);

router.get('/search/:category',TourCategorySearch);

router.get('/getall',GetTourCategories);
module.exports = router;