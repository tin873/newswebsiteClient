import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PostRequest } from 'src/app/pages/models/requests/post.request';
import { CategoryViewModel } from 'src/app/pages/models/view-models/category.models';
import { PostViewModel } from 'src/app/pages/models/view-models/post.models';
import { CategoryService } from 'src/app/pages/services/category.service';
import { PostService } from 'src/app/pages/services/post.service';
import { UtilityService } from 'src/app/pages/services/utility.service';

@Component({
  selector: 'app-addPost',
  templateUrl: './postDetail.component.html',
  styleUrls: ['./postDetail.component.css']
})
export class PostDetailComponent implements OnInit {
  @Input() postDetail!: PostViewModel;
  @BlockUI('blockUI') blockUI!: NgBlockUI;
  @Input() titleButton!: string;
  postRequest: PostRequest;
  url = "../../../../../assets/images/noImage.jpg";
  listCategory: CategoryViewModel[];
  constructor(
    private categoryServices: CategoryService,
    private activeModal: NgbActiveModal,
    private postServices: PostService,
    private utility: UtilityService
  ){
    this.postRequest = new PostRequest();
    this.listCategory = [];

  }
  ngOnInit() {
    this.getAllCategory();
    if(this.postDetail.postId != null)
    {
      this.setpost();
      this.url = this.postDetail.image;
    }
  }
  setpost(){
    this.postRequest.categoryId = this.postDetail.categoryId;
    this.postRequest.title = this.postDetail.title;
    this.postRequest.postId = this.postDetail.postId;
    this.postRequest.content = this.postDetail.content;
    this.postRequest.image = this.postDetail.image;
    this.postRequest.status = this.postDetail.status;
    this.postRequest.createdBy =  this.postDetail.createdBy;
    this.postRequest.createdDate = this.postDetail.createdDate;
    this.postRequest.modifiedBy = this.postDetail.modifiedBy;
    this.postRequest.modifiedDate = this.postDetail.modifiedDate;
  }
  onselectFile(e: any){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event: any)=>{
        this.url = event.target.result;
        console.log(event);
        console.log(this.url);
      }
    }
  }
  getAllCategory(){
    this.categoryServices.getAll().subscribe(res => {
      this.listCategory = res.data;
      console.log(this.listCategory);
    });
  }

  dismissModal() {
    this.activeModal.dismiss();
  }

  addOrEditPost(){
    this.utility.showProcessing(this.blockUI);
    if(this.titleButton == "Lưu lại"){
      this.postRequest.image = this.url;
      this.postServices.editPost(this.postRequest).subscribe(res => {
        this.utility.cancelProcessing(this.blockUI);
        this.utility.showMessage("Sửa thành công.");
        setTimeout(() => {
          location.reload();
        }, 1500);
      });
    }else{
      this.postRequest.image = this.url;
      this.postServices.addPost(this.postRequest).subscribe(res => {
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
