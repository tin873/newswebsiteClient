import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PostViewModel } from '../../models/view-models/post.models';
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
  isloadding$!: Observable<boolean>;
  eror$!: Observable<string | null>;
  posts$!: Observable<PostViewModel[]>;

  constructor(
    private store: Store<fromStore.PostState>
  ) {
    this.posts$ = this.store.select(fromSelector.posts);
    this.isloadding$ = this.store.select(fromSelector.isLoading);
    console.log("thửu pôssd");
    console.log(this.isloadding$);
    this.store.select(state => state).subscribe(data => {
      console.log('data', data);
    });
  }
  ngOnInit() {

  }
}


