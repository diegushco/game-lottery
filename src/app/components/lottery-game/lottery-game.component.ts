import { Component, OnInit } from '@angular/core';
import { map, Observable, Subscription, timer } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import * as conf from './../../configuration/conf.json';

/**
 * Componente central del juego
 */
@Component({
  selector: 'gr-lottery-game',
  templateUrl: './lottery-game.component.html',
  styleUrls: ['./lottery-game.component.scss'],
})
export class LotteryGameComponent implements OnInit {
  /**
   * Guardamos la configuracion del juego desde el json
   */
  CONF: any = (conf as any).default;

  /**
   * Bola ganadora
   * se muestra en el bloque de abajo de la parte visual
   */
  wonBall = null;

  /**
   * Array de bolas seleccionadas
   */
  arrBallsSelected: Array<any> = [];

  /**
   * Array de bolas a mostrar (con las no seleccionadas o color gris)
   */
  arrBallsToShow: Array<any> = [];

  /**
   * Cantidad de bolas a apostar
   */
  ballsBet = 0;

  /**
   * Manejo del timer para jugar
   */
  timerSubscription: Subscription = new Subscription();

  /**
   * Marca de tiempo para el timer
   */
  secondMark = 1;

  /**
   * Mensaje a mostrar validaciones o tiempo para salir una proxima bola al jugar
   */
  message = '';

  /**
   * Array para acumular el numero que va saliendo mientras se juega
   */
  numbersComeOut: Array<number> = [];

  /**
   * Observable para subscribirse a las bolas que han salido
   * y sincronizar con lo que se muestra visualmente
   */
  ballsComeOut$: Observable<any> = new Observable();

  /**
   * Para setear si las bolas son clickeables o no
   */
  ballsClickeable = true;

  /**
   * Constructor del componente
   * @param utilsService
   */
  constructor(private utilsService: UtilsService) {}

  /**
   * Init del componente
   */
  ngOnInit(): void {
    this.wonBall = this.CONF.defaultBall;

    this.ballsComeOut$ = this.utilsService.ballsComeOut;
  }

  /**
   * Logica de cuando se selecciona una bola
   * se verifica que no sobrepase el total por seleccionar
   * y si esa bola ha sido seleccionada antes o no
   * @param ball
   */
  ballSelected(ball: any) {
    this.message = '';

    if (
      !this.arrBallsSelected.includes(ball) &&
      this.arrBallsSelected.length < this.CONF.qtySelectedGamer
    ) {
      this.arrBallsSelected.push(ball);
      this.ballsBet = this.arrBallsSelected.length;
      this.utilsService.chgQtyBalls(this.ballsBet);

      //para actualizar el input
      this.arrBallsToShow = [...this.arrBallsSelected];

      this.fillArray();
    }
  }

  /**
   * Se llena el array con la bola por default
   * para mostrar las 8 de la conf y no solo las seleccionadas
   */
  fillArray() {
    for (
      let i: number = this.arrBallsToShow.length;
      i < this.CONF.qtySelectedGamer;
      i++
    ) {
      this.arrBallsToShow.push(this.CONF.defaultBall[0]);
    }
    this.arrBallsToShow = [...this.arrBallsToShow];
  }

  /**
   * Accion de limpiar juego para comenzar de nuevo
   * @param clear
   */
  clearSelection(clear: boolean) {
    if (clear) {
      this.arrBallsToShow = [];
      this.arrBallsSelected = [];
      this.numbersComeOut = [];
      this.arrBallsToShow = [...this.arrBallsToShow];
      this.fillArray();
      this.utilsService.chgQtyBalls(0);
      this.utilsService.chgMoneyToBet(0);
      this.wonBall = this.CONF.defaultBall;
      const ballsDefault = [];
      this.utilsService.chgMsgGameEnd('');
      this.ballsClickeable = true;
      for (
        let i: number = ballsDefault.length;
        i < this.CONF.qtySelectedGamer;
        i++
      ) {
        ballsDefault.push(this.CONF.defaultBall[0]);
      }
      this.utilsService.chgballsComeOut(ballsDefault);
    }
  }

