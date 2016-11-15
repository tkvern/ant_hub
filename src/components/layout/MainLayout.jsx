import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Menu, Breadcrumb, Dropdown, Icon } from 'antd';
import styles from './MainLayout.less';

const SubMenu = Menu.SubMenu;

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/"><Icon type="edit" /> 个人信息</a>
    </Menu.Item>
    <Menu.Item key="3"><Icon type="logout" /> 安全退出</Menu.Item>
  </Menu>
);

function MainLayout(props) {
  return (
    <div className="ant-layout-aside">
      <header className="main-header">
        <a href="/" className="logo">
          <span className="logo-lg"><b>DK</b> VISION</span>
        </a>
        <nav className="navbar navbar-static-top">

          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="dropdown">
                <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link" href="#">
                    <Icon type="user" /> admin@admin.com <Icon type="down" />
                  </a>
                </Dropdown>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <aside className="ant-layout-sider">
        <Menu mode="inline" theme="dark"
          defaultSelectedKeys={['1']} defaultOpenKeys={['sub1', 'sub2', 'sub3']}>
          <SubMenu key="sub1" title={<span><Icon type="video-camera" />素材生产</span>}>
            <Menu.Item key="1">任务管理</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="user" />用户中心</span>}>
            <Menu.Item key="5">个人信息</Menu.Item>
            <Menu.Item key="6">用户管理</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="setting" />系统设置</span>}>
            <Menu.Item key="10">运维监控</Menu.Item>
          </SubMenu>
        </Menu>
      </aside>
      <div className="ant-layout-main">
        <div className="ant-layout-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>应用列表</Breadcrumb.Item>
            <Breadcrumb.Item>某应用</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ant-layout-container">
          <div className="ant-layout-content">
            <div style={{ minHeight: 590 }}>
              { props.children }
            </div>
          </div>
        </div>
        <div className="ant-layout-footer">
        量子视觉自动化系统 © 2015 深圳市量子视觉科技有限公司
        </div>
      </div>
    </div>
  );
}

MainLayout.propTypes = {
};

export default connect()(MainLayout);
