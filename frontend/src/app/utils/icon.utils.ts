import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { Icon } from '../models/icon.model';

export namespace IconUtils {

    export const NAMESPACE = 'categories';

    export const ALL_ICONS = [ Icon.BOOKS, Icon.CLOTHES, Icon.CRAFT, Icon.FOOD, Icon.HEALTH, Icon.HELP, Icon.INTERIOR, Icon.OTHER,
                               Icon.PLANTS ];

    export const ALL_ICON_NAMES = ALL_ICONS.map((icon) => getIconName(icon));

    export function getIconName(icon: Icon, namespace: string = NAMESPACE): string {
        return icon ? `${namespace}:${icon}` : null;
    }

    export function getIconUrl(icon: Icon) {
        return `assets/images/icons/categories/icon_${icon}.svg`;
    }

    export function addIcons(registry: MatIconRegistry, sanitizer: DomSanitizer) {
        registry.registerFontClassAlias('vrhood', 'vrhood-icon')
        for (const icon of ALL_ICONS) {
            registry.addSvgIconInNamespace(NAMESPACE, icon, sanitizer.bypassSecurityTrustResourceUrl(getIconUrl(icon)));
        }
    }


}
