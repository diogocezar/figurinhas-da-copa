import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCreate } from 'src/app/signin/types/UserCreate';
import { SignInService } from 'src/services/signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
  error: string;

  constructor(private signInService: SignInService, private router: Router) {}

  verifyPassword(): boolean {
    if (this.password !== this.passwordCheck) {
      this.error = 'As senhas não conferem.';
      return false;
    } else {
      this.error = '';
    }
    return true;
  }

  create() {
    if (!this.verifyPassword()) return;
    const user: UserCreate = {
      name: this.name,
      email: this.email,
      password: this.password,
    };
    this.signInService.create(user).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.error = 'Houver um erro ao cadastrar o usuário.';
        console.log(error);
      },
    });
  }

  ngOnInit(): void {}
}
