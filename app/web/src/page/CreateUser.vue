<template>
  <div class="login">
    <img src="../assets/close-button.png" alt="" class="close-button button-effect" @click="close">
    <div class="login-container">
      <p class="title">アカウント作成</p>
      <p class="validate-text">{{validateText}}　</p>
      <p class="email-label">メールアドレス</p>
      <input placeholder="メールアドレス" v-model="data.email" class="email-input" type="text">
      <p class="password-label">パスワード</p>
      <input placeholder="パスワード" v-model="data.password" class="password-input" type="password">
      <input placeholder="確認用パスワード" v-model="data.confirmPassword" class="password-confirm-input" type="password">
      <p class="password-message">パスワードは4文字以上である必要があります。</p>
      <p @click="createUser" :disabled="!data.email || !data.password || data.password != data.confirmPassword || data.password.length < 4" class="login-button button-effect">アカウントの作成</p>
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
        password: '',
        confirmPassword: ''
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
    createUser () {
      this.loading = true
      this.auth.createUser(this.data.email, this.data.password, (data) => {
        this.loading = false
        if (!data) {
          this.validateText = 'すでにメールアドレスが登録されております。'
          return
        }
        this.$router.push({name: 'main'})
      })
    }
  }
}
</script>

<style scoped>
</style>
