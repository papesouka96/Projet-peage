const express = require('express');
const Abonnement = require('../models/abonnement');
const Payement = require('../models/payement');
/* const Serre = require('../models/serreModel'); */
// const Modeltemp = require('../models/userModel copy');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const check = require('./midleware');
var MongoClient = require('mongodb').MongoClient;
const router = express.Router();
var url = "mongodb://localhost:27017/peage";
const Model = require('../models/userModel');
const Recharge = require('../models/recharge');
module.exports = router;

/* pour la connection  RFID*/
/*
router.post("/login",  async (req, res, next) => {
  let {rfid } = req.body;
  let existingrfid;
  //console.log(rfid);
  existingrfid = await Model.findOne({ rfid: rfid});
  //console.log(existingrfid);
  if(!existingrfid){
    return res.status(401).send("user est archivé...!");
  } 
  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      { userId: existingrfid.id,rfid: existingrfid.rfid },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Erreur! Quelque chose s'est mal passée.");
    return next(error);
  }
  
  res
    .status(200)
    .json({
      success: true,
      data: {
        email: existingrfid.email,
        prenom: existingrfid.prenom,
        nom: existingrfid.nom,
        rfid: existingrfid.rfid,
        token: token,
      },
  });
});


*/


/* pour la connection */
router.post("/login",  async (req, res, next) => {

    let { email, password } = req.body;
    
    let existingUser;

    existingUser = await Model.findOne({ email: email});

    if (!existingUser) {
      return res.status(400).send("email doesn't exist...!");
    }else if(existingUser.etat == "false"){
      return res.status(401).send("user est archivé...!");
    }
  
    //check if password is correct
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).send("password is invalid");
    }
    
    
    let token;
    try {
      //Creating jwt token
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
    } catch (err) {
      console.log(err);
      const error = new Error("Erreur! Quelque chose s'est mal passée.");
      return next(error);
    }
    
    res
      .status(200)
      .json({
        success: true,
        data: {
          userId: existingUser.id,
          email: existingUser.email,
          prenom: existingUser.prenom,
          nom: existingUser.nom,
          token: token,
          etat : existingUser.etat,
          role : existingUser.role
        },
    });
});
//rechargement
router.get("/recharge",  async (req, res, next) => {

  let { rfid } = req.body;
  
  let existingUser;

  existingUser = await Abonnement.findOne({ rfid: rfid});

  if (!existingUser) {
    return res.status(400).send("carte non existant");
  }

 
  
  

  res
    .status(200)
    .json({
      success: true,
      
        userId: existingUser.id,
        rfid: existingUser.rfid,
        prenom: existingUser.prenom,
        categorie: existingUser.categorie,
        matricule: existingUser.matricule,
        
        nom : existingUser.nom,
        solde : existingUser.solde,
        role : existingUser.role
    
  });
});
router.patch('/updatesolde/:id', async (req, res) => {
  try {
  const id = req.params.id;
  const updatedData = req.body;
  const options = { new: true };
  

  
  
      const result = await Abonnement.findByIdAndUpdate(
          id, updatedData, options
      )
  
     return res.send(result)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
  })

/*  la méthode POST passe les paramètres dans le corps de la requête. */
router.post('/post', async(req, res) => {

const { matricule, etat, email, password, prenom, nom,role} = req.body;
const users = [];

const newUser = Model({
  matricule,
   etat,
    email,
    password, 
     prenom, 
    nom,
    role
 

});

try {

  const oldUser = await Model.findOne({ email });

  if (oldUser) {
    return res.status(409).send("Email Already Exist. Please Login");
  }

    const hash = await bcrypt.hash(newUser.password,10);
    newUser.password = hash;

    users.push(newUser);
    /* res.json(newUser); */
    await newUser.save();

    res.status(201).json(newUser);

} catch(error) {
    res.status(400).json({message: error.message})
}

})
/* La méthode GET est utilisée par le navigateur pour 
demander au serveur de renvoyer une certaine ressource. */
router.get('/getAll',check, async(req, res) => {
try{
const data = await Model.find();
res.json(data)
}
catch(error){
res.status(500).json({message: error.message})
}
})
/* get by id methode */
router.get('/getOne/:id', async(req, res) => {
const data = await Model.findById(req.params.id);
res.json(data)
})

/* update by id methode  pour la mdodification*/
router.patch('/update/:id', async (req, res) => {
try {
const id = req.params.id;
const updatedData = req.body;
const options = { new: true };

if (updatedData.password){
    const hash = await bcrypt.hash(updatedData.password, 10);
    updatedData.password = hash;
    
            const result = await Model.findByIdAndUpdate(
            id, updatedData, options
            );
    
          return  res.send(result);
    
        }


    const result = await Model.findByIdAndUpdate(
        id, updatedData, options
    )

   return res.send(result)
}
catch (error) {
    res.status(400).json({ message: error.message })
}
})
/* delete by id method pour supprimer */

router.delete('/delete/:id', async(req, res) => {
try {
const id = req.params.id;
const data = await Model.findByIdAndDelete(id)
res.send(`Le Document avec le nom ${data.prenom} ${data.nom} a été supprimé..`)
}
catch (error) {
res.status(400).json({ message: error.message })
}
})

/* get all method */
router.get('/pap', async(req, res) => {
  try{
  /* const data = await Modeltemp.find();
rs  console.log(data);
  res.json(data) */

  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("peage");
    var col = dbo.collection('payements');
    col.find().toArray(function(err, items) {
        console.log(items);
             res.json(items)
console.log(items);

})

})
  }
  catch(error){
  res.status(500).json({message: error.message})
  }
  })
  router.get('/rechargement', async(req, res) => {
    try{
    /* const data = await Modeltemp.find();
  rs  console.log(data);
    res.json(data) */
  
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("peage");
      var col = dbo.collection('rechargements');
      col.find().toArray(function(err, items) {
          console.log(items);
               res.json(items)
  console.log(items);
  
  })
  
  })
    }
    catch(error){
    res.status(500).json({message: error.message})
    }
    })
