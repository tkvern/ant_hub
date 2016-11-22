import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';

import MainLayout from '../../components/layout/MainLayout';
import TaskList from '../../components/task/TaskList';
import TaskSearch from '../../components/task/TaskSearch';
import TaskPanel from '../../components/task/TaskPanel';
import TaskModal from '../../components/task//TaskModal';

function Tasks({ location, dispatch, tasks }) {
  const {
    list,
    expand,
    total,
    loading,
    current,
    currentItem,
    modalVisible,
    modalType,
  } = tasks;

  const taskListProps = {
    total,
    current,
    loading,
    dataSource: list,
  }

  const taskSearchProps = {
    expand,
    onExpand() {
      dispatch({
        type: 'tasks/collapseExpand',
        payload: {
          'expand': !expand,
        }
      });
    },

    onSearch(fieldsValue) {
      dispatch({
        type: 'tasks/query',
        payload: fieldsValue,
      });
    },

    onAdd() {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'create',
        }
      });
    },
  }

  const taskModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(data) {
      console.log(data);
      dispatch({
        type: `tasks/${modalType}`,
        payload: data,
      });
    },

    onCancel(){
      dispatch({
        type: 'tasks/hideModal',
      });
    },

  }

  const taskPanelProps = {
    onAdd() {
      dispatch({
        type: 'tasks/showModal',
        payload: {
          modalType: 'create',
        }
      });
    }
  }

  const TaskModalGen = () =>
    <TaskModal {...taskModalProps} />;

  return (
    <MainLayout>
      <div>
        <TaskPanel {...taskPanelProps} />
        <TaskSearch {...taskSearchProps} />
        <TaskList {...taskListProps} />
        <TaskModalGen />
      </div>
    </MainLayout>
  );
}

Tasks.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  tasks: PropTypes.object,
}

function mapStateToProps({ tasks }) {
  return { tasks };
}

export default connect(mapStateToProps)(Tasks);