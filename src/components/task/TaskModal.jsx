import React, { Component, PropTypes } from 'react';
import {
  Form, Row, Col, Input,
  Modal, Button, Icon,
  Radio, Checkbox, DatePicker,
  Tooltip, InputNumber, Switch } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['PREVIEW', '3D_FAST', '2D_FAST', '3D_BETTER', '2D_BETTER'];
const defaultCheckedList = ['PREVIEW'];

const TaskModal = ({
  visible,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  },
}) => {
  function handleOk() {
    console.log('test')
    const data = { ...getFieldDecorator(), key: item.key };
    onOk(data)
  }

  const modalOpts = {
    title: "任务",
    visible,
    onOk: handleOk,
    onCancel,
    width: 720,
  }

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  };

  return (
    <Modal {...modalOpts}>
      <Form>
        <Row>
          <Col span={24}>
            <FormItem {...formItemLayout} label="视频路径">
              <InputGroup className="ant-search-input">
                <Input placeholder="请输入视频路径" />
                <div className="ant-input-group-wrap">
                  <Tooltip placement="top" title="转换Windows路径">
                    <Button icon="retweet" className="ant-search-btn" size="large"/>
                  </Tooltip>
                </div>
              </InputGroup>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="输出路径">
              <Input placeholder="请输入输出路径" />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="任务名称">
              <Input placeholder="请输入任务名称" />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="开始桢-结束桢">
              <Col span="8">
                <FormItem >
                  <InputNumber min={0} style={{ width: "100%" }} />
                </FormItem>
              </Col>
              <Col span="1">
                <p className="ant-form-split">-</p>
              </Col>
              <Col span="8">
                <FormItem>
                  <InputNumber min={0} style={{ width: "100%" }} />
                </FormItem>
              </Col>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="颜色调整">
              <Switch checkedChildren={'开'} unCheckedChildren={'关'} />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="相机类型">
              <RadioGroup defaultValue="GOPRO">
                <RadioButton value="GOPRO">GOPRO</RadioButton>
                <RadioButton value="BMPCC">BMPCC</RadioButton>
                <RadioButton value="AURA">AURA</RadioButton>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} wrapperCol={{ span: 19}} label="任务类型">
              <CheckboxGroup options={plainOptions} value={defaultCheckedList} />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="是否紧急">
              <Switch checkedChildren={'是'} unCheckedChildren={'否'} />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem {...formItemLayout} label="备注">
              <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );

}

export default Form.create()(TaskModal);