  /**
   * Accion de apostar, boton de placebet e iniciar timer y random de numeros
   */
  placeBet() {
    const qtyBallsToBet = this.utilsService.getBallsToBet();
    const moneyToBet = this.utilsService.getMoneyToBet();

    if (qtyBallsToBet != 0 && moneyToBet != 0) {
      this.initTime();
      this.ballsClickeable = false;
    } else {
      this.message = this.CONF.msgZeroBet;
    }
  }

  /**
   * Para comenzar el timer para iniciar juego
   * esto depende de la conf del json (segundos 3)
   */
  initTime() {
    this.timerSubscription = timer(0, 1000)
      .pipe(
        map(() => {
          this.message = this.secondMark.toString();

          if (
            this.secondMark === this.CONF.secondsBetweenBet &&
            this.numbersComeOut.length < this.utilsService.qtyBalls
          ) {
            this.secondMark = 1;
            this.bet();
          } else if (
            this.numbersComeOut.length === this.utilsService.qtyBalls
          ) {
            this.message = '';
            this.timerSubscription.unsubscribe();
            this.checkWin();
          } else {
            this.secondMark++;
          }
        })
      )
      .subscribe();
  }

  /**
   * Logica para obtener random de bola que va salir
   * y luego filtrar que color le pertenece a la bola que sale
   * y pintarla a la derecha como bola que va saliendo
   * en el historial de bolas ganadoras
   */
  bet() {
    const ballRandom = this.getRandom();
    this.numbersComeOut.push(ballRandom);

    const ballFilteredToShow = this.CONF.gameBalls.filter(
      (gb: any) => gb.num === ballRandom
    );

    this.wonBall = ballFilteredToShow;

    const formatBalls = this.numbersComeOut.map((v) => {
      const ballFiltered = this.CONF.gameBalls.find((gb: any) => gb.num === v);

      return ballFiltered;
    });

    for (
      let i: number = formatBalls.length;
      i < this.CONF.qtySelectedGamer;
      i++
    ) {
      formatBalls.push(this.CONF.defaultBall[0]);
    }

    this.utilsService.chgballsComeOut(formatBalls);
  }

  /**
   * Genera numero random para bola ganadora
   * si ya salio, vuelve a repetir hasta que salga uno diferente
   * @returns numero random
   */
  getRandom() {
    let numRandom = Math.floor(Math.random() * this.CONF.gameBalls.length) + 1;

    while (this.numbersComeOut.includes(numRandom)) {
      numRandom = Math.floor(Math.random() * this.CONF.gameBalls.length) + 1;
    }

    return numRandom;
  }

  /**
   * Se chequea si las bolas que han salido
   * son las mismas que ha seleccionado el jugador
   * si son las mismas, es ganadora o perdedora
   */
  checkWin() {
    const numbersGamer = this.arrBallsToShow
      .filter((f) => f.num !== '')
      .map((m) => m.num);

    const orderGamer = numbersGamer.sort((a, b) => a - b);
    const orderRandom = this.numbersComeOut.sort((a, b) => a - b);

    if (this.arraysContainSame(orderGamer, orderRandom)) {
      this.utilsService.chgMsgGameEnd('YOU WIN');
    } else {
      this.utilsService.chgMsgGameEnd('YOU LOST');
    }
  }

  /**
   * Compara dos vectores de numeros y verifica si contienen el mismo contenido
   * @param arr1 array de numeros
   * @param arr2 array de numeros
   * @returns
   */
  arraysContainSame(arr1: Array<number>, arr2: Array<number>) {
    arr1 = Array.isArray(arr1) ? arr1 : [];
    arr2 = Array.isArray(arr2) ? arr2 : [];
    return arr1.length === arr2.length && arr1.every((el) => arr2.includes(el));
  }
}
