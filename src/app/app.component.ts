import { Component } from '@angular/core';
import { environment } from "../environments/environment";

declare const Neutralino: any;
Neutralino.init();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  env: any = environment.production;
  log: any;

  async getUser() {
    this.log = "hola";

    let response = await Neutralino.os.getEnvar({
      key: 'USER'
    });
    this.log = `Welcome ${response.value}!`;
  } // getUser()
}
