import { data } from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Component, OnInit } from '@angular/core';
import {Payement} from '../models/payement'; 
/* import { SocketService } from '../meteo.service'; */
//import { io } from 'socket.io-client';
import { Temp_Humid } from '../services/interfaces/movie';
import { BehaviorSubject, from } from 'rxjs';
import { UsersService } from '../services/users.service';
import histo from '../histo.json';
import { WebsocketService } from '../services/websocket.service';
import { Socket } from 'ngx-socket-io';
import io from 'socket.io-client';
import { Router } from '@angular/router';


export interface donne{
  temperature:string;
  humidite_sol:string;
  humidite_serre:string;
  }

@Component({
  selector: 'app-gestion-arrosage',
  templateUrl: './gestion-arrosage.component.html',
  styleUrls: ['./gestion-arrosage.component.css']
})
export class GestionArrosageComponent implements OnInit{
//message pour si l'option est activé
  showMessageA: boolean = false;
  showMessageB: boolean = false;
  route: any;
  afficherMessageA() {
    this.showMessageA = true;
    setTimeout(() => {
      this.showMessageA = false;
    }, 3000); // Disparaître après 5 secondes
  }

  afficherMessageB() {
    this.showMessageB = true;
    setTimeout(() => {
      this.showMessageB = false;
    }, 3000); // Disparaître après 5 secondes
  }

  /* Declaration des variables */
  button1Active = false;
  button2Active = false;
  Serre!: Payement[] ;
  temp! :any [];
  currentDate!: any;
  temp8: any;
  temp12: any;
  temp19: any;
  temp20: any;
 last: any;
  dethierr: any;
  moyTemp!: number;
  moyHum!: number;
 searchText!: string;
 itemsperpage: number =1;
 p: number = 1;
 show:boolean = false;
 hist:donne[]= histo;
 buttonDiseabled: boolean = false;
  private socket = io('http://localhost:3001'); // remplacer http://localhost:3000 par l'URL de votre serveur Socket.io

 activateButton(buttonNumber: number) {
  if (buttonNumber === 1) {
    this.button1Active = true;
    this.button2Active = false;
  } else if (buttonNumber === 2) {
    this.button1Active = false;
    this.button2Active = true;
  }
}
   constructor(private serre:UsersService, private websocketservice:WebsocketService) { }// importation du service 
   ngOnInit()  {
    
 /* Fonction pour la recuperation des données humidité et temperature */
     this.serre.historique().subscribe((data)=>{
       //console.log(data);
      this.currentDate = new Date().getDate() + '/' + new Date().getMonth() +1 + '/'+  new Date().getFullYear();// recuperation date actuelle
      this.last = new Date().getDate()-7 + '/' + new Date().getMonth() +1 + '/'+  new Date().getFullYear(); // recuperation date du semaine derniere
     
      /* console.log(this.dethier1);
       console.log(this.dethierr); */
      /** filtre des temperatures  */
      /* this.temphum = data as unknown as Temphum[];
      this.temp8 = this.temphum.filter((e:any)=> e.Heure == "08:00:00" && e.Date == this.currentDate)
      this.temp12 = this.temphum.filter((e:any)=> e.Heure == "12:00:00" && e.Date == this.currentDate)
      this.temp19 = this.temphum.filter((e:any)=> e.Heure == "19:00:00" && e.Date == this.currentDate)
      this.temp20 = this.temphum.filter((e:any)=> e.Heure == "08:00:00"   && e.Date > this.last && e.Date <= this.currentDate  && e.Date !== this.last )
 */     /*  console.log(this.temp20); */
      
     /*  this.temp20.forEach(function (temperature:any) {
       console.log(temperature.temperature);
     });  */
 
     const t8 = this.temp8[0].temperature;
     const h8 = this.temp8[0].humidite;
     const t12 = this.temp12[0].temperature;
     const h12 = this.temp12[0].humidite;
     const t19 = this.temp19[0].temperature;
     const h19 = this.temp19[0].humidite;
     /* calcul de la temperature et de l'humidité moyenne */ 
     this.moyTemp = (parseInt(String(t8)) + parseInt(String(t12)) + parseInt(String(t19))) / 3;
     this.moyHum = (parseInt(String(h8)) + parseInt(String(h12)) + parseInt(String(h19))) / 3;
     
     })     
      
   }
   public afficher():void{
     this.show = !this.show;
   }


   buttonOptionA() {

this.websocketservice.buttonA();
  }
  
  buttonOptionB() {
    this.websocketservice.buttonB();
  }
  
  //  buttonOptionB(){
  //   this.websocketservice.buttonB()
  //      }
  // buttonOptionB(){
  //   this.socket.on('optionB', () => {
  //     console.log("optionB en cours");
  //   });
  // }
 
  }