<template>
  <div class="main">
    <input class="input1" placeholder="あなたのお名前は？" type="text" v-model="data.user_name">
    <input class="input2" placeholder="email@example.com" type="email" v-model="data.email">
    <input class="input3" placeholder="パスワードを設定" type="password" v-model="data.password">
    <button :disabled="!data.user_name || !data.email || !data.password" @click="createUser"></button>
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
      this.$http.get('/api/user/create', this.data).then((response) => {
        console.log(response)
        let data = response.data
        this.storage.set('user_id', data.id)
        this.$router.push({name: 'main'})
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background: url(../assets/signup.png);
  background-size: 100% auto;
  height: 100vh;
}
.main {
  padding: 242px 40px 0;
}
input {
  font-size: 14px;
  border: none;
  width: 100%;
  background: transparent;
  height: 18px;
}
input:focus {
  border-bottom: 2px solid gray;
}
.input1 {
  margin-bottom: 90px;
}
.input2 {
  margin-bottom: 90px;
}
.input3 {
  margin-bottom: 50px;
}
button {
  background: transparent;
  width: 100%;
  height: 50px;
}
button:disabled {
  background: rgba(255,255,255,.8);
}
</style>
