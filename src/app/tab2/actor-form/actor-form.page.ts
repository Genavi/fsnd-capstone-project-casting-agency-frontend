import { Component, OnInit, Input } from '@angular/core';
import { Actor, ActorsService } from 'src/app/services/actors.service';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MoviesService } from 'src/app/services/movies.service';
import { NullTemplateVisitor } from '@angular/compiler';

@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.page.html',
  styleUrls: ['./actor-form.page.scss'],
})
export class ActorFormPage implements OnInit {
  @Input() actor: Actor;
  @Input() isNew: Boolean;
  Object = Object;
  public edited: Boolean = false;
  public movieappearance;

  constructor(
    private modalController: ModalController,
    public auth: AuthService,
    public movies: MoviesService,
    public actors: ActorsService
  ) { }

  ngOnInit() {
    if (this.isNew) {
      this.actor = {
        id: -1,
        name: '',
        age: null,
        gender: '',
        movies: []
      };
    }
  }

  nameEdited() {
    this.edited = true
  }

  ageEdited() {
    this.edited = true
  }

  genderEdited() {
    this.edited = true
  }

  addMovie(i: number = 0) {
    this.edited = true
    this.actor.movies.splice(i + 1, 0, this.movieappearance)
    this.movieappearance = null
  }

  removeMovie(i: number) {
    this.edited = true
    this.actor.movies.splice(i, 1)
  }

  saveActor() {
    if (this.isNew) {
      this.actors.postActor(this.actor.name, this.actor.age, this.actor.gender);
    }
    else if (!this.isNew) {
      this.actors.patchActor(this.actor);
    }
    this.dismissModal()
  }

  deleteActor() {
    this.actors.deleteActor(this.actor.id);
    this.dismissModal()
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
