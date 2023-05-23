import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

import { io } from 'socket.io-client';
import { Temp_Humid } from '../services/interfaces/movie';

@Component({
  selector: 'app-modif',
  templateUrl: './modif.component.html',
  styleUrls: ['./modif.component.css']
})
export class ModifComponent {


  registerForm!:FormGroup;
  title = 'angularvalidate';
  submitted = false;
  errorSms:any;
  spin= false;
  verifPass:any = true;
  


  constructor(private userService : UsersService, private formBuilder: FormBuilder ,private route: Router,) {
    
    
  }
  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
    
      email:['',[Validators.required,Validators.email]],
      
      password:['',[Validators.required,Validators.minLength(8)]],
      
      })
  
     

      
       
  }

  
onSubmit(){
this.submitted = true
this.spin = true

 if(this.registerForm.invalid){
  this.spin = false
  return ;
} 

 
  
   
}

checkPassword = () => {

  let pass1 = this.registerForm.value.password//(<HTMLInputElement>document.getElementById("pass1")).value;
  let pass2 = this.registerForm.value.password2//(<HTMLInputElement>document.getElementById("pass2")).value;
/* 
  console.log(pass1 != pass2) */

  if (pass1 != pass2) {
    this.verifPass = false;
    this.registerForm = this.formBuilder.group(
      {

        password: [''],
        password2: [''],

      })

    setTimeout(() => { this.verifPass = true }, 3000);
  }
  
}
}


