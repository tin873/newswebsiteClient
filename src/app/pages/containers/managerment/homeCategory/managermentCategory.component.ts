import { Component, OnInit } from '@angular/core';
import { CategoryViewModel } from 'src/app/pages/models/view-models/category.models';
import { CategoryService } from 'src/app/pages/services/category.service';
import { ConfirmationDialogService } from 'src/app/pages/services/confirmation-dialog.service';
import { PupUpDetailCategoryService } from 'src/app/pages/services/pupupDetailCategory.service';
@Component({
  selector: 'app-addPost',
  templateUrl: './managermentCategory.component.html',
  styleUrls: ['./managermentCategory.component.css']
})
export class ManagermentCategoryComponent implements OnInit {
  categoryModel: CategoryViewModel;
  listCategory: CategoryViewModel[];
  constructor(
    private pupupDetailCategoryService: PupUpDetailCategoryService,
    private categoryServices: CategoryService,
    private confirmDialog: ConfirmationDialogService,
  ){
    this.categoryModel = new CategoryViewModel();
    this.listCategory = [];
  }
  ngOnInit() {
    this.getAllCategory();
  }
  addNew(){
    this.pupupDetailCategoryService.openPupup("Thêm mới", this.categoryModel, 'lg');
  }
  editCategory(category: any){
    this.pupupDetailCategoryService.openPupup("Lưu lại", category, 'lg');
  }
  getAllCategory(){
    this.categoryServices.getAll().subscribe(res => {
      this.listCategory = res.data;
      console.log(this.listCategory);
    });
  }
  deleteCategory(category: any){
    this.confirmDialog.confirm('Xóa danh mục', 'Bạn chắc chắn muốn xóa danh mục ' + category.categoryName, 'Đồng ý', 'Hủy bỏ', 'sm').then((confirm) => {
      if (confirm) {
        this.categoryServices.deleteCategory(category.categoryId).subscribe(res => {
          if (res.data.data <= 0) {
            // this.utility.showErrorMessage('Lỗi không xóa được sản phẩm');
          } else {
            this.listCategory = this.listCategory.filter(categoryItem => categoryItem != category);
            // this.utility.showMessage('Xóa sản phẩm thành công');
          }
        });
      }
    });
  }
}
