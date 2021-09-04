import { Component } from '@angular/core';
import { environment } from "../environments/environment";


import * as MarkdownIt from 'markdown-it';

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

declare const Neutralino: any;
Neutralino.init();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  md: MarkdownIt = new MarkdownIt({ html: true });
  html: any = "<h1>hosd</h1>";
  env: any = environment.production;
  log: any;
  keymap: any;
  htmlIframe: any;

  // No creo que necesito todo lo arriba...

  constructor() {
    // this.md = new MarkdownIt({ html: true });
  }

  // @ViewChild('ref') ref!: ElementRef<HTMLTextAreaElement>;
  // @ViewChild('iframe') iframe!: ElementRef<any>;

  //   value = "# Hola";
  //   codeMirror?: EditorFromTextArea;
  //   // Esto serviría para gestionar las opciones para el usuario
  //   options: any;
  // 
  //   // De momento no voy a usar matrix
  //   themeDark: string = "the-matrix";
  // 
  //   themeLigt: string = "solarized";
  //   theme: string = this.themeLigt + " dark";
  // 
  //   ngAfterViewInit() {
  //     this.codeMirror = CodeMirror.fromTextArea(this.ref.nativeElement, {
  //       keyMap: "vim",
  //       mode: "markdown",
  //       autofocus: true,
  //       theme: this.theme,
  //       lineNumbers: true,
  //       indentUnit: 2,
  //       smartIndent: true,
  //       lineWrapping: true,
  //     });
  //     this.codeMirror.setSize("100%", "100%")
  // 
  //     this.codeMirror.on("change", (cMirror: any) => {
  // 
  //       // tengo que crear un canal de datos entre iframe y codemirror
  //       // donde iframe tiene un documento determinado con estilos
  //       // y codemirror solo injecta el body
  // 
  //       // IMPORTANTE  aquí es donde se envia el html
  //       this.value = this.md.render(cMirror.getValue())
  //       this.postIframe(this.value)
  //     })
  //   }
  // 
  //   async getUser() {
  //     this.log = "hola";
  // 
  //     let response = await Neutralino.os.getEnvar({
  //       key: 'USER'
  //     });
  //     this.log = `Welcome ${response.value}!`;
  //   } // getUser()
  // 
  // 
  // 
  //   saveIframe() {
  //     // esto me devuelve el documento completo
  //     // quizá debería limpiarlo quitando scripts??
  //     let algo = this.iframe.nativeElement.contentWindow.window;
  //     console.log(algo)
  //   }
  // 
  //   printIframe() {
  //     this.iframe.nativeElement.contentWindow.postMessage({ print: true }, '*');
  //   }
  // 
  //   // el tema  del load y reload es que para que funcione el preview necesito
  //   //  que se reinicie la página y así se asignan las posiciones no dinámicamente
  //   // xq de forma dinámica me da muchos fallos.
  //   loadIframe() {
  //     this.postIframe(this.value);
  //   }
  // 
  //   reloadIframe() {
  //     this.iframe.nativeElement.contentWindow.postMessage({ reload: true }, '*');
  //   }
  // 
  //   postIframe(content: any) {
  //     this.iframe.nativeElement.contentWindow.postMessage({ html: `${content}` }, '*');
  //   }
  // 
  //   // Estas variables de abajo vendrán desde ficheros creo
  // 
  //   iframeCss =
  //     `
  //       h1 { color: red; margin: 0;}
  //     `;
  // 
  //   iframeContent =
  //     `data:text/html,
  //     <!DOCTYPE html>
  //     <html lang="en">
  //       <head>
  //         <title></title>
  //         <meta charset="UTF-8">
  //         <meta name="viewport" content="width=device-width, initial-scale=1">
  //         <link href="assets/style.css" rel="stylesheet">
  //         <style>
  //           ${this.iframeCss}
  //         </style>
  //       </head>
  //       <body>
  // 
  //       <div class="contenido"></div>
  // 
  //       <script>
  //         window.onmessage = function(event){
  //             if (event.data.html) {
  //               document.querySelector(".contenido").innerHTML = event.data.html;
  //             } else if (event.data.print) {
  //               window.print()
  //             } else if (event.data.reload) {
  // 
  //               window.location.reload();
  //             }
  //         };
  //       </script>
  // 
  //       </body>
  //     </html>
  // `;
}
