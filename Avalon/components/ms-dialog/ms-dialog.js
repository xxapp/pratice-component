var avalon = require('avalon');
var bootbox = require('bootbox.js/bootbox');

avalon.component('ms:dialog', {
    $slot: 'content',
    content: '',
    header: '',
    $template: '',
    $replace: 0,
    $init: function (vm, el) {
        vm.$watch('show', function (newV) {
            var header = $(vm.header).children().text();
            if (newV) {
                vm.$dialog = bootbox.dialog({
                    message: vm.$content,
                    title: vm.title ? vm.title : header ? header : vm.isEdit ? '修改' : '新增',
                    className: vm.isEdit ? 'modal-primary' : 'modal-success',
                    buttons: {
                        save: {
                            label: '保存',
                            className: "btn-blue",
                            callback: function () {
                                vm.$post({
                                    isEdit: vm.isEdit,
                                    record: vm.record.$model
                                });
                            }
                        },
                        cancel: {
                            label: '取消',
                            className: "btn-default",
                            callback: function () {
                            }
                        }
                    }
                }).on('hidden.bs.modal', function () { vm.show = false; });
                avalon.scan(vm.$dialog.get(0));
            } else {
                vm.$dialog && vm.$dialog.find('.bootbox-close-button').trigger('click');
            }
        });
    },
    $ready: function (vm, el) {
        vm.$content = $.trim($('<div>').append(vm.content).children().first().attr('ms-controller', vm.$id).parent().html());
    },
    $content: '',
    $dialog: null,
    show: false,
    title: '',
    isEdit: false,
    record: {},
    state: {},
    containerVmId: '',
    $post: avalon.noop
});