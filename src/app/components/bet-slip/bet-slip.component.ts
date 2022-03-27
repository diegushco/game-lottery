import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'gr-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss']
})
export class BetSlipComponent implements OnInit {

  /**
   * Campo reactivo de dinero
   */
  money = new FormControl('', Validators.required);

  /**
   * Observable para saber que cantidad de bolas se estan apostando
   */
  getQty$:Observable<number> = new Observable();

  /**
   * Emite al padre cuando se apuesta una cantidad de dinero
   */
  @Output() ok = new EventEmitter<boolean>();

  /**
   * Constructor del componente para importar servicio del juego
   * @param utilsService 
   */
  constructor(private utilsService:UtilsService) { }

  /**
   * Init del componente
   */
  ngOnInit(): void {
    this.getQty$ = this.utilsService.qtyBallsChange;
   
    /**
     * Se actualiza campo con lo escrito para sincronizar
     * con el mismo componente cuando se reutiliza
     */
    this.utilsService.moneyChange.subscribe((newValue) => {
      this.money.setValue(newValue, { emitEvent: false })
    });
  }

  /**
   * Setea nueva cantidad de dinero para apostar
   */
  setMoney(){
    this.utilsService.chgMoneyToBet(this.money.value);
    this.ok.emit(true);
  }

}
