import Vue from 'vue';
import App from './App.vue';
import router from './router' 
console.log(process.env.NODE_ENV) 
console.log(333)
new Vue({
    el: '#app',
    router,
    components: { App }, 
    template: '<App/>' 
}) 
