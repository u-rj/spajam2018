<template>
  <div id="page-dev">
    <span v-for="(value, index) in routeList"><router-link :to="value.path">{{value.name}}</router-link><br></span>
    <br><a @click="ryoju">Ryoju</a>
    <br><a @click="mami">Mami</a>
    <br><a @click="test">test</a>
  </div>
</template>

<script>
import route from '../router'
export default {
  data () {
    return {
      routeList: null
    }
  },
  mounted () {
    this.routeList = route.options.routes
  },
  methods: {
    test () {
      let userId = '5073915248377856'
      let password = 'b21b43a3-80f4-49a7-b38f-e06da1397bfa'
      this.$http.post(
        '/user/auth/login',
        {
          user_id: userId,
          password: password
        }
      ).then((response) => {
        this.$http.post(
          '/cluster',
          {
            content_id: 0,
            hexagon_index: 0,
            layer: 0
          }
        ).then((response) => {
        })
      })
    },
    ryoju () {
      this.dialog.alert('「大畑 僚樹」でログイン')
      let userId = '5708821892694016'
      let password = 'c074e3d0-e237-4a84-9e7f-6fd105b05086'
      this.auth.login(userId, password, (data) => {
        this.$router.push({name: 'main'})
      })
    },
    mami () {
      this.dialog.alert('テストユーザー「今井 麻美」でログイン')
      let userId = '5073915248377856'
      let password = 'b21b43a3-80f4-49a7-b38f-e06da1397bfa'
      this.auth.login(userId, password, (data) => {
        this.$router.push({name: 'main'})
      })
    }
  }
}
</script>

<style scoped>
</style>
