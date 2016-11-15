import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';

import MainLayout from '../../components/layout/MainLayout';
import TaskList from '../../components/task/TaskList';

function Tasks({ location, dispatch, tasks }) {
  const {
    list,
    total,
    loading,
    current,
    currentItem,
    modalVisible,
    modalType
  } = tasks;

  const taskListProps = {
    total,
    current,
    loading,
    dataSource: list,
  }

  return (
    <MainLayout>
      <TaskList {...taskListProps} />
    </MainLayout>
  );
}

Tasks.propTypes = {
  tasks: PropTypes.object,
}

function mapStateToProps({ tasks }) {
  return {tasks};
}

export default connect(mapStateToProps)(Tasks);