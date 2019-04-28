import { Component } from '@angular/core';
declare var pendo: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() { }

  ngOnInit() {
    pendo.initialize({
      visitor: {
          id:              'VISITOR-UNIQUE-ID'
      },

      account: {
          id:           'ACCOUNT-UNIQUE-ID'
      }
    });
  }
}
