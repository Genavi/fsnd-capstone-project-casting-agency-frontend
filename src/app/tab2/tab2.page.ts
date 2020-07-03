import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { ActorsService, Actor } from '../services/actors.service';
import { MoviesService } from '../services/movies.service';
import { ActorFormPage } from './actor-form/actor-form.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  Object = Object;
  loginURL: string;

  constructor(
    private auth: AuthService,
    private modalController: ModalController,
    public movies: MoviesService,
    public actors: ActorsService
  ) {
    this.loginURL = this.auth.build_login_link('/tabs/actors');
  }

  ngOnInit() {
    this.movies.getMovies();
    this.actors.getActors();
  }

  async presentModal(actor: Actor = null) {
    const modal = await this.modalController.create({
      component: ActorFormPage,
      cssClass: 'actor-form-class',
      componentProps: {
        'actor': actor,
        'isNew': !actor
      }
    });
    modal.onDidDismiss().then(() => {
      this.actors.getActors();
      this.movies.getMovies();
    })

    return await modal.present();
  }

}
