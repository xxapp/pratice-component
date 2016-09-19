var avalon = require('avalon');
var beyond = require('/vendor/beyond');
var Notify = beyond.Notify;
var ajax = require('/services/ajaxService');

var currentState = mmState.currentState;
avalon.component('ms:dataBox', {
    $solt: 'content',
    content: '',
    $template: '{{content|html}}',
    $replace: 0,
    $init: function (vm) {
        vm.add = function () {
            avalon.router.go('root.demo.form', {
                isEdit: false
            });
        }
        vm.edit = function (record) {
            avalon.router.go('root.demo.form', {
                isEdit: true,
                id: record.$model.region_id,
                record: record.$model
            });
        }
        vm.del = function (record) {
            bootbox.confirm("Are you sure? " + record.region_name, function (result) {
                if (result) {
                    alert(record.region_id);
                    avalon.router.go(currentState.stateName, { query: currentState.query });
                    Notify('删除成功', 'top-right', '5000', 'success', 'fa-check', true);
                }
            });
        }
        vm.loadData = function (cb) {
            ajax({
                url: '/api/user',
                type: 'get',
                data: {
                }
            }).then(function (result) {
                cb && cb();
                beyond.hideLoading();
                // 更新vm
                vm.list = result.list;
                vm.checked.clear();
            });
        }
    },
    $childReady: function (vm, e) {
        // 在所有子组件上面保存容器组件的vmId
        for (var i in vm.$refs) {
            vm.$refs[i].$containerVmId = vm.$id;
        }
    },
    $ready: function (vm) {
        vm.onInit(vm);
    },
    list: [],
    checked: [],
    actionBtns: '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="edit(el)"><i class="fa fa-edit"></i> Edit</a> ' + 
                '<a href="javascript:;" class="btn btn-danger btn-xs" ms-click="del(el)"><i class="fa fa-trash-o"></i> Delete</a>',
    add: avalon.noop,
    edit: avalon.noop,
    del: avalon.noop,
    loadData: avalon.noop
});