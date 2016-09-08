var Vue = require('vue');

Vue.component('amazing-vue', {
    props: ['text'],
    template: '<div><input v-model="text"><button @click="changeToUpperCase">Upper Case</button></div>',
    data: function () {
        return { };
    },
    methods: {
        changeToUpperCase: function () {
            this.text = this.text.toUpperCase();
        }
    }
});