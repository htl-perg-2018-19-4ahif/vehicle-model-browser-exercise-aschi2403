import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { ModelsComponent } from './models/models.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [{ path: 'models', component: ModelsComponent }, {path: 'about', component: AboutComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatButtonModule, MatCheckboxModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
