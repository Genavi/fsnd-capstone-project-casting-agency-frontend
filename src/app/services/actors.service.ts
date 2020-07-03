import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from './movies.service';
import { ToastController } from '@ionic/angular';

export interface Actor {
  id: number;
  name: string;
  age: number;
  gender: string;
  movies: Array<{
    id: number,
    name: string
  }>
}

@Injectable({
  providedIn: 'root'
})
export class ActorsService {
  url = environment.apiServerUrl;
  public items: {[key: number]: Actor} = {};

  constructor(private auth: AuthService, private http: HttpClient, private toastController: ToastController) { }

  getHeaders() {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.auth.activeJWT()}`)
    };
    return header;
  }

  getActors() {
    if (this.auth.can('get: actors')) {
      this.http.get(this.url + '/actors', this.getHeaders())
      .subscribe((res: any) => {
        if (res.success) {
          this.actorsToItems(res.actors);
        } 
        else if (!res.success) {
          this.presentToast("danger", "Error: " + res.error + ": " + res.message)
        }
      });
    }
  }

  postActor(name: string, age: number, gender: string) {
    try {
      if(this.auth.can('post: actors')) {
        this.http.post(this.url + '/actors', {
          "name": name,
          "age": age,
          "gender": gender
        }, this.getHeaders())
        .subscribe((res: any) => {
          if (res.success) {
            this.presentToast("primary", "Actor added to database")
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

  patchActor(editedActor: Actor) {
    if(this.auth.can('patch: actors')) {
      this.http.patch(this.url + '/actors/' + editedActor.id, {
        "name": editedActor.name,
        "age": editedActor.age,
        "gender": editedActor.gender,
        "cast": editedActor.movies
      }, this.getHeaders())
      .subscribe((res: any) => {
        if (res.success) {
          this.presentToast("primary", "Actor updated in database")
        } 
        else if (!res.success) {
          this.presentToast("danger", "Error: " + res.error + ": " + res.message)
        }
      })
    }
  }

  deleteActor(actorId: number) {
    if(this.auth.can('delete: actors')) {
      this.http.delete(this.url + '/actors/' + actorId, this.getHeaders()).subscribe((res: any) => {
        if (res.success) {
          this.presentToast("primary", "Actor deleted from database")
        } 
        else if (!res.success) {
          this.presentToast("danger", "Error: " + res.error + ": " + res.message)
        }
      })
    }
  }

  actorsToItems(actors: Array<Actor>) {
    for (const actor of actors) {
      this.items[actor.id] = actor;
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
