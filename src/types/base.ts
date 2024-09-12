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

export interface AxiosResponseError {
  errors: {
    location: string,
    msg: string,
    path: string,
    type: string,
    value: string
  }[]
  message: string
}