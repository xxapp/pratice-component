var avalon = require('avalon');

avalon.component('ms:controlText', {
    $template: __inline('./ms-control-text.html'),
    $replace: 1,
    $$template: function (tmpl) {
        return tmpl.replace(/ms-duplex="record\[col\]"/g, 'ms-duplex="record[\'' + this.col.replace('.', '\'][\'') + '\']"');
    },
    $init: function (vm) {
    },
    label: '',
    col: '',
});