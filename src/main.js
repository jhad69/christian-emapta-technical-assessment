import Vue from 'vue'
// import VueMaterial from 'vue-material'
import App from './App.vue'
import { MdApp, MdButton, MdCard, MdContent, MdDialog, MdDialogAlert, MdDialogConfirm, MdDialogPrompt, MdField, MdIcon, MdList, MdMenu, MdProgress, MdRipple, MdSnackbar,  MdToolbar } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

Vue.use(MdApp)
Vue.use(MdButton)
Vue.use(MdCard)
Vue.use(MdContent)
Vue.use(MdDialog)
Vue.use(MdDialogAlert)
Vue.use(MdDialogConfirm)
Vue.use(MdDialogPrompt)
Vue.use(MdField)
Vue.use(MdIcon)
Vue.use(MdList)
Vue.use(MdMenu)
Vue.use(MdProgress)
Vue.use(MdRipple)
Vue.use(MdSnackbar)
Vue.use(MdToolbar)


// Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
