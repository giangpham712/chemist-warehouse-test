import { NgModule } from '@angular/core';
import { ProductApiService } from "./services/api/product-api.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiInterceptor } from "./interceptors/api.interceptor";
import { NotificationService } from './services/notification.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupService } from './services/popup.service';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [],
  declarations: [
    ConfirmDialogComponent
  ],
  providers: [
    ProductApiService,
    NotificationService,
    PopupService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
})
export class CoreModule {
}
