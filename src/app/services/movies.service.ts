import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import { Actor } from './actors.service';

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  cast: Array<{
    id: number,
    name: string
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  url = environment.apiServerUrl;
  public active_movie: Movie;
  public items: {[key: number]: Movie} = {};

  constructor(private auth: AuthService, private http: HttpClient, public toastController: ToastController) { }

  getHeaders() {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.auth.activeJWT()}`)
    };
    return header;
  }

  getMovies() {
    if (this.auth.can('get: movies')) {
      this.http.get(this.url + '/movies', this.getHeaders())
      .subscribe((res: any) => {
        if (res.success) {
          this.moviesToItems(res.movies);
        } 
        else if (!res.success) {
          this.presentToast("danger", "Error: " + res.error + ": " + res.message)
        }
      });
    }
  }

  postMovie(title: string, release_date: string) {
    try {
      if(this.auth.can('post: movies')) {
        this.http.post(this.url + '/movies', {
          "title": title,
          "release_date": release_date
        }, this.getHeaders())
        .subscribe((res: any) => {
          if (res.success) {
            this.presentToast("primary", "Movie added to database")
          } 
          else if (!res.success) {
            this.presentToast("danger", "Error: " + res.error + ": " + res.message)
          }
        })
      }
    } catch(error) {
      console.log(error)
    }
  }

  patchMovie(editedMovie: Movie) {
    if(this.auth.can('patch: movies')) {
      this.http.patch(this.url + '/movies/' + editedMovie.id, {
        "title": editedMovie.title,
        "release_date": editedMovie.release_date,
        "cast": editedMovie.cast
      }, this.getHeaders())
      .subscribe((res: any) => {
        if (res.success) {
          this.presentToast("primary", "Movie updated in database")
        } 
        else if (!res.success) {
          this.presentToast("danger", "Error: " + res.error + ": " + res.message)
        }
      })
    }
  }

  deleteMovie(movieId: number) {
    if(this.auth.can('delete: movies')) {
      this.http.delete(this.url + '/movies/' + movieId, this.getHeaders()).subscribe((res: any) => {
        if (res.success) {
          this.presentToast("primary", "Movie deleted from database")
        } 
        else if (!res.success) {
          this.presentToast("danger", "Error: " + res.error + ": " + res.message)
        }
      })
    }
  }

  moviesToItems(movies: Array<Movie>) {
    for (const movie of movies) {
      this.items[movie.id] = movie;
    }
  }


  async presentToast(color: string, message: string) {
    const toast = await this.toastController.create({
      color: color,
      message: message,
      duration: 2000
    });
    toast.present();
  }
  
}
