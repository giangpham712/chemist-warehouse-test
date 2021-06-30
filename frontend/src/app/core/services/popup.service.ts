import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';

@Injectable()
export class PopupService {

  constructor(public dialog: MatDialog) {
  }

  confirm(title: string, message: string): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { title, message }
    });

    return dialogRef.afterClosed();
  }
}
