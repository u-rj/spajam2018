<template>
  <div>
    <img src="../assets/mock.png">
    <div class="tap tap1" @click="tap1"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    tap1 () {
      setTimeout(() => {
        this.$router.push({name: 'welcome'})
      }, 10)
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
.tap {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  // background: blue;
}

.tap1 {
  left: 100px;
  top: 100px;
  width: 200px;
  height: 300px;
}
.tap1:hover {
  opacity: 0.2;
  background: black;
}
</style>
