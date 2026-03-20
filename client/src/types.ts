export interface NavbarProps {
  navlinks: INavLink[];
}

export interface INavLink {
  name: string;
  href: string;
  requiresAuth?: boolean;
}

export interface IFeature {
  icon: string;
  title: string;
  description: string;
}
export interface SectionTitleProps {
  text1: string;
  text2: string;
  text3: string;
}
export interface IFooterLink {
  name: string;
  href: string;
}
export interface IFooter {
  title: string;
  links: IFooterLink[];
}
