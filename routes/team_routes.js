const express = require('express');


const upload = require('../middleware/multer/team');
const AddTeam = require('../controllers/team/add_team_members');
const GetTeamMembers = require('../controllers/team/get_team_members');
const UpdateTeam = require('../controllers/team/update_team_members');
const Image = require('../controllers/team/get_team_img');
const DeleteMember = require('../controllers/team/delete_team_member');



const router = express.Router();

router.post('/add', upload.single('image'), AddTeam);

router.get('/get', GetTeamMembers);

router.put('/update/:id',upload.single('image'),  UpdateTeam);

router.get('/image/:id', Image);

router.delete('/delete/:id', DeleteMember);
module.exports = router;