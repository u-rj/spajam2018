<template>
  <div>
    <img class="logo" src="../assets/service-logo.png">
    <p class="welcome-text">Welcome to STARMINE!</p>
    <p class="sub-text" @click="devPage">Facebookと連携して、まずは<br>自分の投稿を振り返りましょう！</p>
    <p @click="facebookCreateUser()" class="facebook-button button-effect"><span class="facebook-button-text">Facebookアカウントで登録</span></p>
    <p @click="createUserOpen" class="email-button button-effect"><span class="email-button-text">メールアドレスで登録</span></p>
    <p class="login-button button-effect" @click="loginOpen">ログイン</p>

    <transition name="slide-top">
      <div v-if="createUserModal" class="create-user slide-top">
        <img src="../assets/close-button.png" alt="" class="close-button button-effect" @click="createUserClose">
        <div class="login-container">
          <p class="title">アカウント作成</p>
          <p class="validate-text">{{validateText}}　</p>
          <p class="email-label">メールアドレス</p>
          <input placeholder="メールアドレス" v-model="data.email" class="email-input" type="email" :class="{invalid: invalidEmail}">
          <p class="password-label">パスワード<span class="password-invalid-text" v-if="data.password != data.confirmPassword">パスワードが一致しません。</span></p>
          <input placeholder="パスワード" v-model="data.password" class="password-input" type="password" @focus="passwordFocus()" :class="{invalid: data.password != data.confirmPassword}">
          <input placeholder="確認用パスワード" v-model="data.confirmPassword" class="password-confirm-input" type="password" @focus="passwordFocus()" :class="{invalid: data.password != data.confirmPassword}">
          <p class="password-message">パスワードは4文字以上である必要があります。</p>
          <button @click="createUser" :disabled="!data.email || !data.password || data.password != data.confirmPassword || data.password.length < 4 || !validEmail(data.email)" class="login-button button-effect">アカウントの作成</button>
        </div>
      </div>
    </transition>

    <transition name="slide-top">
      <div v-if="loginModal" class="login slide-top">
        <img src="../assets/close-button.png" alt="" class="close-button button-effect" @click="loginClose">
        <div class="login-container">
          <p class="title">ログイン</p>
          <p class="validate-text">{{validateText}}　</p>
          <p class="email-label">メールアドレス</p>
          <input v-model="data.email" class="email-input" type="email" :class="{invalid: invalidEmail}">
          <p class="password-label">パスワード</p>
          <input v-model="data.password" class="password-input" type="password" @focus="passwordFocus()" :class="{invalid: invalidPassword}">
          <button @click="login" :disabled="!data.email || !data.password || !validEmail(data.email)" class="login-button button-effect">ログイン</button>
          <!--<p class="forget-button button-effect">パスワードを忘れましたか？</p>-->
          <hr class="divider">
          <p @click="facebookLogin()" class="facebook-button button-effect"><span class="facebook-button-text">Facebookでログイン</span></p>
        </div>
      </div>
    </transition>

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
      loading: false,
      loginModal: false,
      createUserModal: false,
      data: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      validateText: '',
      invalidEmail: false,
      invalidPassword: false
    }
  },
  mounted () {
    this.initializeWrap()
  },
  methods: {
    // initiazileWrap
    // wrap初期化処理
    initializeWrap () {
      if (window.wrapMode) {
        setTimeout(() => {
          if (window.StatusBar) {
            window.StatusBar.styleLightContent()
            // window.StatusBar.overlaysWebView(true)
          }
          if (window.navigator && window.navigator.splashscreen) {
            window.navigator.splashscreen.hide()
          }
        }, 2000)
      }
    },
    // devPage
    // 開発用のテストページ
    devPage () {
      if (!window.debugMode) return
      this.$router.push({name: 'dev'})
    },
    // facebookCreateUser
    facebookCreateUser () {
      setTimeout(() => {
        this.loading = true
      }, 1000)
      this.auth.facebookCreateUser((data) => {
        if (!data) {
          setTimeout(() => {
            this.loading = false
          }, 500)
          return
        }
        this.$router.push({name: 'main'})
      })
    },
    // createUser
    createUserOpen () {
      this.createUserModal = true
    },
    createUserClose () {
      this.validateText = ''
      this.data = {
        email: '',
        password: '',
        confirmPassword: ''
      }
      this.invalidEmail = false
      this.invalidPassword = false
      this.createUserModal = false
    },
    createUser () {
      // this.loading = true
      this.auth.createUser(this.data.email, this.data.password, (data) => {
        // this.loading = false
        if (!data) {
          this.validateText = 'すでにメールアドレスが登録されております。'
          return
        }
        this.$router.push({name: 'main'})
      })
    },
    loginOpen () {
      this.loginModal = true
    },
    loginClose () {
      this.validateText = ''
      this.data = {
        email: '',
        password: '',
        confirmPassword: ''
      }
      this.invalidEmail = false
      this.invalidPassword = false
      this.loginModal = false
    },
    login () {
      // this.loading = true
      this.auth.login(this.data.email, this.data.password, (data) => {
        // this.loading = false
        if (!data) {
          this.validateText = 'メールアドレスまたはパスワードが間違っています。'
          this.invalidEmail = true
          this.invalidPassword = true
          return
        }
        this.$router.push({name: 'main'})
      })
    },
    facebookLogin () {
      setTimeout(() => {
        this.loading = true
      }, 1000)
      this.auth.facebookLogin((data) => {
        if (!data) {
          setTimeout(() => {
            this.loading = false
          }, 500)
          return
        }
        this.$router.push({name: 'main'})
      })
    },
    validEmail (value) {
      // eslint-disable-next-line
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(value)
    },
    passwordFocus () {
      this.invalidEmail = !this.validEmail(this.data.email) && this.data.email.length > 0
    }
  }
}
</script>

