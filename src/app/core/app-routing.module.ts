import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('../modules/home/home.module').then(m => m.HomeModule)},
  {path: 'player/:nickname', loadChildren: () => import('../modules/faceit/faceit.module').then(m => m.FaceitModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
