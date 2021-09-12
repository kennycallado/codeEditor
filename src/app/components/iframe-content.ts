export class IframeContent {
  checksJs = function() {
  }

  mainJs = function() {
    /* OBSERVER */
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
    })

    const pageSize = metricsToPixels("297mm")
    let pages: number = 0;

    /*@ts-ignore*/
    resizeObserver.observe(document.querySelector(".contenido"));










    /* CHECKERS */
    /* breaks */
    /*@ts-ignore*/
    window.checkBefore = function checkBefore() {
      let breakBeforeElements = document.querySelectorAll(".break-before");

      /*@ts-ignore*/
      for (let element of breakBeforeElements) {
        element.style.margin = "";

        let prevSibling = element.previousElementSibling;
        let elementOffsetTop = element.offsetTop;
        /*@ts-ignore*/
        let page = Math.ceil(elementOffsetTop / pageSize);
        /*@ts-ignore*/
        let marginToAdd = parseInt((pageSize * page) + 1) - elementOffsetTop;

        if (prevSibling) {
          prevSibling.style.marginBottom = `${marginToAdd + 1}px`;
        }
      }
    }

    /* images */
    /*@ts-ignore*/
    window.checkImages = function checkImages() {
      /* De alguna forma tengo que recibir el array de imagenes */
      let imagesList = [];
      let imgElements = document.querySelectorAll("img");

      /*@ts-ignore*/
      for (let element of imgElements) {
        /*por cada elemento voy a sustituir su src por*/
        /*el que obtenga de la imagesList*/
        /*debe haber igualdad en los nombres de alguna forma*/
        /*creo que el usuario pondrá image-1 en el src */
        /*esto será sustituido por igual nombre en imagesList*/
        /*windows.imagesList contiene array [{name: ..., content}]*/

        /*@ts-ignore*/
        window.imagesList.find((item) => {
          item.name == element.src;
        })
      }
    }

    /* OTRO APARTADO */
    /* relacionado con el resizeObserver */
    function createPage() {
      pages++;
      let hr = document.createElement("hr");
      hr.classList.add("show-line-break");
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



    /* TOOLS */
    /* Debe recibir string con mm - lo que vendría de style por ejemplo */
    function metricsToPixels(value: string): number {
      let valueNumber: number = parseInt(value.slice(0, -1));

      return Math.ceil((valueNumber * getDPI()) / Number(25.4))
    }

    /* Debe recibir string con px - lo que vendría de style por ejemplo */
    function pixelsToMetrics(value: string): number {
      let valueNumber: number = parseInt(value.slice(0, -1));

      return Math.floor((valueNumber / getDPI()) * Number(25.4))
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
  }

  css: string =
    `
      * {
        margin: 0;
        padding: 0;
      }
      
      body {
        width: 210mm;
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

        p > img {
          display: block;
        }

        img {
          width: 50%;
          margin: 0 auto;
        }
      }
    `;

  html: string =
    `data:text/html,
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Testing</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="assets/style.css" rel="stylesheet">
        <style>
          ${this.css}
        </style>
      </head>
      <body>

      <div class="contenido"></div>


      <script>
        window.imagesList = []
      </script>

      <script>
        window.onmessage = function(event){
            if (event.data.html) {
              /*Cada vez que llega contenido desde editor*/
                
                /*Injecta al dom*/
              document.querySelector(".contenido").innerHTML = event.data.html;
                /*comprueba imagenes*/

              /*Busca todos elementos img*/
              let imageElements = document.querySelectorAll("img");
              if(imageElements.length > 0 && window.imagesList.length > 0){

                /*Por cada elemento que encuentra*/
                for(let element of imageElements) {

                  /*busca src en imageslist name*/
                  let foundElement;
                  foundElement = window.imagesList.find((listElement) => {
                    return listElement.name === element.src;
                  });

                  if(foundElement) {
                    element.src = foundElement.content;
                  }
                }
                  /*element.src = window.imagesList[0].content*/
              }

                /*Comprueba saltos de línea*/
              window.checkBefore();
                /*Devuelve el tamaño del iframe*/
                /*para redimensionar el espacio en el padre*/
              window.top.postMessage({perro: true, height: document.body.clientHeight}, '*');
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
            } else if(false) {}
        }
      </script>

      <script>
      /*Creo que esto no me hace falta ya*/
        (function(t,e,o){"use strict";function r(t,e,r,p){r=r||"width";var n,l,m,c=(e.match(s)||[])[2],f="px"===c?1:d[c+"toPx"],u=/r?em/i;if(f||u.test(c)&&!p)t=f?t:"rem"===c?i:"fontSize"===r?t.parentNode||t:t,f=f||parseFloat(a(t,"fontSize")),m=parseFloat(e)*f;else{n=t.style,l=n[r];try{n[r]=e}catch(x){return 0}m=n[r]?parseFloat(a(t,r)):0,n[r]=l!==o?l:null}return m}function a(t,e){var o,n,i,l,d,c=/^top|bottom/,f=["paddingTop","paddingBottom","borderTop","borderBottom"],u=4;if(o=m?m(t)[e]:(n=t.style["pixel"+e.charAt(0).toUpperCase()+e.slice(1)])?n+"px":"fontSize"===e?r(t,"1em","left",1)+"px":t.currentStyle[e],i=(o.match(s)||[])[2],"%"===i&&p)if(c.test(e)){for(l=(d=t.parentNode||t).offsetHeight;u--;)l-=parseFloat(a(d,f[u]));o=parseFloat(o)/100*l+"px"}else o=r(t,o);else("auto"===o||i&&"px"!==i)&&m?o=0:i&&"px"!==i&&!m&&(o=r(t,o)+"px");return o}var p,n=e.createElement("test"),i=e.documentElement,l=e.defaultView,m=l&&l.getComputedStyle,s=/^(-?[\d+\.\-]+)([a-z]+|%)$/i,d={},c=[1/25.4,1/2.54,1/72,1/6],f=["mm","cm","pt","pc","in","mozmm"],u=6;for(i.appendChild(n),m&&(n.style.marginTop="1%",p="1%"===m(n).marginTop);u--;)d[f[u]+"toPx"]=c[u]?c[u]*d.inToPx:r(n,"1"+f[u]);i.removeChild(n),n=o,t.Length={toPx:r}})(this,this.document);
      </script>

      <script>
        (${this.mainJs})()
      </script

      </body>
    </html>
`;
}
