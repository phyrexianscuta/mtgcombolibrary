var mongoose = require('mongoose') ;
mongoose.connect('mongodb://wernerbusch:91789a87h@ds115340.mlab.com:15340/wernercito');
mongoose.Promise = global.Promise;

var Combo = require('../models/comboModel')
var Card = require('../models/cardModel')

populating();	

function populating(){
	Card.find().populate({path:'combos', select:'name -_id'}).exec(function(e,c){
		console.log(c);
		searchForCardsWithCombo();
	})
}

function searchForCardsWithCombo(){
	Card.findOne({name:'Saproling Burst'}).exec(
		function(err,result){
		console.log("result.card.name: "+ result.name)
		console.log(result)
		});
	Card.find({ combos: {name:'PanderBurst'} }).exec(function(err,result){
		console.log("PanderBurst is composed with: ");
		console.log(result)
			
	})
}