var $ = require('jquery');
var avalon = require('avalon');
var beyond = require('/vendor/beyond');
var Notify = beyond.Notify;
var bootbox = require('bootbox.js/bootbox');

var ajax = require('/services/ajaxService');

require('/components/ms-data-box');
require('/components/ms-table');
require('/components/ms-check-header');
require('/components/ms-text-header');
require('/components/ms-action-header');
require('/components/ms-pagination');

// state在这里是相当重要的一个概念，页面跳转，翻页，打开对话框（一般像添加修改这样的对话框才使用state）
// 切换状态用avalon.router.go方法
// 当前状态是比较重要的信息
var currentState = mmState.currentState;
var demo = avalon.define({
    $id: 'demo',
    dataBoxInit: function (vm) {
        vm.loadData(function () {
            // 隐藏加载动画
            beyond.hideLoading();
        });
    }
});

// 导出模板
exports.view = __inline('./demo.html');
// 导出逻辑
exports.controller = avalon.controller(function($ctrl) {
    // 一个状态是有生命周期的
    // 以下定义的几个回调就是生命周期的某一瞬间执行

    // 视图渲染后，意思是avalon.scan完成
    $ctrl.$onRendered = function() {
        //rs();
        //return false;
    }
    // 进入视图
    $ctrl.$onEnter = function(params, rs) {
    }
    // 对应的视图销毁前
    $ctrl.$onBeforeUnload = function(oldState, newState) {
    }
    // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
    $ctrl.$vmodels = [];
});