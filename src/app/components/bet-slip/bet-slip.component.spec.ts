import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetSlipComponent } from './bet-slip.component';

describe('BetSlipComponent', () => {
  let component: BetSlipComponent;
  let fixture: ComponentFixture<BetSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BetSlipComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check setMoney method is defined', () => {
    expect(component.setMoney).toBeDefined();
  });

  it('should emit on setMoney', () => {
    spyOn(component.ok, 'emit');

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('gr-btn');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.ok.emit).toHaveBeenCalledWith(true);
  });
});
