import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statis',
  templateUrl: './statis.component.html',
  styleUrls: ['./statis.component.scss'],
})
export class StatisComponent implements OnInit {
  @Input() albumPercentage?: number;
  @Input() totalStickers?: number;
  @Input() completedStickers?: number;
  @Input() repeatedStickers?: number;

  constructor() {}

  ngOnInit(): void {}
}
