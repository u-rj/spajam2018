<template>
  <div>
    {{position}}
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
    setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        this.position = 'Latitude: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude + '\n' + 'Altitude: ' + position.coords.altitude + '\n' + 'Accuracy: ' + position.coords.accuracy + '\n' + 'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' + 'Heading: ' + position.coords.heading + '\n' + 'Speed: ' + position.coords.speed + '\n' + 'Timestamp: ' + position.timestamp + '\n'
      }, () => {
        this.position = 'error!!'
      })
    }, 1000)

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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
