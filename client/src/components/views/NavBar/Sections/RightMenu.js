/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';


function RightMenu(props) {
  const user = useSelector(state => state.user);
  

  const logoutHandler = () => {
    axios.get(`/api/users/logout`).then(response => {
      if (response.status === 200) {
        window.localStorage.setItem('userId','')
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };


  if (user.userData && !user.userData.isAuth ) {
    return (
      <Menu props={props.mode} style={{display:'flex'}}>
        <Menu.Item key="mail">
          <a href="/login">Sign In</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Sign Up</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu props={props.mode} style={{display:'flex'}}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);