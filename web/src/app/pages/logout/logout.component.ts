import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LogoutService } from 'src/services/logout.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(private logoutService: LogoutService, private router: Router) {}

  ngOnInit(): void {
    this.logoutService.logout();
    this.router.navigate(['/login']);
  }
}
