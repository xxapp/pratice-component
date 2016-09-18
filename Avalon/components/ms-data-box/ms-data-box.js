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
        vm.toggleCheckd = function () {
            if (this.checked) {
                avalon.each(vm.list, function(i, v){
                    vm.checked.ensure(v['region_id']);
                });
            } else {
                vm.checked.clear();
            }
        }
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
                url: 'http://127.0.0.1:8081/api/user',
                type: 'get',
                data: {
                }
            }).then(function (result) {
                cb && cb();
                beyond.hideLoading();
                // 更新vm
                vm.list = result.list;
                vm.checked.clear;
                vm.selected_all = false;
            });
        }

        vm.$watch('checked.length', function (newV) {
            if (newV == vm.list.size()) {
                vm.selected_all = true;
            } else {
                vm.selected_all = false;
            }
        });
    },
    $childReady: function (vm, e) {
        // 在所有子组件上面保存容器组件的vmId
        for (var i in vm.$refs) {
            vm.$refs[i].$parentVmId = vm.$id;
        }
    },
    $ready: function (vm) {
        vm.onInit(vm);
    },
    list: [],
    checked: [],
    selected_all: false,
    toggleCheckd: avalon.noop,
    add: avalon.noop,
    edit: avalon.noop,
    del: avalon.noop,
    loadData: avalon.noop
});