<style lang="scss" scoped>
.button-effect:active,
.button-effect:hover {
  opacity: 0.5;
}

.slide-top {
  // transition: all .5s cubic-bezier(.55,0,.1,1);
  transition: all .35s;
}
.slide-top-enter, .slide-top-leave-active {
  // opacity: 0;
  transform: translate(0, 100vh);
}

p {
  margin: 0;
  padding: 0;
  line-height: 1.4;
  color: #444444;
}
img {
  display: block;
}

.invalid {
  border: 1px solid #DE7682 !important;
}

.logo {
  display: block;
  margin: 0 auto 6vh;
  padding-top: 12vh;
  width: 45vw;
}

.welcome-text {
  text-align: center;
  font-weight: bold;
  font-size: 5.3vw;
  margin-bottom: 7vh;
}

.sub-text {
  text-align: center;
  font-weight: bold;
  font-size: 4.3vw;
  margin-bottom: 6vh;
}

.facebook-button {
  margin: 0 auto;
  display: block;
  width: 72vw;
  margin-bottom: 2vh;
  background: #455797;
  color: white;
  border-radius: 5px;
  padding: 1.2vh 0;
  overflow: hidden;
  line-height: 24px;
}
.facebook-button-text {
  font-size: 4vw;
  font-weight: bold;
  text-align: center;
  width: calc(100% - 40px);
  display: inline-block;
}

.facebook-button::before {
  content: '';
  display: block;
  width: 25px;
  height: 25px;
  background: url(../assets/facebook.svg);
  float: left;
  // margin-right: 15px;
  margin-left: 15px;
}

.facebook-button:active {
  opacity: 0.4;
}

.email-button {
  margin: 0 auto;
  display: block;
  width: 72vw;
  margin-bottom: 3.5vh;
  background: #CCCCCC;
  color: black;
  border-radius: 5px;
  font-size: 4vw;
  font-weight: bold;
  padding: 1.2vh 0;
  overflow: hidden;
  line-height: 24px;
}

.email-button::before {
  content: '';
  display: block;
  width: 30px;
  height: 25px;
  background: url(../assets/email.svg);
  background-size: 100%;
  background-repeat: no-repeat;
  float: left;
  margin-left: 15px;
}

