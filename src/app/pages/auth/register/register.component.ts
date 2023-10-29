import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { MatchPassword } from 'src/app/lib/validators/confirmPw.validator';
import { patternValidator } from 'src/app/lib/validators/pw.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required ],
      email: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required , patternValidator()],
      rePassword: ['', [Validators.required] ],
    },
    {
      validator: MatchPassword('password', 'rePassword'),
    });
  }

  async onSubmit(){

  }

  ngOnInit(): void {}
}
