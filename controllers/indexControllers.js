var fs = require('fs');
var mtg = require('mtgsdk');
var url = require('url');

exports.handleGetRequest = function(req, res, next) {
	
	res.render('index');
	
}

exports.handlePostRequest = function(req, res, next) {
	
	res.render('index');
	
}