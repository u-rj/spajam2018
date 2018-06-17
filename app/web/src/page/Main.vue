<template>
  <div class="main">
    {{position}}

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
      position: ''
    }
  },
  mounted () {
    this.initializeWrap()

    this.$mock('/api/info', {
      user_id: this.storage.get('user_id'),
      latitude: 1,
      longitude: 2,
      tune_title: 'ここだけのはなし',
      tune_artist: 'チャットモンチー'
    }).then((response) => {
      console.log(response)
    }).catch((err) => {
      console.log(err)
    })

    if (window.wrapMode) {
      let bgGeo = window.BackgroundGeolocation
      bgGeo.on('location', (locationData, taskId) => {
        console.log(locationData)
        alert(JSON.stringify(locationData))
        this.position.latitude = locationData.coords.latitude
        this.position.longitude = locationData.coords.longitude

        this.$mock('/api/info', {
          user_id: this.storage.get('user_id'),
          latitude: this.position.latitude,
          longitude: this.position.longitude,
          tune_title: 'ここだけのはなし',
          tune_artist: 'チャットモンチー'
        }).then((response) => {
          console.log(response)
        }).catch((err) => {
          console.log(err)
        })

        bgGeo.finish(taskId)
      }, () => {
        alert('geolocation error')
      })
      bgGeo.ready({
        desiredAccuracy: 0,
        distanceFilter: 10,
        stationaryRadius: 50,
        locationUpdateInterval: 1000,
        fastestLocationUpdateInterval: 5000,

        activityType: 'AutomotiveNavigation',
        activityRecognitionInterval: 5000,
        stopTimeout: 5,

        debug: true,
        stopOnTerminate: false,
        startOnBoot: true
      }, function (state) {
        console.log('BackgroundGeolocation ready: ', state)

        if (!state.enabled) {
          bgGeo.start()
        }
      })
    }
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
.main {
  background: url(../assets/home.png);
  background-size: 100% auto;
  height: 100vh;
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
