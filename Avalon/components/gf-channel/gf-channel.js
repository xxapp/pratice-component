var $ = require('jquery');
var avalon = require('avalon');
var beyond = require('/vendor/beyond');
var Notify = beyond.Notify;
var bootbox = require('bootbox.js/bootbox');

var ajax = require('/services/ajaxService');

require('/components/ms-data-box');
require('/components/ms-search-item');
require('/components/ms-search-button');
require('/components/ms-table');
require('/components/ms-check-header');
require('/components/ms-text-header');
require('/components/ms-action-header');
require('/components/ms-pagination');
require('/components/ms-dialog');
require('/components/ms-control-text');

var demo = avalon.define({
    $id: 'gf-channel',
    '$data-box_config': {
        store: 'channel',
        dialogId: 'dialog_channel',
        actionBtns: '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="edit(el)"><i class="fa fa-edit"></i> 编辑</a> ' + 
                '<a href="javascript:;" class="btn btn-danger btn-xs" ms-click="del(el)"><i class="fa fa-trash-o"></i> 删除</a>',
        processData: function (package, post) {
            // package包含一些状态数据和要提交要用到的数据
            console.log(package.isEdit ? '修改' : '新增', package.record);
            post(function (r) {
                console.log(r);
            });
        }
    },
    dataBoxInit: function (vm) {
        vm.loadData(function () {
            // 隐藏加载动画
            beyond.hideLoading();
        });
    }
});
var form = avalon.define({
    $id: 'gf-channel.form'
});

// 导出模板
exports.view = __inline('./gf-channel.html');
// 导出逻辑
exports.controller = avalon.controller(function($ctrl) {
    $ctrl.$onRendered = function() {
    }
    $ctrl.$onEnter = function(params, rs) {
    }
    $ctrl.$onBeforeUnload = function(oldState, newState) {
    }
    $ctrl.$vmodels = [];
});