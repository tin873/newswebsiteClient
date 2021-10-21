import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoryViewModel } from 'src/app/pages/models/view-models/category.models';
import { RoleViewModel } from 'src/app/pages/models/view-models/role.models';
import { CategoryService } from 'src/app/pages/services/category.service';
import * as fromStore from '../../pages/containers/home/store/post.reducer';
import * as fromActions from '../../pages/containers/home/store/post.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role: RoleViewModel;
  listCategory: CategoryViewModel[];
  constructor(
    private categoryServices: CategoryService,
    private store: Store<fromStore.PostState>
  ) {
    this.role = new RoleViewModel();
    this.listCategory = [];
    this.store.dispatch(fromActions.requestLoadPosts());
  }
  ngOnInit() {
    this.getAllCategory();
    this.getRole();
  }
  getRole(){
    this.role.role = localStorage.getItem("role");
  }
  user(){
    localStorage.setItem("role","user");
    this.getRole();
  }
  manager(){
    localStorage.setItem("role","managerment");
    this.getRole();
  }
  getAllCategory(){
    this.categoryServices.getAll().subscribe(res => {
      this.listCategory = res.data;
      console.log(this.listCategory);
    });
  }
  filterPost(categoryId: any){
    this.store.dispatch(fromActions.getPostByCategory({categoryId: categoryId}));
  }
  fullPost(){
    this.store.dispatch(fromActions.requestLoadPosts());
  }
}
