var avalon = require('avalon');
var bootbox = require('bootbox.js/bootbox');

avalon.component('ms:dialog', {
    $slot: 'content',
    content: '',
    $template: '',
    $replace: 0,
    $init: function (vm) {
        vm.$watch('show', function (newV) {
            if (newV) {
                var params = {isEdit: false};
                vm.$dialog = bootbox.dialog({
                    message: vm.$content,
                    title: params.isEdit ? '修改地址' : '新增地址',
                    className: params.isEdit ? 'modal-primary' : 'modal-success',
                    buttons: {
                        save: {
                            label: '保存',
                            className: "btn-blue",
                            callback: function (close) {
                                console.log(params.isEdit ? '修改' : '新增', form.demo.$model);
                                close();
                                return false;
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
            } else {
                vm.$dialog && vm.$dialog.find('.bootbox-close-button').trigger('click');
            }
        });
    },
    $ready: function (vm, el) {
        vm.$content = $.trim($('<div>').append(vm.content).html());
    },
    $content: '',
    $dialog: null,
    show: false,
    containerVmId: ''
});