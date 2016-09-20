var ajax = require('/services/ajaxService.js');

exports.demo = {
    key: 'region_id',
    initialData: function () {
        return {
            region_enable: 0,
            region_id: '',
            region_name: '',
            region_parent_id: '',
            region_type: ''
        };
    },
    list: function (params) {
        return ajax({
            url: '/api/demo',
            type: 'get',
            data: params
        });
    },
    insert: function (params) {
        return ajax({
            url: '/api/demo/update',
            type: 'post',
            data: params
        });
    },
    update: function (params) {
        return ajax({
            url: '/api/demo/update',
            type: 'post',
            data: params
        });
    },
    del: function (id) {
        return ajax({
            url: '/api/demo/update',
            type: 'post',
            data: {
                id: id
            }
        });
    }
};