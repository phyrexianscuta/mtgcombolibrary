var JSONDB = require('updateJSONDB');
var fs = require('fs');
var mtg = require('mtgsdk');
var url = require('url');

function createResponse(res){
	fs.readFile("\public/FileWithNames.json" ,'utf8',function(err,data){
		if (err) throw err;
		var obj = JSON.parse(data);
		res.render('addNewCombo', {title:"MTG Combo Library", cards: obj, numeroCartas: obj.length})
	});
}

function addCardOption(res){
	fs.readFile('\public/htmlSelectOption.txt','utf8',function(err,data){
		res.send(data.toString());
	});
}

exports.handleGetRequest = function(req, res, next) {
	if(req.method==="GET" && url.parse(req.url).query != null && decodeURI(url.parse(req.url).query).slice(0,10)==="getPicture"){
		var pictureRequestArray=[];	
		var name = decodeURI(url.parse(req.url).query).slice(11);
		mtg.card.all({ name: name}).on('data',function(card){
			pictureRequestArray.push(card.imageUrl);
		});
		mtg.card.all({ name: name}).on('end',function(done){
			res.send(pictureRequestArray[pictureRequestArray.length -1]);
		});
	}
	else if(req.method==="GET" && url.parse(req.url).query != null && decodeURI(url.parse(req.url).query) ==="addCard"){
		addCardOption(res);
		console.log("respuesta enviada");
	}
	else{
		JSONDB.checkUpdate(createResponse,res);
	}
}

exports.handlePostRequest = function(req, res, next) {
	if(req.method==="POST"){
			console.log("--------POST request--------");
	}
}