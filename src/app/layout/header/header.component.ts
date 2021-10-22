import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoryViewModel } from 'src/app/pages/models/view-models/category.models';
import { RoleViewModel } from 'src/app/pages/models/view-models/role.models';
import { CategoryService } from 'src/app/pages/services/category.service';
import * as fromStore from '../../pages/containers/home/store/post.reducer';
import * as fromActions from '../../pages/containers/home/store/post.actions';
import { UtilityService } from 'src/app/pages/services/utility.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @BlockUI('blockUI') blockUI!: NgBlockUI;
  role: RoleViewModel;
  listCategory: CategoryViewModel[];
  constructor(
    private categoryServices: CategoryService,
    private store: Store<fromStore.PostState>,
    private utility: UtilityService,
  ) {
    this.role = new RoleViewModel();
    this.listCategory = [];
    this.loadContent();
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
    this.utility.showProcessing(this.blockUI);
    this.store.dispatch(fromActions.getPostByCategory({categoryId: categoryId}));
    this.utility.cancelProcessing(this.blockUI);
  }
  fullPost(){
    this.utility.showProcessing(this.blockUI);
    this.store.dispatch(fromActions.requestLoadPosts());
    this.utility.cancelProcessing(this.blockUI);
  }
  loadContent(){
    this.utility.showProcessing(this.blockUI);
    this.store.dispatch(fromActions.requestLoadPosts());
    this.utility.cancelProcessing(this.blockUI);
  }
}
