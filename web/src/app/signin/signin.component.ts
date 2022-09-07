import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCreate } from 'src/app/signin/types/UserCreate';
import { SignInService } from 'src/services/signin.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form: FormGroup;

  constructor(
    private signInService: SignInService,
    private router: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  verifyPassword(): boolean {
    if (
      this.form.get('password').value !== this.form.get('passwordCheck').value
    ) {
      this.toastrService.error('As senhas não conferem.');
      return false;
    }
    return true;
  }

  isFormValid(): boolean {
    if (!this.form.valid) {
      this.toastrService.error('O formilário não está válido.');
      console.log(this.form);
      return false;
    }
    return true;
  }

  create() {
    if (!this.verifyPassword()) return;
    if (!this.isFormValid()) return;
    const user: UserCreate = {
      name: this.form.get('name').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
    };
    this.signInService.create(user).subscribe({
      next: (response) => {
        const successToastr = this.toastrService.success(
          'Usuário criado com sucesso. Redirecionando para o login.',
          'Sucesso'
        );
        successToastr.onHidden.subscribe(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (error) => {
        this.toastrService.error(
          'Houve um erro inesperado ao tentar criar a conta. Tente novamente mais tarde.'
        );
        console.log(error);
      },
    });
  }

  initFormGroup() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      passwordCheck: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.initFormGroup();
  }
}
