<template>
  <div class="login">
    <img src="../assets/close-button.png" alt="" class="close-button button-effect" @click="close">
    <div class="login-container">
      <p class="title">ログイン</p>
      <p class="validate-text">{{validateText}}　</p>
      <p class="email-label">メールアドレス</p>
      <input v-model="data.email" class="email-input" type="text">
      <p class="password-label">パスワード</p>
      <input v-model="data.password" class="password-input" type="password">
      <p @click="login" :disabled="!data.email || !data.password" class="login-button button-effect">ログイン</p>
      <!--<p class="forget-button button-effect">パスワードを忘れましたか？</p>-->
      <hr class="divider">
      <p @click="facebookLogin()" class="facebook-button button-effect">Facebookでログイン</p>
    </div>
    <div v-show="loading" class="loading">
      <img class="loading-image" src="../assets/loading.svg">
      <p class="loading-text">Now Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        email: '',
        password: ''
      },
      validateText: '',
      loading: false
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
    },
    close () {
      this.$router.push({name: 'welcome'})
    },
    login () {
      this.loading = true
      this.auth.login(this.data.email, this.data.password, (data) => {
        this.loading = false
        if (!data) {
          this.validateText = 'メールアドレスまたはパスワードが間違っています。'
          return
        }
        this.$router.push({name: 'main'})
      })
    },
    facebookLogin () {
      this.loading = true
      this.auth.facebookLogin((data) => {
        this.loading = false
        if (!data) {
          this.dialog.alert('ユーザーが存在しません。')
          return
        }
        this.$router.push({name: 'main'})
      })
    }
  }
}
</script>

<style scoped>
.button-effect:active,
.button-effect:hover {
  opacity: 0.5;
}
.login {
  // background: url(../assets/page-login.png);
  background-size: 100%;
  padding: 35px 30px;;
}
.close-button {
  width: 35px;
}
.login-container {
  padding: 25px;
}

.title {
  font-size: 20px;
  margin-bottom: 10px;
}
.validate-text {
  font-size: 14px;
  margin-bottom: 10px;
  color: #DE7682;
}

.email-label {
  margin-bottom: 5px;
}
.email-input {
  width: 100%;
  font-size: 18px;
  padding: 4px;
  margin-bottom: 20px;
  border: 1px solid lightgray;
}
.password-label {
  margin-bottom: 5px;
}
.password-input {
  width: 100%;
  font-size: 18px;
  padding: 4px;
  margin-bottom: 40px;
  border: 1px solid lightgray;
}
.login-button {
  color: white;
  background: #DE7682;
  padding: 8px 0;
  width: 100%;
  text-align: center;
  font-size: 18px;
  margin-bottom: 5px;
}
.forget-button {
  text-align: center;
  font-size: 13px;
  margin-bottom: 35px;
}
.divider {
  margin-bottom: 20px;
}

.facebook-button {
  margin: 0 auto;
  display: block;
  width: 72vw;
  margin-bottom: 20px;
  background: #455797;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 0;
  overflow: hidden;
  line-height: 24px;
}

.facebook-button::before {
  content: '';
  display: block;
  width: 25px;
  height: 25px;
  background: url(../assets/facebook.svg);
  float: left;
  margin-right: 35px;
  margin-left: 15px;
}

.loading {
  position: fixed;
  background: white;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}
.loading-image {
  display: block;
  width: 15vw;
  margin: 43vh auto 0px;
}
.loading-text {
  text-align: center;
  margin-top: 8px;
  font-size: 12px;
  font-weight: bold;
}
</style>
