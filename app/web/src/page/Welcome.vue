<template>
  <div>
    SignUp
    <input type="text" v-model="data.user_name">
    <input type="email" v-model="data.email">
    <input type="password" v-model="data.password">
    <button :disabled="!data.user_name || !data.email || !data.password" @click="createUser">ユーザ作成</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        user_name: '',
        email: '',
        password: ''
      }
    }
  },
  mounted () {
    this.initializeWrap()
  },
  methods: {
    initializeWrap () {
      if (window.wrapMode) {
        setTimeout(() => {
          /*
          if (window.StatusBar) {
            window.StatusBar.styleLightContent()
            // window.StatusBar.overlaysWebView(true)
          }
          */
          if (window.navigator && window.navigator.splashscreen) {
            window.navigator.splashscreen.hide()
          }
        }, 1000)
      }
    },
    createUser () {
      this.$mock('/api/user/create', this.data).then((response) => {
        console.log(response)
        this.storage.set('user_id', response.user_id)
        this.$router.push({name: 'main'})
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
