import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LotteryGameComponent } from './components/lottery-game/lottery-game.component';
import { MainBoxComponent } from './components/main-box/main-box.component';
import { AsideComponent } from './components/aside/aside.component';
import { ButtonComponent } from './components/button/button.component';
import { BallComponent } from './components/ball/ball.component';
import { BetSlipComponent } from './components/bet-slip/bet-slip.component';
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [AppComponent, LotteryGameComponent, MainBoxComponent, AsideComponent, ButtonComponent, BallComponent, BetSlipComponent];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
