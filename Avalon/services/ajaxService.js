var avalon = require('avalon');
var $ = require('jquery');
var bootbox = require('bootbox.js/bootbox');
var beyond = require('/vendor/beyond');
var Notify = beyond.Notify;

// 拦截ajax请求，检测是否超时，以重新登录
$(document).ajaxComplete(function (event, xhr, settings) {
    if (xhr.status == 200) {
        if (settings.dataType == 'json' && xhr.responseJSON != void 0) {
            var result = xhr.responseJSON;
            if (result.code === '20' || result.code === '21') {
                beyond.hideLoading();
                bootbox.confirm("Session已经失效，请重新登录", function (result) {
                     if (result) {
                         location.href = "/login.html";
                     }
                 });
            } else if (result.error) {
                beyond.hideLoading();
                Notify(result.error.message, 'top-right', '5000', 'danger', 'fa-bolt', true);
            }
        }
    }else if(xhr.status == undefined) 
    {
    	beyond.hideLoading();
    }
    else {
        beyond.hideLoading();
        Notify('请求错误，请联系管理员', 'top-right', '5000', 'danger', 'fa-bolt', true);
    }
});

module.exports = function (options) {
    var defaultOptions = {
        url: 'http://127.0.0.1:8081',
        data: {
        },
        dataType: 'json',
        cache: false
    };
    function process(r) {
        var str = {};
        if (r.rows) {
            str = r;
            str.code = '0';
            str.list = r.rows;
            delete str.rows;
        } else {
            if (!r.error) {
                str.code = '0';
                str.data = r;
            } else {
                str.code = '1';
                str.message = r.message;
            }
        }
        console.log(str);
        return str;
    }
    return $.ajax($.extend(true, defaultOptions, options)).then(process);
};