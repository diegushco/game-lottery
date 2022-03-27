import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideComponent } from './aside.component';

describe('AsideComponent', () => {
  let component: AsideComponent;
  let fixture: ComponentFixture<AsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsideComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check placeBetAction method is defined', () => {
    expect(component.placeBetAction).toBeDefined();
  });

  it('Check btnOk method is defined', () => {
    expect(component.btnOk).toBeDefined();
  });

  it('should emit on placeBetAction', () => {
    spyOn(component.placeBet, 'emit');

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('gr-btn');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.placeBet.emit).toHaveBeenCalledWith(true);
  });
});
