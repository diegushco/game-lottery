import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'gr-btn',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  /**
   * Tipo de boton, si de bloque o no
   */
  @Input() block = false;

  /**
   * Construtor del componente
   */
  constructor() { }

}
