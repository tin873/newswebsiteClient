import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CategoryRequest } from 'src/app/pages/models/requests/category.request';
import { CategoryViewModel } from 'src/app/pages/models/view-models/category.models';
import { CategoryService } from 'src/app/pages/services/category.service';
@Component({
  selector: 'app-addPost',
  templateUrl: './addCategory.component.html',
  styleUrls: ['./addCategory.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryRequest: CategoryRequest;
  @Input() categoryDetail!: CategoryViewModel;
  @Input() titleButton!: string;
  @BlockUI('blockui') blockUI?: NgBlockUI;
  constructor(
    private activeModal: NgbActiveModal,
    private categoryServices: CategoryService
  ){
    this.categoryRequest = new CategoryRequest();
  }
  ngOnInit() {
    if(this.categoryDetail != null)
    {
      this.setCategory();
    }
  }
  setCategory(){
    this.categoryRequest.categoryId = this.categoryDetail.categoryId;
    this.categoryRequest.categoryName = this.categoryDetail.categoryName;
    this.categoryRequest.createdBy =  this.categoryDetail.createdBy;
    this.categoryRequest.createdDate = this.categoryDetail.createdDate;
    this.categoryRequest.description= this.categoryDetail.description;
    this.categoryRequest.modifiedBy = this.categoryDetail.modifiedBy;
    this.categoryRequest.modifiedDate = this.categoryDetail.modifiedDate;
  }
  dismissModal() {
    this.activeModal.dismiss();
  }
  addOrEditCategory(){
    if(this.titleButton == "Lưu lại"){
      this.categoryServices.editCategory(this.categoryRequest).subscribe(res => {
        console.log(res.data);
        location.reload();
      });
    }else{
      this.categoryServices.addCategory(this.categoryRequest).subscribe(res => {
        console.log(res.data);
        location.reload();
      });
    }
    this.activeModal.dismiss();
  }
}
