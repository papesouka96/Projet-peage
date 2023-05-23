import { data } from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Payement} from '../models/payement'; 
import { Socket } from 'ngx-socket-io';
import {BodyParser}  from 'body-parser';
import { WebsocketService } from '../services/websocket.service';
import io from 'socket.io-client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsernameValidator } from '../username.validator';
import Swal from 'sweetalert2';
import { getLocaleDateFormat } from '@angular/common';
import { timer } from 'rxjs';
import { Abonnement } from '../models/abonnement';


@Component({
  selector: 'app-accueil-dashboard',
  templateUrl: './accueil-dashboard.component.html',
  styleUrls: ['./accueil-dashboard.component.css']
})
export class AccueilDashboardComponent implements OnInit {
  registerForm2!: FormGroup;
  registerForm1!: FormGroup;
  [x: string]: any;
 on: boolean = false;
  off: boolean = true;
  currentDate:any;
  temperature!: number;
  humidite_serre!: number;
  humidite_sol!: number;
 luminosite!: number;
  tempHum: any;
  Serre: any = [] ;
  Particulier:any
Transport:any
  temp!:any[]
  PoidsL:any;
  submitted :any;
  moyHum:any;
  toit:boolean =true;
  barrierel:boolean =false;
  barriereb:boolean =true;
  arrosage:boolean =false;
  annulerb:any=false;
 payer:any;
 montant: any;
 carte: any;
 tableau : any =false
 errorSms:any=false;
 charger:any;
 payerb:any=true;
 chargerb:any=true;
  temp20: any;
  spin:boolean =false;
  img:boolean =true;
  t8:any;t12:any;t19:any;h8:any;h12:any;h19:any;
  showForm1:any;
 
  users:any;
  userActif!:any
  getItem: any = {};
  constructor( private userservice :UsersService, private socket: Socket, private websocketService : WebsocketService,private route: Router,private formBuilder: FormBuilder){
    this.registerForm2 = this.formBuilder.group({
      id: [''],
      Date: ['', [Validators.required]],
    Matricule: ['', [Validators.required]],
      Categorie: ['', [Validators.required]],
      Montant: ['', [Validators.required]],
      Poste: ['', [Validators.required]],
      Rfid:[''],
    });
    this.registerForm1 = this.formBuilder.group({
   
     
      Rfid:[''],
    });
  }


