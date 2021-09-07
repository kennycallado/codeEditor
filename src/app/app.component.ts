import { Component, ElementRef, ViewChild } from '@angular/core';
import { MarkdownItService } from './services/markdown-it.service';


// import * as MarkdownIt from 'markdown-it';

/*
 * Tengo que determinar donde hacer la importación.
 * Opciones:
 * - Aquí
 * - main.ts
 * - index.html // esta opción me obliga a ponerlos en angular.json
 * - angular.json
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('printable') printable!: ElementRef;
  constructor(private markdownIt: MarkdownItService) {
    window.onmessage = function(event) {
      if (event.data.height) console.log("hol")
    }
  }

  printableContent: string =
    `data:text/html,
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="assets/style.css" rel="stylesheet">
        <style>
          /*ya lo pondré*/
        </style>
      </head>
      <body>

      <div class="contenido"></div>

      <pre id="logger" style="background-color: black; color: white; margin-top: 2rem;">hola</pre>

      <script>
        window.onmessage = function(event){
            if (event.data.html) {
              document.querySelector(".contenido").innerHTML = event.data.html;

              let currentTotalHeight = document.offsetHeight;
              window.top.postMessage({ height: currentTotalHeight }, '*')
            } else if (event.data.print) {
              window.print()
            } 
        }
      </script>

      <script>
        (function(t,e,o){"use strict";function r(t,e,r,p){r=r||"width";var n,l,m,c=(e.match(s)||[])[2],f="px"===c?1:d[c+"toPx"],u=/r?em/i;if(f||u.test(c)&&!p)t=f?t:"rem"===c?i:"fontSize"===r?t.parentNode||t:t,f=f||parseFloat(a(t,"fontSize")),m=parseFloat(e)*f;else{n=t.style,l=n[r];try{n[r]=e}catch(x){return 0}m=n[r]?parseFloat(a(t,r)):0,n[r]=l!==o?l:null}return m}function a(t,e){var o,n,i,l,d,c=/^top|bottom/,f=["paddingTop","paddingBottom","borderTop","borderBottom"],u=4;if(o=m?m(t)[e]:(n=t.style["pixel"+e.charAt(0).toUpperCase()+e.slice(1)])?n+"px":"fontSize"===e?r(t,"1em","left",1)+"px":t.currentStyle[e],i=(o.match(s)||[])[2],"%"===i&&p)if(c.test(e)){for(l=(d=t.parentNode||t).offsetHeight;u--;)l-=parseFloat(a(d,f[u]));o=parseFloat(o)/100*l+"px"}else o=r(t,o);else("auto"===o||i&&"px"!==i)&&m?o=0:i&&"px"!==i&&!m&&(o=r(t,o)+"px");return o}var p,n=e.createElement("test"),i=e.documentElement,l=e.defaultView,m=l&&l.getComputedStyle,s=/^(-?[\d+\.\-]+)([a-z]+|%)$/i,d={},c=[1/25.4,1/2.54,1/72,1/6],f=["mm","cm","pt","pc","in","mozmm"],u=6;for(i.appendChild(n),m&&(n.style.marginTop="1%",p="1%"===m(n).marginTop);u--;)d[f[u]+"toPx"]=c[u]?c[u]*d.inToPx:r(n,"1"+f[u]);i.removeChild(n),n=o,t.Length={toPx:r}})(this,this.document);
      </script>

      <script>
      </script>

      </body>
    </html>
`;

  loadPrintable() {
    this.markdownIt.value.subscribe(m => this.postIframe(m));
  }

  postIframe(content: any) {
    this.printable.nativeElement.contentWindow?.postMessage({ html: `${content}` }, '*');
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
