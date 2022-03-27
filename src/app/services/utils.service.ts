import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  /**
   * Inicializar cantidad de bolas en 0
   */
  qtyBalls = 0;
  /**
   * Cantidad de dinero en 0 la primera vez
   */
  moneyToBet = 0;
  /**
   * Manejo de bolas que van saliendo
   */
  ballsOut = [];
  /**
   * Mensaje para finalizar juego
   */
  msgGameFinish = '';

  /**
   * Subject para subscribirse desde el componente a cuantas bolas van
   */
  ballsComeOut: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  /**
   * Subject para subscribirse desde el componente de que mensaje mostrar (you win/you lost)
   */
  msgGameEnd: BehaviorSubject<string> = new BehaviorSubject<any>('');

  /**
   * Cantidad de bolas que va seleccionando el gamer
   */
  qtyBallsChange: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  /**
   * Cantidad de dinero que se esta apostando
   */
  moneyChange: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  /**
   * Constructor del servicio para actualizar variables
   */
  constructor() {
    this.qtyBallsChange.subscribe((value: number) => {
      this.qtyBalls = value;
    });
    this.moneyChange.subscribe((value: number) => {
      this.moneyToBet = value;
    });

    this.ballsComeOut.subscribe((value: any) => {
      this.ballsOut = value;
    });

    this.msgGameEnd.subscribe((value: string) => {
      this.msgGameFinish = value;
    });
  }

  /**
   * Seteamos nueva cantidad de bolas
   * @param num
   */
  chgQtyBalls(num: number) {
    this.qtyBallsChange.next(num);
  }

  /**
   * Seteamos array con bolas que van saliendo con el timer
   * @param arr
   */
  chgballsComeOut(arr: any) {
    this.ballsComeOut.next(arr);
  }

  /**
   * Seteamos mensaje (you won/you lost)
   * @param msg 
   */
  chgMsgGameEnd(msg: string) {
    this.msgGameEnd.next(msg);
  }

  /**
   * Cambiamos dinero que se apuesta
   * @param amount
   */
  chgMoneyToBet(amount: number) {
    this.moneyChange.next(amount);
  }

  /**
   * Retornamos dinero que se esta apostando
   * @returns
   */
  getMoneyToBet() {
    return this.moneyToBet;
  }

  /**
   * Retornamos cantidad de bolas apostadas
   * @returns 
   */
  getBallsToBet() {
    return this.qtyBalls;
  }
}
