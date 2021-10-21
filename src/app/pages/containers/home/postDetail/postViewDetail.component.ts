import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostViewModel } from 'src/app/pages/models/view-models/post.models';
import { PostService } from 'src/app/pages/services/post.service';
@Component({
  selector: 'app-postDetail',
  templateUrl: './postViewDetail.component.html',
  styleUrls: ['./postViewDetail.component.css']
})
export class PostViewDetailComponent implements OnInit {
  postViewModal: PostViewModel;
  constructor(
    private router: ActivatedRoute,
    private postService: PostService
  ) {
    this.postViewModal = new PostViewModel();
  }
  ngOnInit() {
    this.getPostById();
  }

  getPostById(){
    let postId = this.router.snapshot.paramMap.get("id");
    this.postService.getById(postId).subscribe(res => {
      this.postViewModal = res.data;
      console.log(this.postViewModal);
    });
  }
}
