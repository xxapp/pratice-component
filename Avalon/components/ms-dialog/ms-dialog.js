var avalon = require('avalon');
var bootbox = require('bootbox.js/bootbox');

avalon.component('ms:dialog', {
    $slot: 'content',
    content: '',
    header: '',
    $template: '',
    $replace: 0,
    onInit: avalon.noop,
    $init: function (vm, el) {
        vm.$watch('show', function (newV) {
            var header = $(vm.header).children().text();
            if (newV) {
                vm.$dialog = bootbox.dialog({
                    message: vm.$content,
                    title: vm.title ? vm.title : header ? header : vm.isEdit ? '修改' : '新增',
                    className: vm.isEdit ? 'modal-primary' : 'modal-success',
                    size: vm.size,
                    buttons: {
                        save: {
                            label: '保存',
                            className: "btn-blue",
                            callback: function () {
                                return vm.$post({
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
                }).on('hidden.bs.modal', function () { 
                    vm.show = false;
                    setTimeout(function () {
                        if ($('.modal.in').length) {
                            $('body').addClass('modal-open');
                        } else {
                            $('body').removeClass('modal-open');
                        }
                    }, 100);
                })
                .on('shown.bs.modal', function () {
                    vm.power();
                });
                avalon.scan(vm.$dialog.get(0));
            } else {
                vm.$dialog && vm.$dialog.find('.bootbox-close-button').trigger('click');
            }
        });
        vm.$watch('valid', function (newV) {
            if (!this.$dialog) return ;
            var $confirmBtn = this.$dialog.find('.modal-footer > button[data-bb-handler=save]');
            if (newV) {
                // 去掉确定按钮的disabled属性
                $confirmBtn.removeAttr('disabled');
            } else {
                // 给确定按钮加上disabled属性
                $confirmBtn.attr('disabled', 'disabled');
            }
        });
        vm.$watch('uploading', function (newV) {
            if (!this.$dialog) return ;
            var $confirmBtn = this.$dialog.find('.modal-footer > button[data-bb-handler=save]');
            if (!newV) {
                // 去掉确定按钮的disabled属性
                $confirmBtn.removeAttr('disabled');
            } else {
                // 给确定按钮加上disabled属性
                $confirmBtn.attr('disabled', 'disabled');
            }
        });
    },
    $ready: function (vm, el) {
        vm.$content = $.trim($('<div>').append(vm.content).children().first().attr('ms-controller', vm.$id).parent().html());
        vm.onInit(vm);
    },
    $content: '',
    $dialog: null,
    show: false,
    size: '',
    title: '',
    isEdit: false,
    valid: true,
    uploading: false,
    record: {},
    state: {},
    containerVmId: '',
    $post: avalon.noop,
    power: avalon.noop
});