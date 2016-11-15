'use strict';

const qs = require('qs');
const mockjs = require('mockjs');
const Random = mockjs.Random;

module.exports = {
  'GET /api/tasks' (req, res) {
    const page = qs.parse(req.query);
    const data =mockjs.mock({
      'data|100': [{
        'id|+1': 1,
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
        'payload': [{
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
        }],
        'task_type': ()=>{
            var constellations = ['VISIONDK_3D', 'VISIONDK_2D', 'FACEBOOK_3D', 'FACEBOOK_2D', 'PREVIEW', 'TOP_BOTTOM'];
            return Random.pick(constellations);
        },
        'creator': [{
          'id|10-100': 1,
          'name': '@cname',
        }],
        'parent_id|10-100': 1,
        'status|0-5': 1,
        'processed|0-100': 1,
        'created_at': ()=>{
          return Random.datetime('yyyy-MM-dd A HH:mm:ss');
        },
        'updated_at': ()=>{
          return Random.datetime('yyyy-MM-dd A HH:mm:ss');
        },
        'exec_ip': /(192)\.(168)\.\d{2}\.\d{2}/,
        'priority|100-1000': 1,
        'attach_id|10-100': 1,
      }]
    });

    res.json({
      success: true,
      data: data.data,
      page: data.page,
    })
  }
};