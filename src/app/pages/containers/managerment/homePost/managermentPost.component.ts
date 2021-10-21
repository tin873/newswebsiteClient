import { Component, OnInit } from '@angular/core';
import { PostViewModel } from 'src/app/pages/models/view-models/post.models';
import { ConfirmationDialogService } from 'src/app/pages/services/confirmation-dialog.service';
import { PostService } from 'src/app/pages/services/post.service';
import { PupUpDetailPostService } from 'src/app/pages/services/pupupDetailPost.service';
@Component({
  selector: 'app-addPost',
  templateUrl: './managermentPost.component.html',
  styleUrls: ['./managermentPost.component.css']
})
export class ManagermentPostComponent implements OnInit {
  listPost: PostViewModel[];
  postModal: PostViewModel;
  constructor(
     private pupupDetailPostService: PupUpDetailPostService,
     private postServices: PostService,
     private confirmDialog: ConfirmationDialogService
  ){
    this.listPost = [];
    this.postModal = new PostViewModel();
  }
  ngOnInit() {
    this.getAllPost();
  }
  openPupUp(){
    this.pupupDetailPostService.openPupup("Thêm mới", this.postModal, 'lg');
  }
  openEditPupUp(post: any){
    this.pupupDetailPostService.openPupup("Lưu lại", post, 'lg');
  }
  getAllPost(){
    this.postServices.getAll().subscribe(res => {
      this.listPost = res.data;
      console.log(this.listPost);
    });
  }
  deletePost(post: any){
    this.confirmDialog.confirm('Xóa bài viết', 'Bạn chắc chắn muốn xóa bài viết ' + post.title, 'Đồng ý', 'Hủy bỏ', 'sm').then((confirm) => {
      if (confirm) {
        this.postServices.deletePost(post.postId).subscribe(res => {
          if (res.data.data <= 0) {
            // this.utility.showErrorMessage('Lỗi không xóa được sản phẩm');
          } else {
            this.listPost = this.listPost.filter(postItem => postItem != post);
            // this.utility.showMessage('Xóa sản phẩm thành công');
          }
        });
      }
    });
  }
}
