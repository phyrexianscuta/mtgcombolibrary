var mongoose = require('mongoose') ;
mongoose.connect('mongodb://wernerbusch:91789a87h@ds115340.mlab.com:15340/wernercito');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var comboSchema = new Schema({
	name : String,
	cards : [{type: Schema.Types.ObjectId, ref:'Card'}],
	type : ["infinite mana", "infinite damage", "draw library", "lethal damage", "storm", "graveyard"]
});

module.exports = mongoose.model("Combo",comboSchema);