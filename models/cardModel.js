var mongoose = require('mongoose') ;
mongoose.connect('mongodb://wernerbusch:91789a87h@ds115340.mlab.com:15340/wernercito');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var cardSchema = new Schema({
	name: String,
	colour:["U","R","B","W","G","C"],
	combos: [{type:Schema.Types.ObjectId, ref: 'Combo'}]
})


module.exports = mongoose.model("Card",cardSchema);
 