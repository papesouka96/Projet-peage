import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js/auto";
import { data } from 'jquery';
import { UsersService } from '../services/users.service';
import { Recharge } from '../models/recharge';

@Component({
  selector: 'app-ajout-abonne',
  templateUrl: './ajout-abonne.component.html',
  styleUrls: ['./ajout-abonne.component.css']
})
export class AjoutAbonneComponent implements OnInit {
  chart: Chart <"line", any, string> | undefined;
  temphum! : Recharge [];
  temp! :any [];
  currentDate!: any;
  temp8: any;
  temp12: any;
  temp19: any;
  moyTemp!: number;
  moyHum!: number;
  constructor(private weather: UsersService  ) {}
  
  ngOnInit(): void {

    this.weather.recharge()
    .subscribe(data => {
       /* console.log(data)  */
      this.temphum = data as unknown as Recharge[];
      
      this.currentDate = (new Date().getDate()-1) + '/' + (new Date().getMonth()+1 ) + '/'+  new Date().getFullYear();
       /* console.log(this.currentDate);   */
      
     this.temphum = data as Recharge[];
     this.temp8 = this.temphum
     this.temp12 = this.temphum
     this.temp19 = this.temphum
      console.log(this.temp8); 
     
    const t1 = this.temp8[0].montant;
    const t2 = this.temp8[1].montant;
    const t3 = this.temp8[2].montant;
    const t4 = this.temp12[3].montant;
    const t5 = this.temp12[4].montant;
    const t6 = this.temp19[5].montant;
    const t7 = this.temp12[6].montant;
    const t8 = this.temp12[7].montant;
    const t9 = this.temp19[8].montant;
    const t10 = this.temp19[9].montant;
     /* console.log(t8); */

   
    
    var temperature = [ t1, t2,t3,t4,t5, t6, t7,t8,t9,t10 ];
  var humidite = [];
   
    
  
                     
           
  this.chart = new Chart('canvas', {
    type: 'line',
    data: {
      labels: [ "1er", "2e", "3e" ,"5e","6e", "7e", "8e" ,"9e","10e"],
      datasets: [
        {
           label: "Recharge",
          data: temperature,
          backgroundColor: '#F53727'
        },
     /*    {
          label: "Humidité",
          data: humidite,
          backgroundColor: '#69AEF7'
         
        }, */
      ]
    },
   
  })     
            
            
       
      }); 

  
  
  }
}
