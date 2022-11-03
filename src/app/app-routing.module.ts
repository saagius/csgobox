import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoxesComponent } from './boxes/boxes.component';
import { BoxDetailComponent } from './boxDetail/boxDetail.component';

const routes: Routes = [
  {
    path: 'boxes',
    component: BoxesComponent,
    data: { title: 'CS Go Box' }
  },
  {
    path: 'box/:id',
    component: BoxDetailComponent,
    data: { title: 'CS Go Box' }
  },
  {
    path: '',
    redirectTo: '/boxes',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/boxes',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
