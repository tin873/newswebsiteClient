import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from './layout/layout.module';
import { BlockUIModule } from 'ng-block-ui';
import { HttpClientService } from './pages/services/http-client.service';
import { HttpClientModule } from '@angular/common/http';
import { ManagermentModule } from './pages/containers/managerment/managerment.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogService } from './pages/services/confirmation-dialog.service';
import { ConfirmationDialogComponent } from './pages/confirmation-dialog/confirmation-dialog.component';
import { HomeModule } from './pages/containers/home/home.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './core/app.reducer';
import * as fromApp from './core/app.reducer';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    ManagermentModule,
    HttpClientModule,
    LayoutModule,
    HomeModule,
    StoreModule.forRoot(reducer,{}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(fromApp.appFeatureKey, fromApp.reducer),
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
      countDuplicates: true,
      progressBar: true
    }),
    BlockUIModule.forRoot({
      delayStart: 100,
      delayStop: 500
    })
  ],
  providers: [
    HttpClientService,
    ToastrService,
    ConfirmationDialogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
