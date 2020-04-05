import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FooterLinkType, IFooterLink } from '../../models/footer-link.model.i';

@Component({
    selector: 'app-footer',
    templateUrl: './app-footer.component.html',
    styleUrls: ['./app-footer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'app-footer'
    }
})
export class AppFooterComponent implements OnInit {

    // TODO: move to service
    links: IFooterLink[] = [
        {
            type: FooterLinkType.EXTERNAL,
            label: 'www.vrhood.de',
            url: 'https://vrhood.de'
        },
        {
            type: FooterLinkType.EXTERNAL,
            label: 'Impressum',
            url: 'https://www.vrhood.de/impressum'
        },
        {
            type: FooterLinkType.EXTERNAL,
            label: 'Datenschutz',
            url: 'https://www.vrhood.de/datenschutz'
        }
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

}
