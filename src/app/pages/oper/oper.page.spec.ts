import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OperPage } from './oper.page';

describe('OperPage', () => {
  let component: OperPage;
  let fixture: ComponentFixture<OperPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
