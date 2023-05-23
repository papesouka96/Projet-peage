import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user';
import { env } from 'src/env';
import { Payement } from '../models/payement';
import { UsersService } from './users.service';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  endpoint: string = 'http://localhost:3001';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  private currentUserSubject: BehaviorSubject<User>;
  constructor(private socket:Socket,private http: HttpClient, public router: Router, private httpClient: HttpClient,private serServe :UsersService, ) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse((localStorage.getItem('currentUser')!)));
  }
  arduino(){
    console.log('socket service');

 return this.socket.fromEvent('rfid')
  }
  token(){
    return this.socket.fromEvent('token')
  }
  nom(){
    return this.socket.fromEvent('nom')
  }
  prenom(){
    return this.socket.fromEvent('prenom')
  }
  email(){
    return this.socket.fromEvent('email')
  }
  temperature(){
    return this.socket.fromEvent('temperature')
  }
  //recuperer données
  getDatas() {
    return this.http.get(`${this.endpoint}/`)
  
  }
  
  buttonA(){
    this.socket.emit('optionA', '1')
    console.log("connexionA");
  }
  buttonB(){
    this.socket.emit('optionB', '2')
    console.log("connexionB");
  }

  ventilOn(){
    this.socket.emit('ventilOn', '3')
    console.log("connexionB");
  }
  ventilOff(){
    this.socket.emit('ventilOff', '4')
    //console.log("connexionB");
  }
  toitureOn(){
    this.socket.emit('toitureOn', '5')
  }
  toitureOff(){
    this.socket.emit('toitureOff', '6')
  }
  porteOn(){
    this.socket.emit('porteOn', '7')
  }
  porteOff(){
    this.socket.emit('porteOff', '8')
  }
  arrosageOn(){
    this.socket.emit('arrosageOn', '9')
  }
  arrosageOff(){
    this.socket.emit('arrosageOff', '0')
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getrfid(rfid:Payement){
    return this.httpClient.post<User>(`${env.apiUrl}/rfid`,rfid).
    pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      /* console.log(user.data) */
      localStorage.setItem('currentUser', JSON.stringify(user.data?.token));
      localStorage.setItem('email', JSON.stringify(user.data?.email));
      localStorage.setItem('prenom', JSON.stringify(user.data?.prenom));
      localStorage.setItem('nom', JSON.stringify(user.data?.nom));
      this.currentUserSubject.next(user);
      return user;
    }));


  }
  }
