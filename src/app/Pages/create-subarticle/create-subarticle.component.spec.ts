import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubarticleComponent } from './create-subarticle.component';

describe('CreateSubarticleComponent', () => {
  let component: CreateSubarticleComponent;
  let fixture: ComponentFixture<CreateSubarticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSubarticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
