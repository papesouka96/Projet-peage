import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { env } from 'src/env';
import { BehaviorSubject, map } from 'rxjs';
import { Router } from '@angular/router';
import { Payement} from '../models/payement';
import { Abonnement } from '../models/abonnement';
import { Recharge } from '../models/recharge';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private httpClient:HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse((localStorage.getItem('currentUser')!)));
   /*  if (this.currentUserSubject.value == null) {
      this.getLogOut();
      this.router.navigateByUrl('login');
    } */
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
 getConnexion(user:User){
    return this.httpClient.post<User>(`${env.apiUrl}/login`,user).
      pipe(map(res => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
       /*  console.log(user.data)  */
        localStorage.setItem('currentUser', JSON.stringify(res.data?.token));
        localStorage.setItem('email', JSON.stringify(res.data?.email));
        localStorage.setItem('prenom', JSON.stringify(res.data?.prenom));
        localStorage.setItem('nom', JSON.stringify(res.data?.nom));
        localStorage.setItem('roles', JSON.stringify(res.data?.role));
        localStorage.setItem('etat', JSON.stringify(res.data?.etat))
        this.currentUserSubject.next(res);
        return res;
        
      }));
 }
/*  getRecharge(user:Abonnement){
  return this.httpClient.get<Abonnement>(`${env.apiUrl}/recharge`,user).
    pipe(map(res => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
     /*  console.log(user.data)  */
  /*    localStorage.setItem('categorie', JSON.stringify(res.categorie));
      localStorage.setItem('rfid', JSON.stringify(res.rfid));
      localStorage.setItem('prenom', JSON.stringify(res.prenom));
      localStorage.setItem('nom', JSON.stringify(res.nom));
      localStorage.setItem('solde', JSON.stringify(res.solde));
      localStorage.setItem('matricule', JSON.stringify(res.matricule))
      /* this.currentUserSubject.next(res); */
    /*  return res;
      
    }));
} */
  
    getToken() {
    return localStorage.getItem('currentUser');
  }
  getPrenom() {
    return localStorage.getItem('prenom');
  }
  getnom() {
    return localStorage.getItem('nom');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('currentUser');
    return authToken !== null ? true : false;
  }

  getLoggedIn(){

    if(!this.currentUserValue) {
      return false;
    }
    return localStorage.getItem('role');
  }

  getUsers(){
  
    return this.httpClient.get(`${env.apiUrl}/uzer`)
  };
 /*   getData(){
    return this.httpClient.get<Serre>(`${env.apiUrl}/pap`)
  }; 
 */
 historique(){
    return this.httpClient.get(`${env.apiUrl}/pap`)
  };
  abonnement(){
    return this.httpClient.get(`${env.apiUrl}/abonnement`)
  };
  recharge(){
    return this.httpClient.get(`${env.apiUrl}/rechargement`)
  };
  changeRole(id:any,user: User){
   
    return this.httpClient.patch<User>(`${env.apiUrl}/update/${id}`,user);
  };
  changeSolde(id:any,user: Abonnement){
   
    return this.httpClient.patch<Abonnement>(`${env.apiUrl}/update/${id}`,user);
  };
  Recharge(id:any,abonne: Abonnement){
   
    return this.httpClient.patch<Abonnement>(`${env.apiUrl}/updatesolde/${id}`,abonne);
  };
 modifUsers(id:any,user: User){
 return this.httpClient.patch<User>(`${env.apiUrl}/update/${id}`,user);
  }
  

  oneuser(id:any,user: User){
   
    return this.httpClient.patch<User>(`${env.apiUrl}/update/${id}`,user);
  };
  addUsers(user: User){
    return this.httpClient.post<User>(`${env.apiUrl}/post`,user);
  }
  addAbonne(abonnement: Abonnement){
    return this.httpClient.post<Abonnement>(`${env.apiUrl}/abonnement`,abonnement);
  }
  addPayement(payement: Payement){
    return this.httpClient.post<Payement>(`${env.apiUrl}/payement`,payement);
  }
  addRecharge(recharge: Recharge){
    return this.httpClient.post<Recharge>(`${env.apiUrl}/rechargement`,recharge);
  }
  getLogOut(){
  localStorage.removeItem('currentUser');
  localStorage.removeItem('prenom');
  localStorage.removeItem('nom');
  localStorage.removeItem('email');
 // this.router.navigate(['']);
 // if (removeToken == null && removeprenom == null &&  removenom == null && removemail == null) {
    // }
  }
 /*  getRole(){
    return localStorage.getItem('role');
  } */
}


