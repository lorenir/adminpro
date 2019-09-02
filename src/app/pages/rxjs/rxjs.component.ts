import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {

    this.regresaObservable().pipe(
      retry(2)
    )
    .subscribe(
       numero =>  console.log( 'subs: ', numero ),
       error => console.error ('Error en el observador', error),
       () => console.log('El observador terminó')
    );

  }

  ngOnInit() {
  }


  regresaObservable(): Observable<number> {
    return new Observable(  observer => {
      let contador = 0;

      const intervalo = setInterval( () => {
        contador ++;
        observer.next( contador );

        if ( contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (contador === 2) {
          // clearInterval(intervalo);
          observer.error('mal');
        }

      }, 1000);

    });
  }
}
