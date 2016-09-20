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
require('/components/ms-dialog')

require('/vendor/uploadify/jquery.uploadify.js');
require.loadCss({
    url: '/vendor/uploadify/uploadify.css'
});


var currentState = mmState.currentState;
/**
 * data-box配置
 * @type component-config
 * @param store 数据源，对应/services/storeService.js中的配置
 * @param dialogId 指定表单的dialog，dialog定义在data-box的前面
 * @param actionBtns 表格中的操作按钮，其中edit和del是内置的方法，不需要另外定义，参数el代表当前行的数据
 * @param processData 在这个函数可以在提交数据前对数据进行处理，两个参数，package包含一些状态数据和要提交要用到的数据，post在执行后立即提交数据
 */
var demo = avalon.define({
    $id: 'demo',
    'data-box_config': {
        store: 'demo',
        dialogId: 'dialog_demo',
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