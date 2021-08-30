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

He probado si hay alguna forma de que angular injecte _assets/js/neutralino.js_ en _index.html_ pero no encuentro la forma...
