import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  error: string;
  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    this.loginService.requestLogin(this.username, this.password).subscribe({
      next: (response) => {
        this.loginService.setLocalStorage(response.access_token);
        this.router.navigate(['/album']);
      },
      error: (error) => {
        console.log(error);
        this.error = 'Não foi possível realizar o login.';
      },
    });
  }

  ngOnInit(): void {
    // if (this.loginService.getAccessToken()) {
    //   this.router.navigate(['/album']);
    // }
  }
}
