import { Pipe, PipeTransform } from '@angular/core';
import { Icon } from '../../models/icon.model';
import { IconUtils } from '../../utils/icon.utils';

@Pipe({
    name: 'iconName'
})
export class IconNamePipe implements PipeTransform {

    transform(value: Icon, namespace?: string, ...args: unknown[]) {
        return IconUtils.getIconName(value, namespace);
    }

}
