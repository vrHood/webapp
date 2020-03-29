import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private readonly _snackBar: MatSnackBar) {

    }

    error(message: string): MatSnackBarRef<any>;
    error(message: string, action: string, onAction: () => any): MatSnackBarRef<any>;
    error(message: string, action?: string, onAction?: () => any): MatSnackBarRef<any> {
        return this._show(message, action, onAction, {
            panelClass: [ 'c-snackbar', 'c-snackbar--error' ]
        });
    }

    success(message: string): MatSnackBarRef<any>;
    success(message: string, action: string, onAction: () => any): MatSnackBarRef<any>;
    success(message: string, action?: string, onAction?: () => any): MatSnackBarRef<any> {
        return this._show(message, action, onAction, {
            panelClass: [ 'c-snackbar', 'c-snackbar--success' ]
        });
    }

    info(message: string): MatSnackBarRef<any>;
    info(message: string, action: string, onAction: () => any): MatSnackBarRef<any>;
    info(message: string, action?: string, onAction?: () => any): MatSnackBarRef<any> {
        return this._show(message, action, onAction, {
            panelClass: [ 'c-snackbar' ]
        });
    }

    private _show(message: string, action: string, onAction: () => any, config?: MatSnackBarConfig): MatSnackBarRef<any> {
        const ref = this._snackBar.open(message, action, {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
            ...config
        });

        if (onAction != null) {
            ref.onAction().pipe(first()).subscribe(onAction);
        }

        return ref;
    }
}
