export interface MenuTree {
  menuId?: string
  menuCode?: string
  parentId?: string
  menuName?: string
  menuSeqId?: number
  menuIcon?: string
  menuUrl?: string
  children?: MenuTree[]
}
