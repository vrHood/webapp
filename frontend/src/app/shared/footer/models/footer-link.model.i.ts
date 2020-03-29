export enum FooterLinkType {
    INTERNAL = 'internal',
    EXTERNAL = 'external'
}

export interface IBaseFooterLink {
    type: FooterLinkType;
    label: string;
}

export interface IFooterInternalLink extends IBaseFooterLink {
    type: FooterLinkType.INTERNAL;
    route: string;
}

export interface IFooterExternalLink extends IBaseFooterLink {
    type: FooterLinkType.EXTERNAL;
    url: string;
}

export type IFooterLink = IFooterInternalLink | IFooterExternalLink;
