import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActorFormPage } from './actor-form.page';

describe('ActorFormPage', () => {
  let component: ActorFormPage;
  let fixture: ComponentFixture<ActorFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActorFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
