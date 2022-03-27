import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gr-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss']
})
export class BallComponent {

  /**
   * Obteniendo el array de bolas que vamos a renderizar
   */
  @Input() quantity:any = [];

  /**
   * Size de la bola si es small o big
   */
  @Input() size = "big";

  /**
   * Conocer si una bola es clickeable o solo para mostrarla
   */
  @Input() clickeable = false;

  /**
   * Emitimos al componente padre a cual bola se eligio para apostar
   */
  @Output() sendBall = new EventEmitter<any>();

  /**
   * Constructor del component
   */
  constructor() { }

  /**
   * Emitimos al padre la bola seleccionada siempre y cuando sea clickeable
   * @param ball bola seleccionada
   */
  selectBall(ball:any){
    if(this.clickeable){
      this.sendBall.emit(ball);
    }
    
  }

}
