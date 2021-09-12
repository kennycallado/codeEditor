import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { MarkdownItService } from 'src/app/services/markdown-it.service';
import { IframeContent } from '../iframe-content';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  @ViewChild('iframe') iframe!: ElementRef<HTMLIFrameElement>
  value: string = "";
  content: IframeContent = new IframeContent();

  constructor(private markdownIt: MarkdownItService, private imageService: ImagesService) {
    this.imageService.imagesList.subscribe((imagesList: File[]) => {
      if (imagesList.length > 0) {
        for (const image of imagesList) {
          let imageName = image.name;
          let reader = new FileReader();
          reader.onload = (event) => {
            this.iframe.nativeElement.contentWindow?.postMessage({ images: true, name: imageName, content: event.target?.result }, '*');
          }
          reader.readAsDataURL(image);
        }
      }
    })
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    // this.markdownIt.value.subscribe(m => this.postIframe(m));
  }

  saveIframe() {
    // esto me devuelve el documento completo
    // quizá debería limpiarlo quitando scripts??
    let document = this.iframe.nativeElement.contentWindow?.window;
    console.log(document);
  }

  printIframe() {
    this.iframe.nativeElement.contentWindow?.postMessage({ print: true }, '*');
  }

  // el tema  del load y reload es que para que funcione el preview necesito
  //  que se reinicie la página y así se asignan las posiciones no dinámicamente
  // xq de forma dinámica me da muchos fallos.
  loadIframe() {
    this.markdownIt.value.subscribe(m => this.postIframe(m));
  }

  reloadIframe() {
    this.iframe.nativeElement.contentWindow?.postMessage({ reload: true }, '*');
  }

  refreshIframe() {
    this.iframe.nativeElement.contentWindow?.postMessage({ refresh: true }, '*')
  }

  postIframe(content: any) {
    this.iframe.nativeElement.contentWindow?.postMessage({ html: `${content}` }, '*');
  }

  iframeToFile() {
    // Esto debería borrar todo el js antes
  }

  // Estas variables de abajo vendrán desde ficheros creo


  private iframeCss =
    `
      * {
        margin: 0;
      }

      p {
        margin-top: 10px;
      }

      @media screen {
        body {
          color: white;
        }

        .break-before {
          color: red;
        }

        .show-line-break {
          padding: 0;
          margin: 0;
          width: 70%;
          position: absolute;
        }
      }
    `;

  iframeMainJs = function() {
    const resizeObserver = new ResizeObserver(entries => {
      let clientHeight = entries[0].target.clientHeight;
      let ceil = Math.ceil(clientHeight / pageSize);

      if (pages < ceil) {
        while (pages < ceil) {
          createPage();
        }
      } else if (ceil < pages && pages > 1) {
        while (ceil < pages) {
          removePage();
        }
      }
      /*@ts-ignore*/
      /*checkNoBreak();*/
    })
    /* Solo puedo usar este típo de comentarios */

    /* INICIO */
    const pageSize = Math.ceil(Number((297 * getDPI()) / Number(25.4)));
    let pages = 0;

    createPage();

    /*@ts-ignore*/
    resizeObserver.observe(document.querySelector(".contenido"));

    /*@ts-ignore*/
    /*window.checkBefore();*/


    /* FUNCITONS */
    function createPage() {
      pages++;
      let hr = document.createElement("hr");
      hr.classList.add("show-line-break");
      /*IMPORTANTE*/
      /*aquí influyen mucho los márgenes*/
      hr.style.top = `${(pageSize * pages)}px`
      document.body.insertAdjacentElement("beforeend", hr);

      document.body.style.height = `${(pageSize * pages) - 1}px`
    }

    function removePage() {
      pages--;
      let hrLeng = document.querySelectorAll("hr").length;
      document.querySelectorAll("hr")[hrLeng - 1].remove();

      document.body.style.height = `${(pageSize * pages) - 1}px`;
    }

    /*@ts-ignore*/
    window.checkBefore = function checkBefore() {
      let breakBeforeElements = document.querySelectorAll(".break-before");

      /*@ts-ignore*/
      for (let element of breakBeforeElements) {
        element.style.margin = "";

        let prevSibling = element.previousElementSibling;
        let elementOffsetTop = element.offsetTop;
        let page = Math.ceil(elementOffsetTop / pageSize);
        /*@ts-ignore*/
        let marginToAdd = parseInt((pageSize * page) + 1) - elementOffsetTop;

        logger(marginToAdd)
        /* logger(`offsetTop: ${elementOffsetTop} - getBounding: ${element.getBoundingClientRect().top} - client: ${element.clientTop}`) */

        if (prevSibling) {
          prevSibling.style.marginBottom = `${marginToAdd + 1}px`;
        }
      }
    }

    function getDPI() {
      let div = document.createElement("div");
      div.style.height = "1in";
      div.style.width = "1in";
      div.style.top = "-100%";
      div.style.left = "-100%";
      div.style.position = "absolute";
      document.body.appendChild(div);
      let result = div.offsetHeight;
      document.body.removeChild(div);

      return result;
    }



    /* BORRAR */
    /*@ts-ignore*/
    function logger(params) {
      let logger = document.getElementById("logger");

      /*@ts-ignore*/
      logger.innerText = params;
    }
  }

  iframeContent = this.content.html;

  /* no se está usando*/
  iframeContent2 =
    `data:text/html,
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="assets/style.css" rel="stylesheet">
        <style>
          ${this.iframeCss}
        </style>
      </head>
      <body>

      <div class="contenido"></div>

      <pre id="logger" style="background-color: black; color: white; margin-top: 2rem;">hola</pre>

      <script>
        window.onmessage = function(event){
            if (event.data.html) {
              document.querySelector(".contenido").innerHTML = event.data.html;
              window.checkBefore()
            } else if (event.data.print) {
              window.print()
            } else if (event.data.reload) {
              window.location.reload();
            }
        }
      </script>

      <script>
        (${this.iframeMainJs})()
      </script>

      </body>
    </html>
`;
}
