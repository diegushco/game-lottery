import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryGameComponent } from './lottery-game.component';

describe('LotteryGameComponent', () => {
  let component: LotteryGameComponent;
  let fixture: ComponentFixture<LotteryGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LotteryGameComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check ballSelected method is defined', () => {
    expect(component.ballSelected).toBeDefined();
  });

  it('Check fillArray method is defined', () => {
    expect(component.fillArray).toBeDefined();
  });

  it('Check clearSelection method is defined', () => {
    expect(component.clearSelection).toBeDefined();
  });

  it('Check placeBet method is defined', () => {
    expect(component.placeBet).toBeDefined();
  });

  it('Check initTime method is defined', () => {
    expect(component.initTime).toBeDefined();
  });

  it('Check bet method is defined', () => {
    expect(component.bet).toBeDefined();
  });

  it('Check getRandom method is defined', () => {
    expect(component.getRandom).toBeDefined();
  });

  it('Check checkWin method is defined', () => {
    expect(component.checkWin).toBeDefined();
  });

  it('Check arraysContainSame method is defined', () => {
    expect(component.arraysContainSame).toBeDefined();
  });

  it('should ballsComeOut return [] in init', () => {
    fixture.detectChanges();
    component.ballsComeOut$.subscribe((balls) => {
      fixture.detectChanges();
      expect(balls).toEqual([]);
    });
  });

  it('arrays should be equal in method arraysContainSame', () => {
    fixture.detectChanges();

    const arr1 = [1, 2, 6, 3, 9];
    const arr2 = [1, 2, 9, 6, 3];

    const isEqual = component.arraysContainSame(arr1, arr2);
    expect(isEqual).toEqual(true);
  });
});
