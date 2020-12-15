import { Component, Input, OnInit } from '@angular/core';
import { ThemeModel } from '../../../models/theme.model';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  @Input() theme: ThemeModel;
 
  constructor() { }

  ngOnInit(): void {
  }

}
