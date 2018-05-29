import { Component, ViewEncapsulation } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'minimal-ng-example' },
  selector: 'minimal-app',
  styleUrls: ['./app.component.less'],
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor() {}

  ngOnInit() {
    console.log('app.component.ts');
  }
}
