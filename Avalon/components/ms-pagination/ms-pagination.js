var avalon = require('avalon');

var currentState = mmState.currentState;
avalon.component('ms:pagination', {
    $template: __inline('./ms-pagination.html'),
    $replace: 1,
    $init: function (vm) {
        vm.prevPage = function () {
            if (vm.currentPage !== 1) {
                // 进入前一页，state不变，query中的page参数减一
                avalon.router.go(currentState.stateName, { query: { page: --vm.currentPage } });
            }
        }
        vm.nextPage = function () {
            if (vm.currentPage !== vm.pageCount) {
                // 进入前一页，state不变，query中的page参数加一
                avalon.router.go(currentState.stateName, { query: { page: ++vm.currentPage } });
            }
        }
    },
    $parentVmId: '',
    currentPage: 1,
    pageCount: 3,
    prevPage: avalon.noop,
    nextPage: avalon.noop,
    $containerVmId: ''
});