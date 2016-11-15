import React, { Component, PropTypes } from 'react';
import { Table, message, Popconfirm } from 'antd';

const TaskList = ({
  total,
  current,
  loading,
  dataSource,
}) => {
  const columns = [{
    title: '名称',
    dataIndex: 'title',
    key: 'title',
  }, {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  }, {
    title: '执行机器IP',
    dataIndex: 'exec_ip',
    key: 'exec_ip'
  }, {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator'
  }, {
    title: '进度',
    dataIndex: 'processing',
    key: 'processing',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => {
      const menu = (
        <Menu>
          <Menu.Item key="0">
            <a href="#">重试</a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="1">生成顶</Menu.Item>
          <Menu.Item key="2">生成底</Menu.Item>
          <Menu.Item key="3">生成顶和底</Menu.Item>
        </Menu>
      );

      <a onClick={()=>{}}>详情</a>
      &nbsp;
      <Popconfirm title="确定要删除吗？" onConfirm={()=>{}}>
        <a>删除</a>
      </Popconfirm>
      &nbsp;
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" href="#">
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    },
  }];

  const pagination = {
    total,
    current,
    pageSize: 10,
    onChange: ()=>{},
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.id}
        pagination={pagination}
      />
    </div>
  );
}

export default TaskList;