import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  isMenuOpen: boolean = false;
  @Output() handleChangeMenu = new EventEmitter();

  constructor() {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  handleMenu(option) {
    this.handleChangeMenu.emit(option);
    if (this.isMenuOpen) this.toggleMenu();
  }

  ngOnInit(): void {}
}
