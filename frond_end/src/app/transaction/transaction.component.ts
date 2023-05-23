import { Component } from '@angular/core';
import { data } from 'jquery';


import { Payement} from '../models/payement'; 
/* import { SocketService } from '../meteo.service'; */
import { io } from 'socket.io-client';
import { Temp_Humid } from '../services/interfaces/movie';
import { BehaviorSubject, from } from 'rxjs';
import { UsersService } from '../services/users.service';
import { Recharge } from '../models/recharge';
import histo from '../histo.json';

export interface donne{
temperature:string;
humidite_sol:string;
humidite_serre:string;
}
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
 /* Declaration des variables */
 Serre!: Payement[] ;
 Serre1! :Recharge [];
 temp! :any [];
 currentDate!: any;
 temp7h: any;
 temp18h: any;
 
 temp20: any;
last: any;
 dethierr: any;
 moyTemp!: number;
 moyHum_Sol!: number;
 moyHum_Serre!: number;
searchText!: string;
itemsperpage: number =5;
p: number = 1;
show:boolean = false;
payement :any =true;
recharge : any =false;
public hist:Payement[] | undefined;


	constructor(private serre:UsersService) { }// importation du service 
  ngOnInit()  {
   

    this.serre.historique().subscribe((data)=>{
     
   
     this.Serre= data as unknown as Payement[];
    

    })     
     
    this.serre.recharge().subscribe((data)=>{
     console.log(data);
     
   
      this.Serre1= data as unknown as Recharge[];
     
 
     })   
  }
  public afficher():void{
    this.show = !this.show;
  }
  Paye(){
    this.recharge= false
    this.payement=true;
  }
  Change(){
    this.payement=false;
    this.recharge= true
  }
}
