// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMoment from 'vue-moment'
import App from './App'
import service from './service'
import router from './router'
import Quasar, * as All from 'quasar-framework'
import 'quasar-extras/roboto-font'
import 'quasar-extras/material-icons'
import 'quasar-extras/fontawesome'
// import 'quasar-extras/ionicons'
import 'quasar-framework/dist/quasar.ios.css'

Vue.config.productionTip = false
Vue.use(service)
Vue.use(VueMoment)

Vue.use(Quasar, {
  components: All,
  directives: All
})

/* ------------------
 * main
------------------- */
function start () {
  console.log('start')
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  })
}

/* ------------------
 * deviceready
------------------- */
window.$http.defaults.baseURL = 'https://jymes7a0pa.execute-api.ap-northeast-1.amazonaws.com/api/'
/*
window.facebookAppId = '153582438774039'
window.debugMode = true
window.apiMode = 'dev'
if (window.wrapMode) {
  document.addEventListener('deviceready', function () {
    window.deviceReady = true
    window.StatusBar.styleLightContent()

    window.cordova.getAppVersion.getVersionNumber().then((version) => {
      window.log('deviceready', version)
      if (parseInt(version) / 1000 === 2) {
        window.log('tst')
        window.$http.defaults.baseURL = 'https://front-dot-starmine-tst.appspot.com/api/'
        window.facebookAppId = '309347436255999'
        window.debugMode = false
        window.apiMode = 'tst'
      } else if (parseInt(version) / 1000 === 1) {
        window.log('dev')
      } else {
        window.log('pro')
        window.$http.defaults.baseURL = 'https://front-dot-starmine-pro.appspot.com/api/'
        window.facebookAppId = '2034367970127700'
        window.debugMode = false
        window.apiMode = 'pro'
      }
      start()
    })
    // if (window.BuildInfo.debug) {
    // }
  }, false)
} else {
}
*/
start()
/* ------------------
 * scheme handler
------------------- */
window.handleOpenURL = (url) => {
  setTimeout(() => {
    // window.dialog.alert('received url: ' + url)
  }, 0)
}
