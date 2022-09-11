import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LogoutService } from 'src/services/logout.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private logoutService: LogoutService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.toastrService.info('Você foi deslogado com sucesso.');
    this.logoutService.logout();
  }
}
