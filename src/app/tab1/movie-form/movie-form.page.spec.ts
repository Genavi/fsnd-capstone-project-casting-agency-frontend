import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MovieFormPage } from './movie-form.page';

describe('MovieFormPage', () => {
  let component: MovieFormPage;
  let fixture: ComponentFixture<MovieFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
