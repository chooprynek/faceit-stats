import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FaceitComponent} from "./faceit.component";

const routes: Routes = [
  {path: '', component: FaceitComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaceitRoutingModule { }
