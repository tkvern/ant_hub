import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon, Radio, Checkbox, DatePicker } from 'antd';
import './TaskSearch.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { MonthPicker, RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const plainOptions = ['等待中', '运行中', '完成', '失败', '未知'];

const TaskSearch = ({

}) => {

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  return (
    <Form
      horizontal
      className="ant-advanced-search-form"
    >
      <Row>
        <Col span={8}>
          <FormItem {...formItemLayout} label="范围">
              <RadioGroup defaultValue="a">
                <RadioButton value="a">我的任务</RadioButton>
                <RadioButton value="b">全部任务</RadioButton>
              </RadioGroup>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <FormItem {...formItemLayout} label="任务名称">
            <Input placeholder="请输入任务名称" />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="创建人">
            <Input placeholder="请输入创建人" />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="创建日期">
            <RangePicker
              format={dateFormat}
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={8} style={{ textAlign: '' }}>
          <Col span={19} offset={5}>
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button style={{ marginLeft: 8 }}>
              清空
            </Button>
            <a style={{ marginLeft: 8, fontSize: 12 }}>
              高级搜索 <Icon type={true ? 'up' : 'down'} />
            </a>
          </Col>
        </Col>
      </Row>
    </Form>
  );
}

export default Form.create()(TaskSearch);