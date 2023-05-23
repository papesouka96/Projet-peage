const mongoose = require('mongoose');

const Payement = new mongoose.Schema({
Categorie: {
type: String
},
Matricule: {
type: String
},
Montant: {
    type: String
    },
Date: {
type: String
},

    Poste: {
        type: String
        },
        Rfid: {
            type: String
            }

})


module.exports = mongoose.model('payement', Payement);/* users nom de la collection */