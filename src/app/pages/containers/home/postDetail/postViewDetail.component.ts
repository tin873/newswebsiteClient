import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PostViewModel } from 'src/app/pages/models/view-models/post.models';
import { PostService } from 'src/app/pages/services/post.service';
import { UtilityService } from 'src/app/pages/services/utility.service';
@Component({
  selector: 'app-postDetail',
  templateUrl: './postViewDetail.component.html',
  styleUrls: ['./postViewDetail.component.css']
})
export class PostViewDetailComponent implements OnInit {
  postViewModal: PostViewModel;
  @BlockUI('blockUI') blockUI!: NgBlockUI;
  constructor(
    private router: ActivatedRoute,
    private postService: PostService,
    private utility: UtilityService
  ) {
    this.postViewModal = new PostViewModel();
  }
  ngOnInit() {
    this.getPostById();
  }

  getPostById(){
    this.utility.showProcessing(this.blockUI);
    let postId = this.router.snapshot.paramMap.get("id");
    this.postService.getById(postId).subscribe(res => {
      this.postViewModal = res.data;
      console.log(this.postViewModal);
      this.utility.cancelProcessing(this.blockUI);
    });
  }
}
