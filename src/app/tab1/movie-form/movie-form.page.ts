import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie, MoviesService } from 'src/app/services/movies.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.page.html',
  styleUrls: ['./movie-form.page.scss'],
})
export class MovieFormPage implements OnInit {
  @Input() movie: Movie;
  @Input() isNew: Boolean;
  Object = Object;

  constructor(
    private modalController: ModalController,
    public auth: AuthService,
    public movies: MoviesService
  ) { }

  ngOnInit() {
    console.log(this.isNew)
    if (this.isNew) {
      this.movie = {
        id: -1,
        title: '',
        release_date: null,
        cast: []
      };
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
