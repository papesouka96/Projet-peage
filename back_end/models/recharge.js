const mongoose = require('mongoose');

const Recharge = new mongoose.Schema({
/* matricule: {
required: false,
type: String
},*/
rfid: {
    required: true,
    type: String
    },
montant: {
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
                date: {
                    required: true,
                    type: String
                    },
                    









})


module.exports = mongoose.model('rechargement', Recharge);/* users nom de la collection */