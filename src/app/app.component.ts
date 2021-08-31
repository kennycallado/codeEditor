import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from "../environments/environment";

import { EditorFromTextArea } from 'codemirror';

/*
 * Tengo que determinar donde hacer la importación.
 * Opciones:
 * - Aquí
 * - main.ts
 * - index.html // esta opción me obliga a ponerlos en angular.json
 * - angular.json
*/
import 'codemirror/mode/markdown/markdown';
import "codemirror/keymap/vim"
import * as CodeMirror from "codemirror"
// declare const CodeMirror: any;

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

  keymap: any;

  @ViewChild('ref') ref!: ElementRef<HTMLTextAreaElement>;

  value = "# hola";
  codeMirror?: EditorFromTextArea;
  // Esto serviría para gestionar las opciones para el usuario
  options: any;

  // De momento no voy a usar matrix
  themeDark: string = "the-matrix";

  themeLigt: string = "solarized";
  theme: string = this.themeLigt + " dark";

  ngAfterViewInit() {
    this.codeMirror = CodeMirror.fromTextArea(this.ref.nativeElement, {
      keyMap: "vim",
      mode: "markdown",
      autofocus: true,
      theme: this.theme,
      lineNumbers: true,
      indentUnit: 2,
      smartIndent: true,
      lineWrapping: true,
    });
  }

  async getUser() {
    this.log = "hola";

    let response = await Neutralino.os.getEnvar({
      key: 'USER'
    });
    this.log = `Welcome ${response.value}!`;
  } // getUser()
}
