const express = require('express');/* recupere la variable express dans la boite express */
const mongoose  = require('mongoose'); //gere link api base de donnees
const Model = require('../back_end/models/userModel');
const jwt = require("jsonwebtoken");
require('dotenv').config();/* pour recuperer le fichier env */
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors') //configuration des differentes requettes pour acceder aux ressources
/*  const Model = require('../back_end/models/userModel'); */
/*  const jwt = require("jsonwebtoken"); */
const routes = require('./routes/routes');

const databaseLink = process.env.DATABASE_URL/* permet de recuperer le lien de la base de donnée */

mongoose.connect(databaseLink);/* permet d'avoir access à la base mongodb */
const database = mongoose.connection

const app = express(); /* express sert a ecouté les ports et à envoyer des données */

app.use(cors({origin:'*'}));/*   */

app.use(express.json());/* affiche les fichiers au format json */

app.use('/api', routes);

database.on('error', (error)=> {

console.log(error)

})

//Creation server socket 
const http = require('http').Server(app);

const io = require('socket.io')(http);

database.once('connected', ()=> {
    
console.log('Database Connected')

})

var fs = require('fs');
/* var index = fs.readFileSync( '/'); */

const { SerialPort } = require('serialport');
var { ReadlineParser } = require("@serialport/parser-readline")
const router = require('./routes/routes');
 const { Socket } = require('socket.io');
 const parser = SerialPort.parsers;  
var path = require('path'); 
const { log } = require('console');




 var port = new SerialPort({ path:'/dev/ttyACM0',
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});   

 
io.on('connection', function(socket) {
    
     console.log('Node is listening to port'); 
   socket.on("active", (arg) => {
        // console.log(arg); // world
        temoin = arg;
      });
    
      socket.on('optionA', () =>{
      port.write("1")
      });
         
      socket.on('optionB', () =>{
        port.write("2")
        });
           
      socket.on('ventilOn', () =>{
        port.write('3')
      //  console.log("venhhhhtilon");
        })
        socket.on('ventilOff', () =>{
          port.write("4")
        //  console.log("ventiloff");
          })
                   
      socket.on('toitureOn', () =>{
        port.write("5")
        })

        socket.on('toitureOff', () =>{
          port.write("6")
          })

          socket.on('porteOn', () =>{
            port.write("7")
            })
            socket.on('porteOff', () =>{
              port.write("8")
              })
              socket.on('arrosageOn', () =>{
                port.write("9")
                })
                socket.on('arrosageOff', () =>{
                  port.write("0")
                  })    
});
/* parser.on('data', async function (data){
    //console.log(data);
        if (data) {
            let rfid  = data.split("/")[0];
        
        let existingrfid;
      // console.log(rfid);
        existingrfid = await Model.findOne({ rfid: rfid});
       // console.log(existingrfid)
        if(!existingrfid){
        //  return res.status(401).send("user est archivé...!");
        return;
        }
        let token;
       
          //Creating jwt token
          token = jwt.sign(
            { userId: existingrfid.id,rfid: existingrfid.rfid },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
    io.emit('error', {code: 400, message: 'une erreur est survenue réessayer'})
    io.emit('rfid',{
        success: true,
        data: {
          email: existingrfid.email,
          prenom: existingrfid.prenom,
          nom: existingrfid.nom,
          rfid: existingrfid.rfid,
          token: token,
        },
        
    })
    io.emit('token', token)
    io.emit('nom',existingrfid.nom )
    io.emit('prenom',existingrfid.prenom )
    io.emit('email',existingrfid.email )
       }
       
}) */



/* /*  parser.on('data', function(data) { 
  console.log(data)
    //console.log('les information sont: ' + data);
    temp = data.split('/'); 
    var temperature = data.slice(0, 2); //decoupe de la temperature
    var humidite_serre  = data.slice(3, 5); //decoupe de l'humidite
    var humidite_sol = data.slice(6, 8); //decoupe de l'humidite
    var luminosite = data.slice(9); //decoupe de l'humidite

    //console.log(data.split('/'));
    io.emit('donne', {"temperature": temperature, "humidite_serre": humidite_serre,"humidite_sol": humidite_sol,"luminosite": luminosite});
    io.emit('temperature',temperature)
    var datHeure = new Date(); 
     var min = datHeure.getMinutes();
    var heur = datHeure.getHours(); //heure
    var sec = datHeure.getSeconds(); //secondes
    var mois = datHeure.getDate(); //renvoie le chiffre du jour du mois 
    var numMois = datHeure.getMonth() + 1; //le mois en chiffre
    var laDate = datHeure.getFullYear(); // me renvoie en chiffre l'annee
    if (numMois < 10) { numMois = '0' + numMois; }
    if (mois < 10) { mois = '0' + mois; }
    if (sec < 10) { sec = '0' + sec; }
    if (min < 10) { min = '0' + min; }
    var heureInsertion = heur + ':' + min + ':' + sec;
    var heureEtDate = laDate  + '-' + mois + '-' +  numMois; 
    //console.log(heureInsertion);
    //console.log(heureEtDate);
    const fetchMovies = (socket) => {
        data.findAll()
            .then(data => io.emit('fetchMovies', data))
            .catch(logError)
    }
   
    var temperature = data.slice(0, 2); //decoupe de la temperature
    var humidite_serre = data.slice(3, 5); //decoupe de l'humidite */
  /*   var humidite_sol = data.slice(6, 8);  //decoupe de l'humidite */
/*    var tempEtHum = { "temperature": temperature, "humidite_serre": humidite_serre, "humidite_sol": humidite_sol  , 'Date': heureEtDate, 'Heure': heureInsertion }; 
   if ((heur == 12 && min == 36 && sec == 00) ||(heur == 11 && min == 42 && sec == 00)) { 
   // if(sec == 00){ 
         //Connexion a mongodb et insertion Temperature et humidite
          MongoClient.connect(url, { useUnifiedTopology: false }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("test");
            dbo.collection("tempHum2").insertOne(tempEtHum, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        })   */
 //   } //Fin if
//rs}
/* if(heur == 12 && min == 50 && sec == 00){
    MongoClient.connect(url, { useUnifiedTopology: false }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("arrosage");
        dbo.collection("serre").insertOne(tempEtHum, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    })
} 
  */



 
/* parser.on('mute', function(mute){
MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("dhtTemp2");
    var col = dbo.collection('tempHum2');
    col.find().toArray(function(err, items) {
        console.log(items);
        io.emit('mute', items);     
//console.log(items);
        
})

})
}) */
// })
 http.listen(3001, ()=>{
  console.log('server started at ${3001}')/* apres avoir ecouter le port 3000 affiche les données */
})