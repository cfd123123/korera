import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import React from 'react'
import {BrowserRouter as Router, Route, Link, Switch, Redirect,  withRouter} from 'react-router-dom'

/* 
class Sider extends React.Component {
  handleClick = e => {
    console.log('click ', e);
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Menu.Item key="1"><Link to = '/resource'>Resource</Link></Menu.Item>
        <Menu.Item key="2"><Link to = '/project'>Project</Link></Menu.Item>

      </Menu>
    );
  }
}

export default withRouter(Sider); */