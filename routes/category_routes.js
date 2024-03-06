const express = require('express');
const  path = require('path');

const upload = require('../middleware/multer/category');
const AddCategory = require('../controllers/category/add_category');
const categoryimg = require('../controllers/category/category_img')
const AllCategories = require('../controllers/category/all_categories');

const router = express.Router();
router.use(express.static(path.join((__dirname, "uploads/category"))));

router.post('/add',upload.array('file'), AddCategory);
router.get('/categoryimg', categoryimg);
router.get('/allcategories', AllCategories);

module.exports = router;