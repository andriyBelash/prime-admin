import { DefineComponent } from 'vue'
import { SidebarMenuItem } from '@/types/base'

declare const BaseMenuItem: DefineComponent<{
  item: SidebarMenuItem
}>

export default BaseMenuItem