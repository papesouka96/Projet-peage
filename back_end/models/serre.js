const mongoose = require('mongoose');

const Serre = new mongoose.Schema({
/* matricule: {
required: false,
type: String
},*/
temperature: {

type: String
},

humidite_sol: {

type: String
}, 

humidite_serre: {
    type: String
},




})


module.exports = mongoose.model('serre', Serre);/* users nom de la collection */