import { NavigationItem } from "types";
import { Iconify } from "components";
const getIcon = (name: string) => (
  <Iconify icon={name} width={22} height={22} />
);

export const NAV_ITEMS: NavigationItem[] = [
  {
    title: "products",
    path: "/",
    icon: getIcon("eva:shopping-bag-fill"),
  },
];
