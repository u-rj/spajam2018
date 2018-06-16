<template>
  <div class="main">
    <p class="message">SignUp</p>
    <input placeholder="User Name" type="text" v-model="data.user_name">
    <input placeholder="E-mail" type="email" v-model="data.email">
    <input placeholder="Password" type="password" v-model="data.password">
    <button v-if="!(!data.user_name || !data.email || !data.password)" @click="createUser">Sign Up</button>
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
.main {
  // background: url(../assets/signup.png);
  // background-size: 100% auto;
  // height: 100vh;
}
.main {
  padding: 90px 60px 0;
}
.message {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 80px;
}
input {
  font-size: 20px;
  margin-bottom: 15px;
  border: none;
}
input:focus {
  border-bottom: 2px solid gray;
}
button {
  background: white;
  color: gray;
  font-weight: bold;
}
</style>
