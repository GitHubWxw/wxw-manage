import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//引入ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import "./assets/css/icon.css";
import "./components/common/directives";
//国际化
import VueI18n from "vue-i18n";
import { messages } from "./components/common/i18n";
import "babel-polyfill"; //转换ES、兼容浏览器

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "zh", // 语言标识 //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | bs-manager`;
  const role = localStorage.getItem("ms_username");
  if (!role && to.path !== "/login") {
    next("/login");
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === "admin" ? next() : next("/403");
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf("MSIE") > -1 && to.path === "/editor") {
      Vue.prototype.$alert(
        "vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看",
        "浏览器不兼容通知",
        {
          confirmButtonText: "确定"
        }
      );
    } else {
      next();
    }
  }
});
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