.email-button-text {
  font-size: 4vw;
  font-weight: bold;
  text-align: center;
  width: calc(100% - 45px);
  display: inline-block;
}

.email-button:active {
  opacity: 0.4;
}

.login-button {
 color: #5AA2F4;
 font-weight: bold;
 text-align: center;
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

.create-user {
  background: white;
  // background: url(../assets/page-create.png);
  background-size: 100%;
  padding: 6vh 9vw;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;

  .close-button {
    width:  9vw;
  }
  .login-container {
    padding: 4vh 6vw 0;
  }

  .title {
    font-size: 6vw;
    margin-bottom: 1.8vh;
  }
  .validate-text {
    font-size: 4vw;
    margin-bottom: 1.5vh;
    color: #DE7682;
  }

  .email-label {
    margin-bottom: 0.8vh;
  }
  .email-input {
    user-select: auto;
    width: 100%;
    font-size: 4.5vw;
    padding: 1vw;
    margin-bottom: 4vh;
    border: 1px solid lightgray;
  }
  .password-label {
    margin-bottom: 0.8vh;
    .password-invalid-text {
      color: #DE7682;
      font-size: 3.2vw;
      margin-left: 4vw;
    }
  }
  .password-input {
    user-select: auto;
    width: 100%;
    font-size: 4.5vw;
    padding: 1vw;
    margin-bottom: 2vh;
    border: 1px solid lightgray;
  }
  .password-confirm-input {
    user-select: auto;
    width: 100%;
    font-size: 4.5vw;
    padding: 1vw;
    margin-bottom: 2.5vh;
    border: 1px solid lightgray;
  }
  .password-message {
    font-size: 3.6vw;
    line-height: 1.4;
    margin-bottom: 4.4vh;
  }
  .login-button {
    color: white;
    background: #DE7682;
    padding: 2vh 0;
    width: 100%;
    text-align: center;
    font-size: 4.5vw;
    line-height: 1;
  }
}

.login {
  background: white;
  // background: url(../assets/page-login.png);
  background-size: 100%;
  padding: 6vh 9vw;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;

  .close-button {
    width:  9vw;
  }
  .login-container {
    padding: 4vh 6vw 0;
  }

  .title {
    font-size: 6vw;
    margin-bottom: 1.8vh;
  }
  .validate-text {
    font-size: 4vw;
    margin-bottom: 1.5vh;
    color: #DE7682;
  }

  .email-label {
    margin-bottom: 0.8vh;
  }
  .email-input {
    user-select: auto;
    width: 100%;
    font-size: 4.5vw;
    padding: 1vw;
    margin-bottom: 3vh;
    border: 1px solid lightgray;
  }
  .password-label {
    margin-bottom: 0.8vh;
  }
  .password-input {
    user-select: auto;
    width: 100%;
    font-size: 4.5vw;
    padding: 1vw;
    margin-bottom: 6vh;
    border: 1px solid lightgray;
  }
  .login-button {
    color: white;
    background: #DE7682;
    padding: 1.5vh 0;
    width: 100%;
    text-align: center;
    font-size: 4.5vw;
    line-height: 1;
    margin-bottom: 1vh;
  }
  .forget-button {
    text-align: center;
    font-size: 3vw;
    margin-bottom: 6.5vh;
  }
  .divider {
    margin-bottom: 3vh;
    margin-top: 6.5vh;
  }

  .facebook-button {
    margin: 0 auto;
    display: block;
    width: 72vw;
    margin-bottom: 2vh;
    background: #455797;
    color: white;
    border-radius: 5px;
    padding: 1.2vh 0;
    overflow: hidden;
    line-height: 24px;
  }
  .facebook-button-text {
    font-size: 4vw;
    font-weight: bold;
    text-align: center;
    width: calc(100% - 40px);
    display: inline-block;
  }

  .facebook-button::before {
    content: '';
    display: block;
    width: 25px;
    height: 25px;
    background: url(../assets/facebook.svg);
    float: left;
    // margin-right: 15px;
    margin-left: 15px;
  }

  .facebook-button:active {
    opacity: 0.4;
  }
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
