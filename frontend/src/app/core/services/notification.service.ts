import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {

  constructor(
    private _snackBar: MatSnackBar
  ) {
  }

  notifySuccess(message: string) {
    this.notify(message);
  }

  notifyError(message: string) {
    this.notify(message);
  }

  notifyInfo(message: string) {
    this.notify(message);
  }

  notifyWarning(message: string) {
    this.notify(message);
  }

  private notify(message: string) {
    this._snackBar.open(message, '', { panelClass: '', verticalPosition: 'top' });
  }
}
