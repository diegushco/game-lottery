import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'gr-main-box',
  templateUrl: './main-box.component.html',
  styleUrls: ['./main-box.component.scss']
})
export class MainBoxComponent implements OnInit {

  /**
   * Titulo de la caja (hay 2 cajas principales, mitad
   *  de pantalla hacia arriba y mita hacia abajo)
   */
  @Input() titlebox = "";

  /**
   * Mensaje de la app para validacion o segundos del timer
   */
  @Input() msg = "";

  /**
   * Alineacion del titulo de las cajas
   */
  @Input() alignt = "left";

  /**
   * Bolas para seleccionar
   */
  @Input() balls:any = null;

  /**
   * Se recibe si las bolas son clickeables o no
   */
  @Input() clickeable:any = null;

  /**
   * Bolas seleccionadas se notifican al componente padre
   */
  @Output() ballSelected = new EventEmitter<any>();

  /**
   * Se notifica a padre si se va limpiar para comenzar nuevo juego
   */
  @Output() clear = new EventEmitter<any>();

  /**
   * Obsservable de mensaje para timer o validacion
   */
  msgEnd$:Observable<string> = new Observable();

  /**
   * Constructor del componente
   * @param utilsService 
   */
  constructor(private utilsService:UtilsService) { }

  /**
   * Init del componente
   */
  ngOnInit(): void {
    this.msgEnd$ = this.utilsService.msgGameEnd;
  }

  /**
   * Bola seleccionada y emision de la misma
   * @param ball 
   */
  selectBall(ball:any){
    this.ballSelected.emit(ball);
  }

  /**
   * Se notifica que va comenzar nuevo juego
   */
  clearSelection(){
    this.clear.emit(true);
  }
}
