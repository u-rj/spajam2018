<template>
  <div class="main">
    <div class="show-detail" @click="detail = true">
    </div>

    <transition name="slide-top">
      <div @click="detail = false" v-if="detail" class="detail slide-top">
      </div>
    </transition>

    <div class="toolbar">
      <div @click="$router.push({name: 'main'})"><img src="../assets/toolbar1.png"></div>
      <div @click="$router.push({name: 'area'})"><img src="../assets/toolbar2.png"></div>
      <div @click="$router.push({name: 'match'})"><img src="../assets/toolbar3.png"></div>
      <div @click="logout"><img src="../assets/toolbar4.png"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      position: {
        latitude: '',
        longitude: ''
      },
      detail: false
    }
  },
  mounted () {
    this.initializeWrap()

    this.$mock('/api/area_popular').then((response) => {
      console.log(response)
    }).catch((err) => {
      console.log(err)
    })
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
    logout () {
      if (confirm('ログアウトしますか?')) {
        this.storage.remove('user_id')
        this.$router.push({name: 'welcome'})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-top {
  // transition: all .5s cubic-bezier(.55,0,.1,1);
  transition: all .25s;
}
.slide-top-enter, .slide-top-leave-active {
  // opacity: 0;
  transform: translate(100vw, 0);
}

.main {
  background: url(../assets/match-event.png);
  background-size: 100% auto;
  height: 100vh;
}

.main {
  position: relative;
}

.detail {
  position: absolute;
  top: 0;
  left: 0;
  background: url(../assets/match-event-detail.png);
  background-size: 100% auto;
  height: 100vh;
  width: 100vw;
}

.show-detail {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}

.toolbar {
  z-index: 1000;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  div {
    width: calc(100% / 4);
    img {
      width: 100%;
    }
    float: left;
  }
}
</style>
