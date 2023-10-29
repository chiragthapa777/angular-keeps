import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { RegisterModelResponse } from 'src/app/lib/model/RegisterResponse';
import { AuthService } from 'src/app/lib/services/auth.service';
import { alreadyExistValidator } from 'src/app/lib/validators/alreadyExist.validator';
import { ConfirmedValidator } from 'src/app/lib/validators/confirmPw.validator';
import { patternValidator } from 'src/app/lib/validators/pw.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  emailExits: string[] = []

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, patternValidator()]),
      rePassword: new FormControl('', [Validators.required]),
    },

    [ConfirmedValidator('password', 'rePassword')]
  );

  constructor(private authService: AuthService, private router : Router) {}

  async onSubmit() {
    console.log(this.registerForm);
    if (!this.registerForm.valid) {
      return;
    }

    const body = this.registerForm.value;
    delete body.rePassword;
    this.authService.register(body).subscribe({
      next: (res: RegisterModelResponse) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registered successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        this.authService.setAuthUser(res);
        this.registerForm.reset();
        this.router.navigate(['/'])
      },
      error: (err: HttpErrorResponse) => {
        console.log("🚀 ~ file: register.component.ts:53 ~ RegisterComponent ~ this.authService.register ~ err:", err)
        if(err?.error?.field==="email"){
          this.emailExits.push(body.email)
          this.registerForm.get('email')?.addValidators(alreadyExistValidator<string>(this.emailExits))
          this.registerForm.get('email')?.updateValueAndValidity()
        }
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.error?.message || "Cannot continue",
          showConfirmButton: false,
          timer: 1500,
        })
      },
      complete: () => {
        console.log('completed');
      },
    });
    console.log(this.registerForm.value);
  }

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {}
}
