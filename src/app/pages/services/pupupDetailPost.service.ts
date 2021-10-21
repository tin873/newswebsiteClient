import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCategoryComponent } from '../containers/managerment/addCategory/addCategory.component';
import { PostDetailComponent } from '../containers/managerment/postDetail/postDetail.component';
import { PostViewModel } from '../models/view-models/post.models';


@Injectable()
export class PupUpDetailPostService {

  constructor(private modalService: NgbModal) { }

  public openPupup(
    titleButton: string,
    postDetail: PostViewModel,
    dialogSize: 'sm' | 'lg'): Promise<boolean> {
    const modalRef = this.modalService.open(PostDetailComponent, { size: dialogSize });
    modalRef.componentInstance.titleButton = titleButton;
    modalRef.componentInstance.postDetail = postDetail;
    return modalRef.result;
  }

  public close(): void {
    return this.modalService.dismissAll();
  }
}
