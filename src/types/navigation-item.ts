export interface NavigationItem {
  title: string;
  path: string;
  icon?: JSX.Element;
  info?: string;
  children?: NavigationItem[];
}
