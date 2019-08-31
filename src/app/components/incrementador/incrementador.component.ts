import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  @ViewChild('progresoTxt', {static: false}) progresoTxt: ElementRef;


  constructor() {
    console.log('leyenda: ', this.leyenda);
    console.log('progreso: ', this.progreso);

  }

  ngOnInit() {
  }

  onChange(newValor: number){

    if ( newValor >= 100 ) {
      newValor = 100;
    } else  if ( newValor <= 0 ) {
        newValor = 0;
    }


    this.progreso = newValor;

    this.progresoTxt.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);

  }

  cambiarProgreso(valor: number) {

    if ( this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }

    if ( this.progreso <= 0 && valor < 0) {
      this.progreso = 0;

      return;
   }

    this.progreso = this.progreso + valor;
    this.progresoTxt.nativeElement.focus();

    this.cambioValor.emit(this.progreso);
    }

}
