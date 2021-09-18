import { Component, ElementRef, ViewChild } from '@angular/core';
import { CoverFlorida } from './components/cover-florida';
import { ImagesService } from './services/images.service';
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
  printableHeight: any;
  imageSrc: any;
  constructor(private markdownIt: MarkdownItService, private imageService: ImagesService) {
    window.addEventListener("message", (event) => {
      if (event.data.height) {
        this.printableHeight = event.data.height;
      } else if (event.data.saludo) {
        console.log(event.data.saludo);
      } else if (event.data.cover) {
        this.imprimir(CoverFlorida.html);
      }
    })

    /*para images*/

    // this.iframe.nativeElement.contentWindow?.postMessage({ print: true }, '*');

    this.imageService.imagesList.subscribe((imagesList: File[]) => {
      if (imagesList.length > 0) {
        for (const image of imagesList) {
          let imageName = image.name;
          let reader = new FileReader();
          reader.onload = (event) => {
            this.printable.nativeElement.contentWindow?.postMessage({ images: true, name: imageName, content: event.target?.result }, '*');
          }
          reader.readAsDataURL(image);
        }
      }
    })
  }

  /* así si que funciona!!1 oog que bien*/
  imprimir(cover?: any) {
    this.printable.nativeElement.contentWindow?.postMessage({ print: true, cover }, "*");
  }

  printableContent: string =
    `data:text/html,
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Allison&display=swap">

        <style>
          @page { margin: 0; }

          * {
            margin: 0;
            padding: 0;
          }

          p {
            margin-top: 10px;
          }

          ul, ol {
            margin-left: 2rem;
          }

          .break-before { page-break-before: always; }

          .break-after { page-break-after: always; }

          p > img {
            display: block;
            page-break-inside: avoid;
          }

          img {
            width: 50%;
            margin: 0 auto;
          }
        </style>

      </head>
      <body>

      <div class="contenido"></div>

      <script>
        window.imagesList = [];
        window.coverProperties = {};
      </script>

      <script>
        window.checkCoverProperties = (printableCoverElement, editorCoverElement) => {
          /* El cover ya ha sido insertado en dom */

          /*OJO -> hay dos cover... el tag y el element*/

          let coverObject = editorCoverElement.text;

          /*Esto se podría hacer mucho más bonito joder*/
          coverPropertiesObject = JSON.parse(editorCoverElement.textContent);

          let subjectAbrev = document.getElementById("subjectAbrev");
          subjectAbrev.innerText = coverPropertiesObject.subjectAbrev;

          let subject = document.getElementById("subject");
          subject.innerText = coverPropertiesObject.subject;

          let taskAbrev = document.getElementById("taskAbrev");
          taskAbrev.innerText = coverPropertiesObject.taskAbrev;

          let task = document.getElementById("task");
          task.innerText = coverPropertiesObject.task;

          let author = document.getElementById("author");
          author.innerText = coverPropertiesObject.author;

          let date = document.getElementById("date");
          date.innerText = coverPropertiesObject.date;

          /*window.top.postMessage({saludo: "hooo"}, '*');*/
        }
      </script>

      <script>
        window.onmessage = function(event){
            if (event.data.html) {
              document.querySelector(".contenido").innerHTML = event.data.html;

              let imageElemens = document.querySelectorAll("img");
              if(imageElemens.length > 0 && window.imagesList.length > 0) {
                for (let element of imageElemens) {
                  let foundElement;
                  foundElement = window.imagesList.find((listElement) => {
                    return listElement.name === element.src;
                  });

                  if (foundElement) {
                    element.src = foundElement.content;
                  }
                }
              }

            } else if (event.data.print) {

              /*Aquí debería poner intercambio de cover si existe.*/

              let editorCoverElement = document.querySelector("cover");
              if(editorCoverElement) {
                editorCoverElement.style.display = "none";
                /*Si cover tiene contenido con id para sustituir*/
                /*aquí se iria sustituyendo todo*/
                /*eso lo dejo para despues*/

                if (event.data.cover) {
                  /*si viene cover con el print*/
                  let contenido = document.querySelector(".contenido");

                  let section = document.createElement("section");
                  section.id = "cover";
                  section.classList.add("break-after");
                  section.innerHTML = event.data.cover;

                  let style = document.createElement("style");
                  style.innerText = "p { margin: 0; }";

                  /*En algún momento hay que recorrer COVER para modificar contendio*/
                  /*Creo que el mejor momento es tras ser insertado*/

                  section.insertAdjacentElement("afterbegin", style);
                  contenido.insertAdjacentElement("afterbegin", section);

                  /*Osea aquí... pero también tengo que comprobar*/
                  /*si se ha modificado algo...*/


                  window.checkCoverProperties(section, editorCoverElement);


                  window.print();
                } else {
                  /*Si no viene cover con el print*/
                  /*Aquí si ya existe cover no hay que pedirlo*/
                  let sectionCover = document.getElementById("cover");
                  if (sectionCover) {
                    window.print();
                  } else {
                    window.top.postMessage({cover: true}, '*');
                  }
                }
              } else {
                /*Si no hay etiqueta cover pero sí se añadió antes...*/
                let sectionCover = document.getElementById("cover");
                if (sectionCover) { sectionCover.remove(); }
                /*Si no hay cover en el documento*/
                window.print();
              }

            } else if (event.data.images) {

              /* Solo me envian el último */
              let element = event.data;

              /* comprueba si element existe ya */

              let duplicated = window.imagesList.some((item) => {
                return item.name == element.name
              });
              /* Si no está duplicado lo guardo */
              if(!duplicated){
                window.imagesList.push({name: event.data.name, content: event.data.content});
              }
            }
        }
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
