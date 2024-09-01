export interface SidebarMenuItem {
  icon: string;
  label?: string;
  to?: string;
  badge?: string;
  items?: SidebarMenuItem[];
}

export interface SidebarMenuSection {
  label: string;
  items: SidebarMenuItem[];
}