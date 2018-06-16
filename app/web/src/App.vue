<template>
  <div id="app">
    <!--
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
    -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      transitionName: null
    }
  },
  watch: {
    $route (to, from) {
      /*
      if (from.name === 'welcome' && to.name === 'login') {
        this.transitionName = 'slide-left'
      } else if (from.name === 'login' && to.name === 'welcome') {
        this.transitionName = 'slide-right'
      } else if (from.name === 'welcome' && to.name === 'create-user') {
        this.transitionName = 'slide-left'
      } else if (from.name === 'create-user' && to.name === 'welcome') {
        this.transitionName = 'slide-right'
      } else if (to.name === 'main') {
        this.transitionName = 'slide-left'
      } else if (from.name === 'main') {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = null
      }
      */
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  user-select: none;
}

*:not(html) {
  transform: translate3d(0,0,0);
}

body {
  position: absolute;
  height: 100vh;
  font-size: 4.3vw;
}

button {
  border: none;
}

button[disabled] {
  opacity: 0.4 !important;
}

input {
  user-select: auto;
}

img {
  display: block;
}

.pswp__button--close {
  background-image: url(assets/modal-close-button.png) !important;
  background-size: 44px !important;
  background-position: 0 !important;
  float: left !important;
  margin-top: 25px !important;
  margin-left: 10px !important;
}
.pswp__top-bar {
  background-color: transparent !important;
}

/*
.child-view {
  width: 100%;
  position: absolute;
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
*/
</style>
