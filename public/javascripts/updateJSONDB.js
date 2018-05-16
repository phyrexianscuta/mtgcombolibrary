var https = require('https');
var fs = require('fs');
var url = require('url');
var request = require('request');
var decompress = require('decompress');
var urlVersion = "https://mtgjson.com/json/version.json";
var fileURL = "https://mtgjson.com/json/AllCards-x.json.zip";

function update(callback,response){
	request({url: "https://mtgjson.com/json/AllCards-x.json.zip", encoding: null},function(err,resp,body){
		if(err) throw err;
		console.log("unziping:");
		decompress(body, '\public' ).then(function(files){
			console.log("done!")
			updateListWithNames(callback,response);
		});
	})
}
function updateListWithNames(callback,response){
	fs.readFile("\public/AllCards-x.json" ,'utf8',function(err,data){
		console.log("Creating list of cards...");
		if (err) throw err;
		var listCards = [];
		var obj = JSON.parse(data);
		for(var x in obj){
			if( obj[x].type != "Scheme" && obj[x].printings.indexOf("UST") ==-1 && obj[x].printings.indexOf("UNH") ==-1 && obj[x].printings.indexOf("UGL") ==-1 && obj[x].printings.indexOf("VAN") ==-1 ){
				listCards.push(x);
			}
		}
		listCards.sort();
		var json = JSON.stringify(listCards);
		fs.writeFile('\public/FileWithNames.json', json,function(err){
			console.log("list created!");
			updateHTMLSelectOption(callback,response);
		});
	});
}

function updateHTMLSelectOption(callback,response){
	fs.readFile("\public/FileWithNames.json" ,'utf8',function(err,data){
		var obj = JSON.parse(data);
		var string = "<select>";
		for (var i=0; i< obj.length; i++) {
			string += "<option name='"+obj[i]+"'>"+obj[i] + "</option>"
		}		
		string += "</select>";
		fs.writeFile('\public/htmlSelectOption.txt',string,function(err){
			callback(response);
		});
	});
}

function checkIfUpdateIsNeeded(callback,response,data){
	fs.readFile('\public/currentVersion.txt',function(err,getCurrentVersionFile){
		var currentVersion = getCurrentVersionFile.toString();
		var version = JSON.parse(data).toString();
		console.log("version retrieved: "+version);
		console.log("version installed: "+currentVersion);
		if(version != currentVersion){
			console.log("new version... UPDATING");
			fs.writeFile('\public/currentVersion.txt', version, function(err) {
				if (err) throw err;
				console.log('The file has been updated.');
			});
			update(callback,response);
		}
		else{
			console.log("no Update needed");
			callback(response);
		}
	})
}

module.exports = {
	checkUpdate: function(callback,response){
		https.get(urlVersion,function(res){
			res.setEncoding('utf8');
			res.on('data', function (data) {
				checkIfUpdateIsNeeded(callback,response,data);
			});
		});
	}
}