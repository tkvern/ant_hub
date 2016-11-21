import { hashHistory } from 'dva/router';
import { query } from '../services/tasks';
import pathToRegexp from 'path-to-regexp';

export default {
  namespace: 'tasks',
  state: {
    list: [],
    field: '',
    keyword: '',
    expand: false,
    total: null,
    loading: false,
    current: 1,
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  reducers: {
    showLoading(state, action) {
      return { ...state, loading: true };
    },
    showModal(state, action){
      return { ...state, ...action.payload, modalVisible: true };
    },
    hideModal(state, action){
      return { ...state, modalVisible: false };
    },
    collapseExpand(state, action) {
      return { ...state, ...action.payload };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    createSuccess(){},
    deleteSuccess(){},
    updateSuccess(){},
  },

  effects: {
    *query({payload}, { select, call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(query);
      if(data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current
          }
        });
      }
    },
    *create(){},
    *'delete'(){},
    *update(){},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        // const match = pathToRegexp(`/tasks`).exec(pathname);

        if(pathname === '/tasks') {
          dispatch({
            type: 'query',
            payload: {}
          });
        }
      });
    }
  }
}
