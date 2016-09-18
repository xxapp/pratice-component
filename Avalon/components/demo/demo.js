var $ = require('jquery');
var avalon = require('avalon');
var beyond = require('/vendor/beyond');
var Notify = beyond.Notify;
var bootbox = require('bootbox.js/bootbox');

var ajax = require('/services/ajaxService');

require('/components/ms-pagination');

// state在这里是相当重要的一个概念，页面跳转，翻页，打开对话框（一般像添加修改这样的对话框才使用state）
// 切换状态用avalon.router.go方法
// 当前状态是比较重要的信息
var currentState = mmState.currentState;
var demo = avalon.define({
    $id: 'demo',
    list: [],
    checked: [],
    selected_all: false,
    toggleCheckd: function () {
        if (this.checked) {
            avalon.each(demo.list, function(i, v){
                demo.checked.ensure(v['region_id']);
            });
        } else {
            demo.checked.clear();
        }
    },
    add: function () {
        // 切换到root.demo.form，参数表示添加
        avalon.router.go('root.demo.form', {
            isEdit: false
        });
    },
    edit: function (demo) {
        // 切换到root.demo.edit，参数表示修改
        // 修改需要额外的参数，如果需要从后台重新获取数据，则只需传ID标识
        // 如果直接用列表的数据填充表单，则只需传要修改的这条数据对象
        avalon.router.go('root.demo.form', {
            isEdit: true,
            id: demo.$model.region_id,
            demo: demo.$model
        });
    },
    del: function (demo) {
        bootbox.confirm("Are you sure? " + demo.region_name, function (result) {
            if (result) {
                // 这里向后台服务请求删除数据
                alert(demo.region_id);
                // 在删除数据的回调里刷新数据
                avalon.router.go(currentState.stateName, { query: currentState.query });
                Notify('删除成功', 'top-right', '5000', 'success', 'fa-check', true);
            }
        });
    }
});
demo.$watch('checked.length', function (newV) {
    if (newV == demo.list.size()) {
        demo.selected_all = true;
    } else {
        demo.selected_all = false;
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
        
    }
    // 进入视图
    $ctrl.$onEnter = function(params, rs) {
        ajax({
            url: 'http://127.0.0.1:8081/api/user',
            type: 'get',
            data: {
            }
        }).then(function (result) {
            // 隐藏加载动画
            beyond.hideLoading();
            // 更新vm
            demo.list = result.list;
            demo.checked = [];
            //rs();
        });
        //return false;
    }
    // 对应的视图销毁前
    $ctrl.$onBeforeUnload = function(oldState, newState) {
    }
    // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
    $ctrl.$vmodels = [];
});