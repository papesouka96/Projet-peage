
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { UsernameValidator } from '../username.validator';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ajout-agent',
  templateUrl: './ajout-agent.component.html',
  styleUrls: ['./ajout-agent.component.css']
})
export class AjoutAgentComponent  implements OnInit{
  registerForm1!: FormGroup;
  registerForm2!: FormGroup;
  title = 'angularvalidate';
  annulerb :any =false;
  submitted = false;
  verifPass: any = true;
  imgSelected: any;
  errorMsg: any;
  spin = false;
  imgHeight = false;
  roles: string | null | undefined;
showForm1: any =false;
showForm2: any =false;
showButton: any =true;
  //Validation formulaire en temps reel
  constructor(private userService: UsersService, private formBuilder: FormBuilder, private router: Router) {
    this.registerForm1 = this.formBuilder.group({
      id: [''],
      prenom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      nom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      roles: ['', [Validators.required]],
      img: [''],

    });
    this.registerForm2 = this.formBuilder.group({
      id: [''],
      prenom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      nom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      matricule: ['', [Validators.required]],
      categorie: ['', [Validators.required]],
      solde: ['', [Validators.required]],
      rfid: [''],

    });
  }
  ngOnInit(): void {
    this.registerForm1 = this.formBuilder.group({
      prenom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      nom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      email: ['', [Validators.required, Validators.email]],
      roles: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordc: ['', Validators.required]
    })
    this.registerForm2 = this.formBuilder.group({
      prenom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      nom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      matricule: ['', [Validators.required]],
      categorie: ['', Validators.required],
      solde: ['', [Validators.required]],
      rfid: ['', Validators.required]
    })
     this.roles = localStorage.getItem('roles')?.replace(/['"]+/g, '');
     console.log(this.roles);
     
    if (this.roles !="Admin") {
      this.router.navigateByUrl('acceuil')
      
    } 
  }

  //Receperation et verification des deux mots de passe
  checkPassword = () => {

    let pass1 = (<HTMLInputElement>document.getElementById("pass1")).value;
    let pass2 = (<HTMLInputElement>document.getElementById("pass2")).value;

    /* console.log(pass1 != pass2) */

    if (pass1 != pass2) {

      this.verifPass = false;
     /*  console.log(this.verifPass) */
      this.registerForm1 = this.formBuilder.group(
        {

          password: [''],
          passwordc: [''],

        })

      setTimeout(() => { this.verifPass = true }, 3000);


    }
  }


  simpleAlert() {
    Swal.fire('INSCRIPTION RÉUSSIE AVEC SUCCÉE');
    Swal.update({
      icon: 'success'
    })
  }
  onSubmit() {
    if (this.showForm2) {
      this.submitted = true
    this.spin = true
    if (this.registerForm1.invalid) {
      this.spin = false
      return;
    }

    /*insertion sur la base de données */
    const user = {
      prenom: this.registerForm1.value.prenom,
      nom: this.registerForm1.value.nom,
      email: this.registerForm1.value.email,
      role: this.registerForm1.value.roles,
      password: this.registerForm1.value.password,
      matricule: Math.random().toString(26).slice(2),
     
      etat: true,
  
    }




    this.userService.addUsers(user).subscribe(
      data => {
      /*   this.spin = false; */
        this.simpleAlert()
        window.location.reload();


      },
      /*controle email*/
      error => {
        console.log(error)
        if (error == 'Conflict') {
          this.errorMsg = 'error email existant';
          this.spin = false
          setTimeout(() => { this.errorMsg = false }, 3001);
        } else if (error == 'Payload too large')
          this.imgHeight = true;
        setTimeout(() => { this.imgHeight = false }, 3001);
      }


    );

    }
    else{
      this.submitted = true
      this.spin = true
      if (this.registerForm2.invalid) {
        this.spin = false
        return;
      }
  
      /*insertion sur la base de données */
      const abonnement = {
        prenom: this.registerForm2.value.prenom,
        nom: this.registerForm2.value.nom,
        matricule : this.registerForm2.value.matricule,
        categorie: this.registerForm2.value.categorie,
        solde: this.registerForm2.value.solde,
        rfid: this.registerForm2.value.rfid,
       etat: "true",
        
    
      }
  
  
  
  
      this.userService.addAbonne(abonnement).subscribe(
        data => {
        /*   this.spin = false; */
          this.simpleAlert()
          window.location.reload();
  
  
        },
        /*controle email*/
        error => {
          console.log(error)
          if (error == 'Conflict') {
            this.errorMsg = 'error email existant';
            this.spin = false
            setTimeout(() => { this.errorMsg = false }, 3001);
          } else if (error == 'Payload too large')
            this.imgHeight = true;
          setTimeout(() => { this.imgHeight = false }, 3001);
        }
  
  
      );
  
    }
  }


//fin

  onFileSelected(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgSelected = reader.result;
      };
    }

  }

  selectFile(event: any) {

  }
ajout_abonne(){
  this.showForm1 = true ;
  this.showForm2 = false ;
  this.showButton= false
  this.annulerb =true;
}
ajout_agent(){
  this.showForm1 = false ;
  this.showForm2 = true ;
  this.showButton= false;
  this.annulerb =true;
}
annuler(){
  this.showForm1 = false ;
  this.showForm2 = false ;
  this.showButton= true;
  this.annulerb =false;
}
}
