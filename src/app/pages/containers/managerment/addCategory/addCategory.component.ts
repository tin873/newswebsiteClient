import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CategoryRequest } from 'src/app/pages/models/requests/category.request';
import { CategoryViewModel } from 'src/app/pages/models/view-models/category.models';
import { CategoryService } from 'src/app/pages/services/category.service';
import { UtilityService } from 'src/app/pages/services/utility.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-addCategory',
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
  ){
    this.categoryRequest = new CategoryRequest();
  }
  addCategoryForm = new FormGroup({
    categoryName: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    createdBy: new FormControl('', [Validators.required]),
    createdDate: new FormControl('', [Validators.required]),
    modifiedBy: new FormControl(''),
    modifiedDate: new FormControl('')
    });
  ngOnInit() {
    if(this.categoryDetail != null)
    {
      this.setCategory();
    }
  }
  // setCategory(){
  //   this.categoryRequest.categoryId = this.categoryDetail.categoryId;
  //   this.categoryRequest.categoryName = this.categoryDetail.categoryName;
  //   this.categoryRequest.createdBy =  this.categoryDetail.createdBy;
  //   this.categoryRequest.createdDate = this.categoryDetail.createdDate;
  //   this.categoryRequest.description= this.categoryDetail.description;
  //   this.categoryRequest.modifiedBy = this.categoryDetail.modifiedBy;
  //   this.categoryRequest.modifiedDate = this.categoryDetail.modifiedDate;
  // }
  setCategory(){
    this.addCategoryForm.controls.categoryName.setValue(this.categoryDetail.categoryName);
    this.addCategoryForm.controls.createdBy.setValue(this.categoryDetail.createdBy);
    this.addCategoryForm.controls.createdDate.setValue(this.categoryDetail.createdDate);
    this.addCategoryForm.controls.description.setValue(this.categoryDetail.description);
    this.addCategoryForm.controls.modifiedBy.setValue(this.categoryDetail.modifiedBy);
    this.addCategoryForm.controls.modifiedDate.setValue(this.categoryDetail.modifiedDate);
  }
   SetValueRequest(){
    if(this.categoryDetail.categoryId > 0)
    {
      this.categoryRequest.categoryId = this.categoryDetail.categoryId;
    }
    this.categoryRequest.categoryName = this.addCategoryForm.value.categoryName;
    this.categoryRequest.createdBy = this.addCategoryForm.value.createdBy;
    this.categoryRequest.createdDate = this.addCategoryForm.value.createdDate;
    this.categoryRequest.description = this.addCategoryForm.value.description;
    this.categoryRequest.modifiedBy = this.addCategoryForm.value.modifiedBy;
    this.categoryRequest.modifiedDate = this.addCategoryForm.value.modifiedDate;
  }
  dismissModal() {
    this.activeModal.dismiss();
  }
  addOrEditCategory(){
    this.utility.showProcessing(this.blockUI);
    this.SetValueRequest();
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
