var express = require('express');
var router = express.Router();
var indexControllers = require("../controllers/indexControllers");

router.post('/', indexControllers.handlePostRequest);

router.get('/', indexControllers.handleGetRequest)

module.exports = router;