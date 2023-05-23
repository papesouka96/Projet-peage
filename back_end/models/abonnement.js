const mongoose = require('mongoose');

const Abonnement = new mongoose.Schema({
/* matricule: {
required: false,
type: String
},*/
rfid: {
    required: true,
    type: String
    },
solde: {
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
                matricule: {
                    required: true,
                    type: String
                    },
                    categorie: {
                        required: true,
                        type: String
                        },
                        etat: {
                            required: true,
                            type: String
                            },









})


module.exports = mongoose.model('abonnement', Abonnement);/* users nom de la collection */