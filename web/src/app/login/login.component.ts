import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  login() {
    this.loginService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.loginService.setLocalStorage(response.access_token);
        this.router.navigate(['/album']);
      },
      error: (error) => {
        this.toastrService.error('Não foi possível realizar o login.');
      },
    });
  }

  ngOnInit(): void {
    if (this.loginService.getAccessToken()) {
      this.router.navigate(['/album']);
    }
  }
}
