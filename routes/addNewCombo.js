var express = require('express');
var router = express.Router();
var addNewComboControllers = require("../controllers/addNewComboControllers");

router.post('/', addNewComboControllers.handlePostRequest);

router.get('/', addNewComboControllers.handleGetRequest);

module.exports = router;