import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CategoryRequest } from 'src/app/pages/models/requests/category.request';
import { CategoryViewModel } from 'src/app/pages/models/view-models/category.models';
import { CategoryService } from 'src/app/pages/services/category.service';
import { UtilityService } from 'src/app/pages/services/utility.service';
@Component({
  selector: 'app-addPost',
  templateUrl: './addCategory.component.html',
  styleUrls: ['./addCategory.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryRequest: CategoryRequest;
  @Input() categoryDetail!: CategoryViewModel;
  @Input() titleButton!: string;
  @BlockUI('blockui') blockUI!: NgBlockUI;
  constructor(
    private activeModal: NgbActiveModal,
    private categoryServices: CategoryService,
    private utility: UtilityService,
    private router: Router
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
    this.utility.showProcessing(this.blockUI);
    if(this.titleButton == "Lưu lại"){
      this.categoryServices.editCategory(this.categoryRequest).subscribe(res => {
        this.utility.showMessage("Sửa thành công.");
        setTimeout(() => {
          location.reload();
        }, 1500);
      });
    }else{
      this.categoryServices.addCategory(this.categoryRequest).subscribe(res => {
        this.utility.cancelProcessing(this.blockUI);
        this.utility.showMessage("Thêm mới thành công.");
        setTimeout(() => {
          location.reload();
        }, 1500);
      });
    }
    this.activeModal.dismiss();
  }
}
