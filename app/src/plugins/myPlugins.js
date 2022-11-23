//Vue插件一定暴露一个对象
let myPlugins = {};
myPlugins.install = function (Vue, options) {
    //全局指令
    Vue.directive(options.name, (element,params) => {
        // console.log('111');
        element.innerHTML = params.value.toUpperCase();
    });
};
export default myPlugins;