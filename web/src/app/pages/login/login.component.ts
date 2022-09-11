import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errors: string[] = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  isFormValid(): boolean {
    if (!this.form.valid) {
      this.errors = [];
      if (this.form.controls.username.errors?.required)
        this.errors.push('O email é obrigatório.');
      if (this.form.controls.username.errors?.minlength)
        this.errors.push('O nome deve ter no mínimo 3 caracteres.');
      if (this.form.controls.username.errors?.email)
        this.errors.push('O email é inválido.');
      if (this.form.controls.password.errors?.required)
        this.errors.push('A senha é obrigatória.');
      if (this.form.controls.password.errors?.minlength)
        this.errors.push('A senha deve ter no mínimo 3 caracteres.');
      return false;
    }
    return true;
  }

  login() {
    if (!this.isFormValid()) return;
    this.loginService
      .login(this.form.get('username').value, this.form.get('password').value)
      .subscribe({
        next: (response) => {
          this.loginService.setLocalStorage(response.access_token);
          this.router.navigate(['/album']);
        },
        error: (error) => {
          this.toastrService.error('Não foi possível realizar o login.');
        },
      });
  }

  initFormGroup() {
    this.form = this.formBuilder.group({
      username: [
        null,
        [Validators.required, Validators.minLength(3), Validators.email],
      ],
      password: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  createAccount() {
    this.router.navigate(['/create']);
  }

  ngOnInit(): void {
    this.initFormGroup();
    if (this.loginService.getAccessToken()) {
      this.router.navigate(['/album']);
    }
  }
}
