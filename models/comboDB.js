var mongoose = require('mongoose') ;
mongoose.connect('mongodb://wernerbusch:91789a87h@ds115340.mlab.com:15340/wernercito');
mongoose.Promise = global.Promise;

var Combo = require('../models/comboModel')
var Card = require('../models/cardModel')

var PanderBurst = new Combo({
	name:"PanderBurst",
	type:'lethal damage'
})

PanderBurst.save(function(err){
	if (err) console.log( err)
		
	var SaprolingBurst = new Card({
		name: "Saproling Burst", 
		colour:["G"],
		combos : PanderBurst._id
	})

	var Pandemonium = new Card({
		name: "Pandemonium",
		colour:["R"],
		combos : PanderBurst._id
	})
	
	SaprolingBurst.save(function(err){
		if (err) console.log( err)
			console.log("listo Saproling Burst...");
		});
	
	Pandemonium.save(function(err){
		if (err) console.log( err)
			console.log("listo Pandemonium...");
			mongoose.connection.close();
		})
});