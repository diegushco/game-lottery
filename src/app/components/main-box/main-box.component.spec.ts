import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBoxComponent } from './main-box.component';

describe('MainBoxComponent', () => {
  let component: MainBoxComponent;
  let fixture: ComponentFixture<MainBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainBoxComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBoxComponent);
    component = fixture.componentInstance;
    component.balls = [1,2,3,4];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check selectBall method is defined', () => {
    expect(component.selectBall).toBeDefined();
  });

  it('Check clearSelection method is defined', () => {
    expect(component.clearSelection).toBeDefined();
  });

  it('should emit on clearSelection', () => {
    spyOn(component.clear, 'emit');
    

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('a');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.clear.emit).toHaveBeenCalledWith(true);
  });


});
