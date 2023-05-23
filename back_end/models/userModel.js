const mongoose = require('mongoose');

const Model = new mongoose.Schema({
 matricule: {
required: true,
type: String
},
etat: {
    required: true,
    type: String
    },
    
nom: {
required: true,
type: String
},

prenom: {
required: true,
type: String
}, 

email: {
    required: true,
    type: String
},

password:{
    required: true,
    type: String
}
,role: {
    required: true,
    type: String
}

})


module.exports = mongoose.model('users', Model);/* users nom de la collection */