import React, { Component, PropTypes } from 'react';
import { Table, message, Popconfirm, Menu, Dropdown, Icon, Progress, Badge } from 'antd';
import { getTaskStatus, getProcessStatus } from '../../utils/helper';

const TaskList = ({
  total,
  current,
  loading,
  dataSource
}) => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="#">重试</a>
      </Menu.Item>
      <Menu.Item key="4">删除</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">生成顶</Menu.Item>
      <Menu.Item key="2">生成底</Menu.Item>
      <Menu.Item key="3">生成顶和底</Menu.Item>
    </Menu>
  );

  const columns = [{
    title: '名称',
    dataIndex: 'title',
    key: 'title',
    render: (text, record, index)=>{
      if(record.priority > 100) {
        return (
          <Badge dot>{record.title}&nbsp;&nbsp;</Badge>
        );
      } else {
        return(
          <div>{record.title}</div>
        );
      }
    },
  }, {
    title: '类型',
    dataIndex: 'task_type',
    key: 'type',
    filters: [
      { text: 'TOP_BOTTOM', value: 'TOP_BOTTOM' },
      { text: 'FACEBOOK_2D', value: 'FACEBOOK_2D' },
      { text: 'FACEBOOK_3D', value: 'FACEBOOK_3D' },
      { text: 'VISIONDK_2D', value: 'VISIONDK_2D' },
      { text: 'VISIONDK_3D', value: 'VISIONDK_3D' },
    ],
  }, {
    title: '执行机器IP',
    dataIndex: 'exec_ip',
    key: 'exec_ip'
  }, {
    title: '创建人',
    dataIndex: 'creator.name',
    key: 'creator_name'
  }, {
    title: '进度',
    dataIndex: 'processed',
    key: 'processed',
    render: (text, record, index)=>{
      const processStatus = getProcessStatus(record.status);
      return (<div style={{ width: 170 }}>
        <Progress percent={record.processed} strokeWidth={5} status={processStatus.status} />
      </div>);
    },
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record, index)=>{
      const taskStatus = getTaskStatus(record.status);
      return (<Badge status={taskStatus.status} text={taskStatus.text} />);
    },
    filters: [
      { text: '等待中', value: '1' },
      { text: '运行中', value: '2' },
      { text: '完成', value: '3' },
      { text: '失败', value: '4' },
      { text: '未知', value: '5' },
    ],
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <div>
        <a onClick={()=>{}}>详情</a>
        &nbsp;&nbsp;&nbsp;
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" href="#">
            更多 <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    ),
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

TaskList.propTypes = {
  total: PropTypes.any,
  current: PropTypes.any,
  loading: PropTypes.any,
  dataSource: PropTypes.array,
}

export default TaskList;