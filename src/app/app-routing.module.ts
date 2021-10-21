import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './layout/content/content.component';
import { content } from './share/routes/content.route';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: content,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        relativeLinkResolution: 'legacy',
        scrollPositionRestoration: 'enabled'
      })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
