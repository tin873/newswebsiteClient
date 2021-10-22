import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCategoryComponent } from '../containers/managerment/addCategory/addCategory.component';
import { CategoryViewModel } from '../models/view-models/category.models';


@Injectable()
export class PupUpDetailCategoryService {

  constructor(private modalService: NgbModal) { }

  public openPupup(
    titleButton: string,
    categoryDetail: CategoryViewModel,
    dialogSize: 'sm' | 'lg'): Promise<boolean> {
    const modalRef = this.modalService.open(AddCategoryComponent, { size: dialogSize });
    modalRef.componentInstance.titleButton = titleButton;
    modalRef.componentInstance.categoryDetail = categoryDetail;
    return modalRef.result;
  }

  public close(): void {
    return this.modalService.dismissAll();
  }
}
