<template>
  <div>
    <img class="loading" src="../assets/loading.svg">
    <p class="loading-text">Now Loading...</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      let facebookAccessToken = this.storage.get('facebookAccessToken')
      if (!facebookAccessToken) {
        this.dialog.alert('アクセストークンが存在しません')
        this.$router.push({name: 'welcome'})
        return
      }

      this.$http.post(
        '/sns/facebook/login',
        {
          access_token: facebookAccessToken
        }
      ).then((response) => {
        console.log('login-sns response', response)
        // let result = response.data.result
        this.$router.push({name: 'main'})
      }).catch(() => {
        this.$router.push({name: 'welcome'})
      })
    }
  }
}
</script>

<style scoped>
.loading {
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
