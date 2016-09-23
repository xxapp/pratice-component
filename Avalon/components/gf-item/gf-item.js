var $ = require('jquery');
var avalon = require('avalon');
var beyond = require('/vendor/beyond');
var Notify = beyond.Notify;
var bootbox = require('bootbox.js/bootbox');

var ajax = require('/services/ajaxService');

require('/vendor/avx-component');

var item = avalon.define({
    $id: 'gf-item',
    '$data-box_config': {
        store: 'item',
        dialogId: 'dialog_item',
        actionBtns: {
            operation: '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.upShelves(el)"><i class="fa fa-edit"></i> 上架</a> ' + 
                '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.edit(el)"><i class="fa fa-edit"></i> 编辑</a> ' + 
                '<a href="javascript:;" class="btn btn-danger btn-xs" ms-click="actions.del(el)"><i class="fa fa-trash-o"></i> 删除</a>',
            push: '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.push(el)"><i class="fa fa-edit"></i> 推送到首页</a>'
        },
        processData: function (package, post) {
            // package包含一些状态数据和要提交要用到的数据
            console.log(package.isEdit ? '修改' : '新增', package.record);
            post(function (r) {
                console.log(r);
            });
        },
        actions: {
            push: function (record) {
                var dialogVm = avalon.vmodels['dialog_item_push'];
                dialogVm.title = '设置推送内容';
                dialogVm.record = {
                    pushContent: record.name
                };
                dialogVm.show = true;
            },
            upShelves: function () {
                Notify('上架成功', 'top-right', '5000', 'success', 'fa-check', true);
            },
            downShelves: function () {
                Notify('下架成功', 'top-right', '5000', 'success', 'fa-check', true);
            }
        }
    },
    dataBoxInit: function (vm) {
        vm.loadData(function () {
            // 隐藏加载动画
            beyond.hideLoading();
        });
        // 自定义dialog逻辑
        avalon.vmodels['dialog_item_push'].state = {
            text: 'text',
            subs: [1,2,3]
        };
    }
});

// 导出模板
exports.view = __inline('./gf-item.html');
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