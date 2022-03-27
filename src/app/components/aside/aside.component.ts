import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import * as conf from './../../configuration/conf.json';

@Component({
  selector: 'gr-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  /**
   * Archivo de configuracion para el juego
   */
  CONF: any = (conf as any).default;

  /**
   * Array de bolas que se van a pintar y pasar al componente gr-ball
   */
  @Input() selection: Array<any> = [];

  /**
   * Para emitir cuando se le da clic al boton de placeBet
   */
  @Output() placeBet = new EventEmitter<any>();

  /**
   * Para emitir al componetne padre que se acepto nueva apuesta
   */
  @Output() ok = new EventEmitter<boolean>();

  /**
   * Observable para obtener que dinero se esta apostando
   */
  money$: Observable<number> = new Observable();

  /**
   * Observable para conocer que cantidad de bolas se estan apostando
   */
  getQty$: Observable<number> = new Observable();

  /**
   * Constructor del componente
   * @param utilsService Servicio para importar el servicio principal del juego
   */
  constructor(private utilsService: UtilsService) {}

  /**
   * Init del componente
   */
  ngOnInit(): void {
    this.money$ = this.utilsService.moneyChange;
    this.getQty$ = this.utilsService.qtyBallsChange;
    this.selection = new Array(this.CONF.qtySelectedGamer).fill(
      this.CONF.defaultBall[0]
    );
  }

  /**
   * Emitimos al componente padre que se le dio clic a placeBet
   */
  placeBetAction() {
    this.placeBet.emit(true);
  }

  /**
   * Accion de dar clic al boton ok
   * esto es para limpiar el mensaje si
   * falta o no elegir al menos una bola y setear dinero
   */
  btnOk() {
    this.ok.emit(true);
  }
}
