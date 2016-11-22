'use strict';

const qs = require('qs');
const mockjs = require('mockjs');
const Random = mockjs.Random;

// 数据持久化
let tableListData = {};

if (!global.tableListData) {
  const data =mockjs.mock({
    'data|100': [{
      'id|+1': 1,
      'title': ()=>{
        return Random.title(2, 4);
      },
      'uuid': ()=>{
          var d = new Date().getTime();
          var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = (d + Math.random()*16)%16 | 0;
              d = Math.floor(d/16);
              return (c=='x' ? r : (r&0x7|0x8)).toString(16);
          });
          return uuid;
      },
      'description': ()=>{
        return Random.cparagraph(1, 3);
      },
      'payload': {
        'video_dir': /(\/dkvision\/data\/)([a-z]|[A-Z]|[0-9]){10}/,
        'output_dir': /(\/dkvision\/output\/)([a-z]|[A-Z]|[0-9]){10}/,
        'start_frame|100-1000': 1,
        'end_frame|1000-10000': 1,
        'enable_top|0-1': 1,
        'enable_bottom|0-1': 1,
        'enable_coloradjust|0-1': 1,
        'quality': ()=>{
          var constellations = ['8k', '6k', '4k'];
          return Random.pick(constellations);
        },
        'camera_type': ()=>{
          var constellations = ['GOPRO', 'BMPCC', 'AURA'];
          return Random.pick(constellations);
        },
      },
      'task_type': ()=>{
          var constellations = ['VISIONDK_3D', 'VISIONDK_2D', 'FACEBOOK_3D', 'FACEBOOK_2D', 'PREVIEW', 'TOP_BOTTOM'];
          return Random.pick(constellations);
      },
      'creator': {
        'id|10-100': 1,
        'name': '@cname',
      },
      'parent_id|10-100': 1,
      'status|1-4': 1,
      'processed|0-100': 1,
      'created_at': ()=>{
        return Random.datetime('yyyy-MM-dd A HH:mm:ss');
      },
      'updated_at': ()=>{
        return Random.datetime('yyyy-MM-dd A HH:mm:ss');
      },
      'exec_ip': ()=>{
        return Random.ip();
      },
      'priority|100-101': 1,
      'attach_id|10-100': 1,
    }],
    page: {
      total: 100,
      current: 1,
    }
  });
  tableListData = data;
  global.tableListData = tableListData;
} else {
  tableListData = global.tableListData;
}

module.exports = {
  'GET /api/tasks' (req, res) {
    const page = qs.parse(req.query);
    const pageSize = page.pageSize || 10;
    const currentPage = page.page || 1;

    let data;
    let newPage;

    let newData = tableListData.data.concat();

    if (page.field) {
      const d = newData.filter(function (item) {
        return item[page.filed].indexOf(page.keyword) > -1;
      });

      data = d.slice((currentPage - 1)) * pageSize, currentPage * pageSize);

      newPage = {
        current: currentPage * 1,
        total: d.length,
      };
    } else {
      data = tableListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
      tableListData.page.current = currentPage * 1;

      newPage = {
        current: tableListData.page.current,
        total: tableListData.page.total,
      }
    }

    setTimeout(function () {
      res.json({
        success: true,
        data,
        page: newPage,
      })
    }, 200);
  },

  'POST /api/tasks' (req, res) {
    setTimeout(function () {
      const newData = qs.parse(req.body);

      newData.id = tableListData.data.length + 1;
      tableListData.data.unshift(newData);

      tableListData.page.total = tableListData.data.length;
      tableListData.page.current = 1;

      global.tableListData = tableListData;

      res.json({
        success: true,
        data: tableListData.data,
        page: tableListData.page,
      });
    }, 200);
  },

  'DELETE /api/tasks' (req, res) {
    setTimeout(function () {
      const deleteItem = qs.parse(req.body);

      tableListData.data = tableListData.data.filter(function (item) {
        if (item.id == deleteItem.id) {
          return false;
        }

        return true;
      });
      
      tableListData.page.total = tableListData.data.length;

      global.tableListData = tableListData;

      res.json({
        success: true,
        data: tableListData.data,
        page: tableListData.page,
      })

    }, 200);
  },

  'PUT /api/tasks' (req, res) {
    setTimeout(function () {
      const editItem = qs.parse(req.body);

      tableListData.data = tableListData.data.map(function (item) {
        if (item.id == editItem.id) {
          return editItem;
        }
        return item;
      });

      global.tableListData = tableListData;

      res.json({
        success: true,
        data: tableListData.data,
        page: tableListData.page,
      });
    }, 200);
  }
};