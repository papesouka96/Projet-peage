import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { UsernameValidator } from '../username.validator';
import Swal from 'sweetalert2'; 
import { Abonnement } from '../models/abonnement'; 
@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.css']
})
export class AbonnementComponent {
  route!:string
  isActif:boolean= false
  registerForm!:FormGroup;
  title = 'angularvalidate';
  submitted = false;
  invalid= false;
  verifPass:any = true;
users: any;
userEditForm!: FormGroup;
showForm = false; 
p: number= 1;
itemsperpage: number= 8;
totalUser:any; 
searchText:any;
user = []; userActif:any = [];
emailExiste:any;
spin= false;
errorMsg:any;
show:boolean = false;
roles:any


  constructor(private userService : UsersService, private formBuilder : FormBuilder, private router: Router){
    this.userEditForm = this.formBuilder.group({
      id:[''],
      prenom: ['', [Validators.required,UsernameValidator.cannotContainSpace]],
      nom: ['', [Validators.required,UsernameValidator.cannotContainSpace]],
      matricule: ['', [Validators.required,UsernameValidator.cannotContainSpace]],
    });
  /*   this.route = this.router.routerState.snapshot.url
    this.isActif = this.route == '/admin' ? true : false */
    this.roles = localStorage.getItem('roles')?.replace(/['"]+/g, '');
    console.log(this.roles);
    
   if (this.roles =="Admin") {
     /* this.router.navigateByUrl('acceuil') */
     this.isActif= true;
   } 
  
  } 

  simpleAlert(){  
    Swal.fire(
      'modification reussie!',
      'You clicked the button!',
      'success'
    ) 
  } 
 

ngOnInit(): void {
  
  this.userService.abonnement().subscribe( 
      data =>{

        this.users = data;
        this.userActif = this.users.filter((e: any) =>  e.etat == "true" )
       /*  this.userActif = this.users */
        console.log(this.userActif);
        
      }
); 
 this.roles = localStorage.getItem('roles')?.replace(/['"]+/g, '');
if (this.roles !="Admin") {
  this.router.navigateByUrl('acceuil')
  
}

 
}

retrieveData(){
  this.userService.getUsers().subscribe((data:any)=>{
    this.users = data;
     this.totalUser = data.length; 
  })
}

/* pour changer le role d'un utilisateur */
changeRole=(id:any,roles:any)=> {
 roles == "Admin" ? roles = "Utilisateur": roles = "Admin"

 const user ={
  role : roles

 }

 Swal.fire({  
  title: 'Voulez-vous vraiment changer le role de cet utilisateur?',  
  text: 'Si oui met ok',  
  icon: 'warning',  
  confirmButtonColor: "#B82010", 
  cancelButtonColor: "green" , 
  showCancelButton: true,  
  confirmButtonText: 'ok!',  
  cancelButtonText: 'Annuler'  
}).then((result) => {  
  if (result.value) {  

    this.userService.changeRole(id,user).subscribe(

      data=>{
        // this.simpleAlert()
        this.ngOnInit();
      }
      );
  }
  
})
 
}

/* pour archiver un utilisateur */
deleteId=(id:any,etat:any)=> {
  
etat == "true" ? etat = true : etat = false

 const user ={
 etat : etat

 }

 Swal.fire({  
  title: 'Voulez-vous vraiment archiver cet utilisateur?',  
  text: 'Si oui met ok',  
  icon: 'warning',  
  confirmButtonColor: "#B82010", 
  cancelButtonColor: "green" , 
  showCancelButton: true,  
  confirmButtonText: 'ok!',  
  cancelButtonText: 'Annuler'  
}).then((result) => {  
  if (result.value) {  

    this.userService.Recharge(id,user).subscribe(

      data=>{
  
        this.ngOnInit();
      }
   );  
  }
}) 
 
 
}

/* pour recuperer l'id,le mail, le prenom et le nom de l'utilisateur qu'on doit modifier */
getUserData(id:any,matricule:any,prenom:any,nom:any,categorie:any){
 
      this.showForm = true;
      this.userEditForm = this.formBuilder.group({
          id:[id],
          prenom: [prenom, [Validators.required,UsernameValidator.cannotContainSpace]],
          nom: [nom, [Validators.required,UsernameValidator.cannotContainSpace]],
          matricule: [matricule ,[Validators.required,UsernameValidator.cannotContainSpace]],
          categorie: [categorie ,[Validators.required,UsernameValidator.cannotContainSpace]],
        });  
    }  
/* modifier un utilisateur */
modifUsers (){
  const id =  this.userEditForm.value.id;
  for (const iterator of this.users) {
    this.submitted = true
    this.spin = true
   if(this.userEditForm.invalid){
    this.spin = false
    return ;
  }
  /* pour montrer que l'email existe deja lors de la modification */
  console.log(iterator.email  )
  if(iterator.email == this.userEditForm.value.email && iterator._id != id){
    this.emailExiste = "Email existe déjà";
    setTimeout(() => {
      this.emailExiste=""
    }, 2000);
    return;
  }
}

 const user ={
  nom : this.userEditForm.value.nom,
  prenom: this.userEditForm.value.prenom,
  email: this.userEditForm.value.email
 }
 
 this.userService.changeRole(id,user).subscribe(
   
   data=>{
    Swal.fire({  
      title: 'Voulez-vous vraiment modifier le profil de utilisateur?',  
      text: 'Si oui met ok',  
      icon: 'warning',  
      confirmButtonColor: "#B82010", 
      cancelButtonColor: "green" , 
      showCancelButton: true,  
      confirmButtonText: 'ok!',  
      cancelButtonText: 'Annuler'  
    }).then((result) => {  
      if (result.value) { 
 
    this.ngOnInit();
 

    this.showForm = false
  }
  }
  )
  
},
 
  error =>{
   /*  console.log(error ) */
  }
 );
}

public afficher():void{
  this.show = !this.show;
}
/* pour desarchiver un utilisateur */
ddeleteId=(id:any,etat:any)=> {


  etat == true ? etat = false : etat = true

 const user ={
 etat : etat

 }

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
  if (result.value) {  

    this.userService.modifUsers(id,user).subscribe(

      data=>{
  
    
        this.ngOnInit();
      }
   );  
  }
}) 

}

}
