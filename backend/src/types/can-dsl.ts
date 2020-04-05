import { PermissionAction, PermissionDataAction } from './permission-action';

export type CanDsl = ((action: PermissionAction | PermissionDataAction, subject: any, fields: string[], condition?: object) => any)
    & ((action: PermissionAction | PermissionDataAction, subject: any, condition?: object) => any);
