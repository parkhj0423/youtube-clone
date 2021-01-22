import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}  >
    <Menu.Item key="mail" >
      <a href="/">Main</a>
    </Menu.Item>
    <SubMenu title={<span>More</span>}>
      <MenuItemGroup title="Sign In / Sign Up">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="Contents">
        <Menu.Item key="setting:3"><a href="/video/upload">Upload Video</a></Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
      </MenuItemGroup>
    </SubMenu>
  </Menu>
  )
}

export default LeftMenu


