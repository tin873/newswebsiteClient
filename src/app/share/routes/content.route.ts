import { Routes } from '@angular/router';
import { HomeModule } from 'src/app/pages/containers/home/home.module';
import { ManagermentCategoryComponent } from 'src/app/pages/containers/managerment/homeCategory/managermentCategory.component';
import { ManagermentPostComponent } from 'src/app/pages/containers/managerment/homePost/managermentPost.component';

export const content: Routes = [
  { path: '', loadChildren: () => HomeModule },
  { path: 'managermentPost', component: ManagermentPostComponent },
  { path: 'managermentCategory', component: ManagermentCategoryComponent },
];
