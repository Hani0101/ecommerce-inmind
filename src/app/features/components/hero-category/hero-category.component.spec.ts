import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCategoryComponent } from './hero-category.component';

describe('HeroCategoryComponent', () => {
  let component: HeroCategoryComponent;
  let fixture: ComponentFixture<HeroCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
