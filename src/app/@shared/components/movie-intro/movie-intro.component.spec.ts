import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieIntroComponent } from './movie-intro.component';

describe('MovieIntroComponent', () => {
  let component: MovieIntroComponent;
  let fixture: ComponentFixture<MovieIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieIntroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
