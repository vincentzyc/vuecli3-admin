interface menuItems {
  subMenus?: menuItems[],
  menuIndex: string,
  menuName: string
}

export const crmMenus: menuItems[] = [{
  menuIndex: '/menu1',
  menuName: '菜单栏1'
}, {
  menuIndex: '/menu2',
  menuName: '菜单栏2',
  subMenus: [{
    menuIndex: '/menu2/submenu1',
    menuName: '子菜单栏1'
  }]
}, {
  menuIndex: '/menu3',
  menuName: '菜单栏3'
}]

export default crmMenus