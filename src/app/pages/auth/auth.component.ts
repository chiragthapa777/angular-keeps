import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/lib/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  email : string =''
  password : string = ''

  constructor(private authService : AuthService){}

  handleSubmit(){
    if(emial)
  }

}
