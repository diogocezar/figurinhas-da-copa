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
  errors: string[] = [];

  constructor(
    private signInService: SignInService,
    private router: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  isFormValid(): boolean {
    if (!this.form.valid) {
      this.errors = [];
      if (this.form.controls.name.errors?.required)
        this.errors.push('O nome é obrigatório.');
      if (this.form.controls.name.errors?.minlength)
        this.errors.push('O nome deve ter no mínimo 3 caracteres.');
      if (this.form.controls.email.errors?.required)
        this.errors.push('O email é obrigatório.');
      if (this.form.controls.email.errors?.email)
        this.errors.push('O email é inválido.');
      if (this.form.controls.password.errors?.required)
        this.errors.push('A senha é obrigatória.');
      if (this.form.controls.password.errors?.minlength)
        this.errors.push('A senha deve ter no mínimo 6 caracteres.');
      if (this.form.controls.passwordCheck.errors?.required)
        this.errors.push('A confirmação de senha é obrigatória.');
      if (
        this.form.get('password').value !== this.form.get('passwordCheck').value
      )
        this.errors.push('As senhas não conferem.');
      return false;
    }
    return true;
  }

  create() {
    console.log(this.form);
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
