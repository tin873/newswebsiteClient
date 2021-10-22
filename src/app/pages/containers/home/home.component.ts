import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';
import { PostViewModel } from '../../models/view-models/post.models';
import { UtilityService } from '../../services/utility.service';
import * as fromStore from './store/post.reducer';
import * as fromSelector from './store/post.select';

@Component({
  selector: 'app-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  router: any;
  @BlockUI('blockUI') blockUI!: NgBlockUI;
  isloadding$!: Observable<boolean>;
  eror$!: Observable<string | null>;
  posts$!: Observable<PostViewModel[]>;

  constructor(
    private store: Store<fromStore.PostState>,
  ) {
    this.posts$ = this.store.select(fromSelector.posts);
    this.isloadding$ = this.store.select(fromSelector.isLoading);
    this.store.select(state => state).subscribe(data => {
      console.log('data', data);
    });
  }
  ngOnInit() {

  }
}


