import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActorFormPage } from './actor-form.page';

const routes: Routes = [
  {
    path: '',
    component: ActorFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActorFormPageRoutingModule {}
