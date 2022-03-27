import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Check chgQtyBalls method is defined', () => {
    expect(service.chgQtyBalls).toBeDefined();
  });

  it('Check chgballsComeOut method is defined', () => {
    expect(service.chgballsComeOut).toBeDefined();
  });

  it('Check chgMsgGameEnd method is defined', () => {
    expect(service.chgMsgGameEnd).toBeDefined();
  });

  it('Check chgMoneyToBet method is defined', () => {
    expect(service.chgMoneyToBet).toBeDefined();
  });

  it('Check getMoneyToBet method is defined', () => {
    expect(service.getMoneyToBet).toBeDefined();
  });

  it('Check getBallsToBet method is defined', () => {
    expect(service.getBallsToBet).toBeDefined();
  });
});
