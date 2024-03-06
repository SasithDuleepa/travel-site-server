const express = require('express');

const AddAgent = require('../controllers/agents/add_agent');
const SearchAgent = require('../controllers/agents/search_agent');
const GetAgent = require('../controllers/agents/agent');
const Update = require('../controllers/agents/update');
const DeleteAgent = require('../controllers/agents/delete_agent');
const AllAgents = require('../controllers/agents/all_agents');


const router = express.Router();

router.post('/add', AddAgent);

router.get('/search/:name', SearchAgent);

router.get('/:id', GetAgent);

router.put('/:id', Update);

router.delete('/:id', DeleteAgent);

router.get('/', AllAgents);

module.exports = router;