# codeEditor

Editor de markdwon que renderiza html para la previsualización. Permitirá exportar en formato pdf.

## Notas:

1. Importante poner en _app/index.html_ la etiqueta script con el source de neutralino.js sin esto la api no funciona.
2. La api solo funciona cuando hago `ng build`, no funciona sobre el servidor de desarrollo.

Pensaba que el workflow sería:

- Lanzar `ng serve`
- Configurar la url de neutralino para que escuche el servidor
- Ejecuar `neu run`

Esto no funciona al menos no me está funcionando con angular, creo que tiene que ver con el servidor que envía...
debería probar un proyecto sin angular. En ese caso creo que si funcionaría. El servidor angular creo que pone algo de
nosniff

Esto quiere decir que si durante el desarrollo, alguna parte depende directamente del sistema debería usar `ng build` y
no el servidor de desarrollo. Quizá puedo trabajar con el servidor de dsarrollo con valores por defecto y cuando la
aplicación está en producción que realice las llamadas a Neutralino normalmente.

He probado que se podría usar _envairoments_ de angular para comprobar que la aplicación está en modo desarrollo y que
genere valores por defecto para aquello que no se tiene acceso. Algo parecido a lo siguiente:

``` bash
if (!enviroment.production) {}
```

Y en todas las llamadas a `Neutralino` comprobar el modo de la aplicación

He probado si hay alguna forma de que angular injecte _assets/js/neutralino.js_ en _index.html_ pero no encuentro la
forma...

## Notas:

Ahora se trata de integrar codemirror con angular. Una vez que funcione comprobar que también se ejecuta sobre
neutralino. Esto me daba error el ejecutar en neutralino, ya que no ingresaba las dependencias en _index.html_ como he
hecho en el paso anterior. Bueno pues voy a echar un ojo a ver que tal.

Ahora que me acuerdo, esto solo funcionaba con ngx-codemirror, no conesguí integrarlo este paquete.

La parte del CSS es fácil solo hay que importar...

**Bien** he conseguido integrar el editor en la aplicación. Tengo que pensar como voy a manejar las opciones de
configuración. Por ejemplo para seleccionar temas o cosas así..

Me gusta la sombra que tiene _solarized_ pero si pongo el número de línea lo pierde

En _the-matrix_ los número de línea mola, mientras que en solarized no tanto.

Debe haber una opción para activar solarized dark.


**Por fin** Creo que ya lo he entendido. El problema era poner defer en la etiqueta script de neutralino. De este modo
no paraliza la carga de los módulos desde angular.


Quizá podría reducir el contenido de codemirror ya que está haciendo bundle de todo y por eso pesa más la aplicación.
Para ser un aplicación de escritorio no es problema imagino.

Creo que he probado bastante bien que funciona en produción correctamente, creo que puedo pasar a master sin miedo.
Antes voy a hacer algunas mejorar de estilo.

No es nada fácil dar estilo al editor... joder.. voy a seguir mañana

TODO:
- Revisar stilos
- Revisar layout
- Revisar si es necesario tener en assets/js/codemirro

---

Echar un ojo a esta página:

- https://medium.com/@Idan_Co/the-ultimate-print-html-template-with-header-footer-568f415f6d2a
- demo -> https://plnkr.co/edit/lWk6Yd?preview <-