//recupere abonnement
  router.get('/abonnement', async(req, res) => {
    try{
    /* const data = await Modeltemp.find();
  rs  console.log(data);
    res.json(data) */
  
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("peage");
      var col = dbo.collection('abonnements');
      col.find().toArray(function(err, items) {
          console.log(items);
               res.json(items)
  console.log(items);
  
  })
  
  })
    }
    catch(error){
    res.status(500).json({message: error.message})
    }
    })
    //recupere utilisateur
  router.get('/uzer', async(req, res) => {
    try{
    /* const data = await Modeltemp.find();
  rs  console.log(data);
    res.json(data) */
  
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("peage");
      var col = dbo.collection('users');
      col.find().toArray(function(err, items) {
          console.log(items);
               res.json(items)
  console.log(items);
  
  })
  
  })
    }
    catch(error){
    res.status(500).json({message: error.message})
    }
    })
 // router.get('/pap', async(req, res) => {
  // try{
  /* const data = await Modeltemp.find();
  console.log(data);
  res.json(data) */

  /* MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("arrosage");
    var col = dbo.collection('serre');
    col.find().toArray(function(err, items) {
        console.log(items);
             res.json(items)
console.log(items); */

/* try{
  const data = await temphum.find();
  console.log(data);
  res.json(data)
  }
  catch(error){
  res.status(500).json({message: error.message}) 
  }*/

 // })


  // 
  router.get('/deletetemp', async(req, res) => {
    try {
      MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("arrosage");
        var col = dbo.collection('serre');
        col.deleteMany()
            
    })
    
    
    }
    catch (error) {
    res.status(400).json({ message: error.message })
    }
 });
    router.post('/payement', async(req, res) => {
      const { Categorie,Matricule, Montant, Date  , Poste, Rfid} = req.body;
      const payement = [];
      
      const newPayement = Payement({
        Categorie,Matricule, Montant, Date  , Poste, Rfid
      })
    ;
      try {

        /* const oldUser = await Model.findOne({ email });
      
        if (oldUser) {
          return res.status(409).send("Email Already Exist. Please Login");
        } */
      
        /*   const hash = await bcrypt.hash(newUser.password,10);
          newUser.password = hash; */
      
          payement.push(newPayement);
          /* res.json(newUser); */
          await newPayement.save();
      
          res.status(201).json(newPayement);
      
      } catch(error) {
          res.status(400).json({message: error.message})
      }
      
    })
    //insertion nouvelle abonnement
    router.post('/abonnement', async(req, res) => {
      const { rfid,solde, nom, prenom , matricule , categorie,etat,} = req.body;
      const abonnement = [];
      
      const newAbonnement = Abonnement({
        rfid,solde, nom, prenom , matricule , categorie,etat,
      });
    ;
      try {

        /* const oldUser = await Model.findOne({ email });
      
        if (oldUser) {
          return res.status(409).send("Email Already Exist. Please Login");
        } */
      
        /*   const hash = await bcrypt.hash(newUser.password,10);
          newUser.password = hash; */
      
          abonnement.push(newAbonnement);
          /* res.json(newUser); */
          await newAbonnement.save();
      
          res.status(201).json(newAbonnement);
      
      } catch(error) {
          res.status(400).json({message: error.message})
      }
      
    })

    //insertion rechargement
    router.post('/rechargement', async(req, res) => {
      const { rfid,montant, nom, prenom , date , } = req.body;
      const recharge = [];
      
      const newRecharge = Recharge({
        rfid,montant, nom, prenom , date 
      });
    ;
      try {

        /* const oldUser = await Model.findOne({ email });
      
        if (oldUser) {
          return res.status(409).send("Email Already Exist. Please Login");
        } */
      
        /*   const hash = await bcrypt.hash(newUser.password,10);
          newUser.password = hash; */
      
          recharge.push(newRecharge);
          /* res.json(newUser); */
          await newRecharge.save();
      
          res.status(201).json(newRecharge);
      
      } catch(error) {
          res.status(400).json({message: error.message})
      }
      
    })



  // list data
/* router.get('/pap', function(req, res) {
  Modeltemp.find(function (err, sales) {
      if (err) return next(err);
      res.json(sales);
  });
}); */

/* router.post('/abonnement', async(req, res) => {

  const { rfid,solde, nom, prenom , matricule , categorie} = req.body;
  const abonnement = [];
  
  const newAbonnement = Abonnement({
    rfid,solde, nom, prenom , matricule , categorie
  });
  MongoClient.connect(url, { useUnifiedTopology: false }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("peage");
    dbo.collection("abonnement").insertOne(abonnement, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
})
}) */