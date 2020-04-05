import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IError } from '../../models/error.model.i';

@Component({
    selector: 'app-error',
    templateUrl: './app-error.component.html',
    styleUrls: ['./app-error.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'app-error'
    }
})
export class AppErrorComponent implements OnInit, IError {

    @Input()
    title: string;

    @Input()
    message: string;

    constructor() {
    }

    ngOnInit(): void {
    }

}
