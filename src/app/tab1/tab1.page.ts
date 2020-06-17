import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { MoviesService, Movie } from '../services/movies.service';
import { MovieFormPage } from './movie-form/movie-form.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  Object = Object;
  loginURL: string;

  constructor(
    private auth: AuthService,
    private modalController: ModalController,
    public movies: MoviesService
  ) {
    this.loginURL = auth.build_login_link('/tabs/movies');
  }

  ngOnInit() {
    this.movies.getMovies();
  }

  async presentModal(movie: Movie = null) {
    const modal = await this.modalController.create({
      component: MovieFormPage,
      cssClass: 'movie-form-class',
      componentProps: {
        'movie': movie,
        'isNew': !movie
      }
    });
    return await modal.present();
  }

}