  ngOnInit(): void {
    /* this.socket.connect();
    this.socket.on('donne', (donne: number) => {
      this.tempHum = [donne];
      console.log(donne);
 const t = this.temperature;
 console.log(t); */
 
 
 /*  this.registerForm2 = this.formBuilder.group({
  id: [''],
  Date: [''],
Matricule: [''],
  Categorie: [''],
  Montant: [''],
  Poste: [''],

});
      */  
     
     
  //  });
  /*  this.websocketService.temperature().subscribe((data:any) => { 
     if (data>26) { // Afficher le ventillateur allumé lorsque la temperature est supérieur a 30
         this.img = false;
        
         
        }/* else{
          this.img = true;
        } */
      /* 
      console.log(data);
      var tempt = data
      console.log(tempt
        );
      
      

   }) 

    */
  


  const mail = localStorage.getItem('email')?.replace(/['"]+/g, '');
  const prenom = localStorage.getItem('prenom');
  const nom = localStorage.getItem('prenom');

/* console.log(prenom); */


  // console.log(mail);
/*     this.userservice.getUsers().subscribe(
      data => {
        console.log(data);
        
        this.users = data;
        
        this.userActif = this.users.filter((e: any) =>  e.prenom == prenom )
        console.log(this.userActif);
        

        
  
      }) */


  }
  buttonventilOn(){
    this.websocketService.ventilOn()
  }
  buttonventilOff(){
    this.websocketService.ventilOff()
  }
  buttontoitureOn(){
    this.websocketService.toitureOn()
  }
  buttontoitureOff(){
    this.websocketService.toitureOff()
  }
  buttonporteOn(){
    this.websocketService.porteOn()
  }
  buttonporteOff(){
    this.websocketService.porteOff()
  }
  buttonarrosageOn(){
    this.websocketService.arrosageOn()
  }
  buttonarrosageOff(){
    this.websocketService.arrosageOff()
  }
  allumer(){
    this.img = true;
    this.socket.emit('active', '1');
  }

  eteindre(){
    
    this.img = false;
    this.socket.emit('active', '0');
  }
leveb(){
  this.barrierel =true;
  this.barriereb =false
}
baisseb(){
  this.barrierel =false;
  this.barriereb = true
}
payement (){

  this.payer=true;
  this.charger=false;
  this.payerb=false;
  this.chargerb=false;
  this.annulerb= true;
}
rechargement (){
  
  this.payer=false;
  this.charger=true;
  this.payerb=false;
  this.chargerb=false;
  this.annulerb= true;
   }
   annuler (){
    this.payer=false;
    this.charger=false;
    this.payerb=true;
    this.chargerb=true;
    this.annulerb= false;
    this.tableau = false
  }
  
 
    off_arrosage_click (){
      
        this.arrosage= false;
      
       }
       simpleAlert() {
        Swal.fire('OPERATION REUSSI');
        Swal.update({
          icon: 'success'
        })};
      
       onSubmit(){ 
        if (this.payer){
        console.log("okay");
        
       /*  this.submitted = true
      this.spin = true */
    /*   if (this.registerForm2.invalid) {
        this.spin = false
        return;
      } */
      let categorie = (<HTMLInputElement>document.getElementById("categorie")).value;
     let poste ="P15"
      let matricule = (<HTMLInputElement>document.getElementById("matricule")).value;
      /* let matricule = (<HTMLInputElement>document.getElementById("matricule")).value; */
      this.Transport = "Transport"
      this.PoidsL ="PoidsL"
      this.Particulier="Particulier"
      if (categorie==this.Transport){
 this.montant = "1500";
      }
      if (categorie==this.PoidsL){
        this.montant = "2000";
      }
             if (categorie==this.Particulier){
              this.montant = "3000";
                   }
      
      /*insertion sur la base de données */
      const payement = {
        Date: new Date().toISOString(),
        Categorie: categorie,
        
        Poste: poste,
        Montant: this.montant,
        Matricule: matricule,
        Rfid :'Pas_Renseiger'
      }
      
      
  console.log(payement
    );
  
  
  
      this.userservice.addPayement(payement).subscribe(
        data => {
        /*   this.spin = false; */
             console.log(data);
             
          this['simpleAlert']()
           window.location.reload(); 
  },
        /*controle email*/
        error => {
          console.log(error)
          if (error == 'Conflict') {
            this['errorMsg'] = 'error email existant';
            this.spin = false
            setTimeout(() => { this['errorMsg'] = false }, 3001);
          } else if (error == 'Payload too large')
            this['imgHeight'] = true;
          setTimeout(() => { this['imgHeight'] = false }, 3001);
        }
  
  
      );} 
      else {
        console.log('okay');
        
          this.carte = (<HTMLInputElement>document.getElementById("rfid")).value;
        /* this.montant = (<HTMLInputElement>document.getElementById("montant")).value; */
  console.log(this.carte); 
        const user ={
 
          rfid : this.carte,
          /* montant: this.montant */
         
         
         }
         this.userservice.abonnement().subscribe( 
          data =>{
    
            this.users = data as Abonnement [];
    
            this.userActif = this.users.filter((e:any)=> e.rfid == this.carte)
            console.log(this.userActif);
            if(this.userActif[0].rfid == this.carte){
              this.charger =false
              this.payer=false
              this.payerb=false
              this.tableau =true
             
               
               /* console.log(this.montant
                ); */
               
            }
            if(!this.userActif) {
              this.errorSms =true
             
              setTimeout(()=>{ this.errorSms = false}, 3001); 
            }
           
          }
    );  
      }    
    } 
    changesolde(){
      console.log(this.userActif[0].rfid);
      console.log(this.userActif[0].nom);
      console.log(this.userActif[0].prenom);
      console.log(this.userActif[0]._id);
      console.log(this.userActif[0].solde);
      this.montant = (<HTMLInputElement>document.getElementById("montant")).value; 
      console.log(this.montant);
      
      const recharge = {
        date: new Date().toISOString(),
        nom: this.userActif[0].nom,
        
        prenom:this.userActif[0].prenom ,
        montant: this.montant,
       
        rfid :this.userActif[0].rfid
      }
      
      
  console.log(recharge
    );
  
  
  
      this.userservice.addRecharge(recharge).subscribe(
        data => {
        /*   this.spin = false; */
             console.log(data);
             
          this['simpleAlert']()
          /* window.location.reload(); */
  },
        /*controle email*/
        error => {
          console.log(error)
          if (error == 'Conflict') {
            this['errorMsg'] = 'error email existant';
            this.spin = false
            setTimeout(() => { this['errorMsg'] = false }, 3001);
          } else if (error == 'Payload too large')
            this['imgHeight'] = true;
          setTimeout(() => { this['imgHeight'] = false }, 3001);
        }
        
      );

          let nouveauSolde = parseInt(String(this.montant)) + parseInt(String(this.userActif[0].solde))
      console.log(nouveauSolde);
      let nvS = String(nouveauSolde)
      console.log(nvS);
      const id =this.userActif[0]._id
        console.log(id);
        
         const abonne ={
        
        solde :nvS
         }
     /*    
         Swal.fire({  
          title: 'Voulez-vous vraiment desarchiver cette utilisateur?',  
          text: 'Si oui met ok',  
          icon: 'warning',  
          confirmButtonColor: '#B82010',  
          cancelButtonColor: 'green' ,
          showCancelButton: true,  
          confirmButtonText: 'ok!',  
          cancelButtonText: 'Annuler'  
        }).then((result) => {  
           */
        
            this.userservice.Recharge(id,abonne).subscribe(
        
              data=>{
          
            
                this.ngOnInit();
              }
           );  
          
        }
        
        }
  
      ;
      
    
