import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {

    this.regresaObservable()
    .subscribe(
       numero =>  console.log( 'subs: ', numero ),
       error => console.error ('Error en el observador', error),
       () => console.log('El observador terminó')
    );

  }

  ngOnInit() {
  }


  regresaObservable(): Observable<any> {
    return new Observable(  (observer: Subscriber<any>) => {
      let contador = 0;

      const intervalo = setInterval( () => {
        contador ++;

        const salida = {
          valor: contador
        }

        observer.next( salida );

        if ( contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }

        // if (contador === 2) {
        //   // clearInterval(intervalo);
        //   observer.error('mal');
        // }

      }, 1000);

    }).pipe( 
          // map( resp => resp.valor ) forma corta
          map( resp => {
            return resp.valor
          }
        ), 
        //filtro para devolver solo los impares
        filter( (valor, index) => {

          if ( (valor % 2) === 1 ){
            //impar
            return true 
          } else{
            //par
            return false

          }
        })
    );
  }
}
