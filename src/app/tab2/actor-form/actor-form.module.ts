import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActorFormPageRoutingModule } from './actor-form-routing.module';

import { ActorFormPage } from './actor-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActorFormPageRoutingModule
  ],
  declarations: [ActorFormPage]
})
export class ActorFormPageModule {}
