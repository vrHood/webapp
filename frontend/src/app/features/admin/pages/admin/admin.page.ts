import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface MenuItem {
    icon?: string;
    label: string;
    route: string | any[];
    hint?: string;
}

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin.page.html',
    styleUrls: [ './admin.page.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-admin-page'
    }
})
export class AdminPage implements OnInit {

    menuItems: MenuItem[] = [
        {
            icon: 'group',
            label: 'Nutzer',
            route: '/admin/users'
        },
        {
            icon: 'business',
            label: 'Händler',
            route: '/admin/retailers'
        },
        {
            icon: 'category',
            label: 'Kategorien',
            route: '/admin/categories'
        }
    ];

    constructor(activatedRoute: ActivatedRoute, router: Router) {

    }

    ngOnInit(): void {
    }

}
