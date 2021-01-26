import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}  >
      <SubMenu title={<span>Contents</span>}>
      <MenuItemGroup title="Contents">
        <Menu.Item key="setting:1"><a href="/">Main Page</a></Menu.Item>
        <Menu.Item key="setting:2"><a href="/search">Search Video</a></Menu.Item>
        <Menu.Item key="setting:3"><a href="/video/upload">Upload Video</a></Menu.Item>
        <Menu.Item key="setting:4"><a href="/subscription">Subscription</a></Menu.Item>
      </MenuItemGroup>
    </SubMenu>
  </Menu>
  )
}

export default LeftMenu


