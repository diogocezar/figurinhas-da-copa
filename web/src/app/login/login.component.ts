import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  login(username: string, password: string) {
    this.loginService.login(username, password);
  }

  ngOnInit(): void {}
}
