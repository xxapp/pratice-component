var ajax = require('/services/ajaxService.js');

exports.demo = {
    list: function (params) {
        return ajax({
            url: '/api/user',
            type: 'get',
            data: {
            }
        });
    }
};