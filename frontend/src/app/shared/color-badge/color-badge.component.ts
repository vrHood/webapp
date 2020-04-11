import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TinyColor } from '@ctrl/tinycolor';

@Component({
    selector: 'app-color-badge',
    templateUrl: './color-badge.component.html',
    styleUrls: [ './color-badge.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-color-badge'
    }
})
export class ColorBadgeComponent implements OnInit {


    @Input()
    @HostBinding('style.--badge-size')
    size: string = '32px';

    private _originalColor: string;
    private _color: TinyColor;

    constructor() {

    }


    @Input()
    @HostBinding('style.--badge-color')
    set color(value: string) {
        this._originalColor = value;
        this._color = new TinyColor(value);
    }

    get color(): string {
        return this._originalColor;
    }

    @HostBinding('style.--badge-contrast-color')
    get contrastColor(): string {
        return this._color.isLight() ? 'rgba(0, 0, 0, 0.87)' : 'white';
    }

    ngOnInit() {

    }

}
