import { Component, OnInit, Input } from '@angular/core';
import { Movie, MoviesService } from 'src/app/services/movies.service';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ActorsService, Actor } from 'src/app/services/actors.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.page.html',
  styleUrls: ['./movie-form.page.scss'],
})
export class MovieFormPage implements OnInit {
  @Input() movie: Movie;
  @Input() isNew: Boolean;
  Object = Object;
  public edited: Boolean = false;
  public castmember;

  constructor(
    private modalController: ModalController,
    public auth: AuthService,
    public movies: MoviesService,
    public actors: ActorsService
  ) { }

  ngOnInit() {
    if (this.isNew) {
      this.movie = {
        id: -1,
        title: '',
        release_date: null,
        cast: [],
      };
    }

    Object.keys(this.movie.cast).forEach(actor => {
      console.log(this.movie.cast[actor].name)
    })
  }

  titleEdited() {
    this.edited = true
  }

  dateEdited() {
    this.edited = true
  }

  addActor(i: number = 0) {
    this.edited = true
    this.movie.cast.splice(i + 1, 0, this.castmember)
    this.castmember = null
  }

  removeActor(i: number) {
    this.edited = true
    this.movie.cast.splice(i, 1)
  }

  saveMovie() {
    if (this.isNew) {
      this.movies.postMovie(this.movie.title, this.movie.release_date);
    }
    else if (!this.isNew) {
      this.movies.patchMovie(this.movie);
    }
    this.dismissModal()
  }

  deleteMovie() {
    this.movies.deleteMovie(this.movie.id);
    this.dismissModal()
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
