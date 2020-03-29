import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { IActivatableEntity } from '@vrhood/shared';

import { DataService } from '../../services/data/data-service.class';

interface ActiveToggleData {
    label: string;
    icon: string;
    color: ThemePalette;
}

const ACTIVE_DATA: ActiveToggleData = {
    label: 'Aktiv',
    color: 'primary',
    icon: 'toggle_on'
};

const INACTIVE_DATA: ActiveToggleData = {
    label: 'Inaktiv',
    color: 'accent',
    icon: 'toggle_off'
};

@Component({
    selector: 'app-active-toggle',
    templateUrl: './active-toggle.component.html',
    styleUrls: [ './active-toggle.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-active-toggle'
    }
})
export class ActiveToggleComponent<T extends IActivatableEntity> implements OnInit {

    @Input()
    entity: T;

    @Input()
    service: DataService<T>;

    constructor() {
    }

    get active(): boolean {
        return this.entity ? this.entity.active : false;
    }

    get data(): ActiveToggleData {
        return this.active ? ACTIVE_DATA : INACTIVE_DATA;
    }

    ngOnInit(): void {

    }

    toggle() {
        return this._updateEntity(!this.entity.active);
    }

    activate() {
        return this._updateEntity(true);
    }

    deactivate() {
        return this._updateEntity(false);
    }

    private async _updateEntity(active: boolean): Promise<any> {
        if (!this.entity || !this.service) {
            return;
        }

        this.entity = await this.service.patch(this.entity._id, { active } as Partial<T>);
    }

}
