<template>
  <div class="page-main">
    <button id="btn" style="opacity: 0"></button>
    <div class="pswp" style="height: 100vh" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="pswp__bg"></div>
        <div class="pswp__scroll-wrap">
          <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
          </div>
          <div class="pswp__ui pswp__ui--hidden">

            <div class="pswp__top-bar">
              <div class="pswp__counter"></div>

              <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

              <!--
              <button class="pswp__button pswp__button--share" title="Share"></button>
              <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
              <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
              -->

              <div class="pswp__preloader">
                <div class="pswp__preloader__icn">
                  <div class="pswp__preloader__cut">
                    <div class="pswp__preloader__donut"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div class="pswp__share-tooltip"></div> 
            </div>

            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>

            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>

            <div class="pswp__caption">
              <div class="pswp__caption__center"></div>
            </div>

          </div>

        </div>

    </div>

    <q-toolbar class="toolbar" color="#4468B0">
      <q-icon class="button-effect" :style="{opacity: (layer >= 1 || detail) ? 1 : 0}" @click="backCluster" name="chevron_left" />
        <q-toolbar-title @click="logout()" class="title">STARMINE
        </q-toolbar-title>
      <q-icon v-show="!loading && !detail" @click="refreshCluster()" class="button-effect refresh-icon" name="refresh" />
      <img v-show="loading" src="../assets/loading2.svg" class="refresh-icon">
      <span v-show="!loading && detail" class="refresh-blank"></span>
    </q-toolbar>

    <div class="cluster" ref="cluster">
      <div class="cluster-inner">
          <canvas class="cluster-canvas" id="cluster-canvas"></canvas>
      </div>
    </div>

    <div v-if="detail" class="content-detail">
      <div class="content-detail-inner" v-if="detail.created_time">
        <img v-if="detail.image" class="image" :src="detail.image" @click="openImage(detail.image)" alt="">
        <!--<img class="image" src="https://img21.shop-pro.jp/PA01331/356/product/93562581.jpg?cmsp_timestamp=20151001080930" alt="">-->
        <p class="title">{{detail.title}}</p>
        <p class="created-time">{{detail.created_time | moment('YYYY/MM/DD') }}</p>
        <p class="note" v-html="detail.note.replace(/\n/g,'<br/>')"></p>
        <p v-if="detail.url" @click="openUrl(detail.url)" class="open-detail button-effect">元のコンテンツを表示</p>
        <p v-if="detail.image && !detail.url" @click="openImage(detail.image)" class="open-detail button-effect">元のコンテンツを表示</p>
        <p @click="deleteContent(detail.content_id)" class="delete button-effect">削除</p>
      </div>
    </div>
  </div>
</template>

<script>
import jquery from 'jquery'
import createjs from 'createjs-module'
import '../../node_modules/jquery.panzoom/dist/jquery.panzoom.min.js'

import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import PhotoSwipe from 'photoswipe/dist/photoswipe.min.js'
import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default.min.js'

let clusterFieldW = 1500
let clusterFieldH = 1500
let isTouch = false
let selectingItem = false

export default {
  data () {
    return {
      hexagonIndex: 0,
      layer: 0,
      contentId: 0,
      loading: false,
      detail: null,
      deleteContentId: null
    }
  },
  mounted () {
    this.initializeWrap()
    this.load()
  },
  methods: {
    // initiazileWrap
    // wrap初期化処理
    initializeWrap () {
      if (window.wrapMode) {
        setTimeout(() => {
          if (window.StatusBar) {
            window.StatusBar.styleLightContent()
          }
          if (window.navigator && window.navigator.splashscreen) {
            window.navigator.splashscreen.hide()
          }
        }, 2000)
      }
    },
    // load
    // ロード処理
    load () {
      this.loading = true
      this.contentId = (this.$route.query.contentId) ? this.$route.query.contentId * 1 : 0
      this.hexagonIndex = (this.$route.query.hexagonIndex) ? this.$route.query.hexagonIndex * 1 : 0
      this.layer = (this.$route.query.layer) ? this.$route.query.layer * 1 : 0

      this.setCanvas()
    },
    // setCanvas
    // キャンバスの設定
    setCanvas () {
      let $canvas = jquery('<canvas class="cluster-canvas" id="cluster-canvas"></canvas>')
      jquery('.cluster-inner').empty().append($canvas)
      let canvas = $canvas[0]
      canvas.width = clusterFieldW
      canvas.height = clusterFieldW

      let w = canvas.width
      let h = canvas.height
      canvas.width = w * window.devicePixelRatio
      canvas.height = h * window.devicePixelRatio
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'

      let $panzoom = jquery('.cluster-inner').panzoom({
        onPan: () => {
          isTouch = false
        },
        onZoom: () => {
          isTouch = false
        }})
      $panzoom.parent().on('mousewheel.focal', (e) => {
        e.preventDefault()
        let delta = e.delta || e.originalEvent.wheelDelta
        let zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0
        $panzoom.panzoom('zoom', zoomOut, {
          increment: 0.01,
          animate: false,
          focal: e
        })
        return false
      })

      if (!this.deleteContentId) {
        this.getCluster()
      } else {
        this.$http.delete(
          '/content/' + this.deleteContentId
        ).then((response) => {
          let status = response.data.status
          // let result = response.data.result
          if (status.code === '0000') {
            this.deleteContentId = null
            this.getCluster()
          } else {
            window.dialog.alert('[エラーコード:' + status.code + '] ' + response.data.comment)
          }
        })
      }
    },
    // getCluster
    // クラスターの取得処理
    getCluster () {
      this.$http.post(
        '/cluster',
        {
          content_id: this.contentId,
          hexagon_index: this.hexagonIndex,
          layer: this.layer
        }
      ).then((response) => {
        console.log('cluster response', response)
        let status = response.data.status
        let result = response.data.cluster
        if (status.type === 'success') {
          this.setCluster(result)
        } else {
          window.dialog.alert('[エラーコード:' + status.code + '] ' + response.data.comment)
        }
      })
    },
    // setCluster
    // クラスターの構築
    setCluster (cluster) {
      let hexSize = this.cluster.getHexSize(window.innerWidth / 5)
      let originX = clusterFieldW / 2 + hexSize.w / 2
      let originY = clusterFieldH / 2 + hexSize.h / 2
      let hexPosition = this.cluster.getPosition(hexSize)
      let that = this

      let stage = new createjs.Stage('cluster-canvas')
      createjs.Touch.enable(stage)
      stage.enableMouseOver()
      stage.scaleX = window.devicePixelRatio
      stage.scaleY = window.devicePixelRatio

      cluster.forEach((value, index) => {
        /*
        jquery('.cluster-canvas').drawPolygon({
          fillStyle: value.content_border_color,
          strokeStyle: value.content_border_color,
          x: hexPosition[index][0] + originX,
          y: hexPosition[index][1] + originY,
          radius: hexSize.h / 2,
          sides: 6,
          rotate: 90
        })
         */
        let marginSize = 1
        let image = new Image()
        image.crossOrigin = 'Anonymous'
        image.addEventListener('load', () => {
          let bitmap = new createjs.Bitmap(image)
          bitmap.x = hexPosition[index][0] + originX + marginSize
          bitmap.y = hexPosition[index][1] + originY + marginSize
          let width = hexSize.w - marginSize * 2
          bitmap.scaleX = width / image.width
          bitmap.scaleY = width / image.width

          bitmap.addEventListener('mousedown', (event) => {
            console.log('start')
            isTouch = true
            bitmap.alpha = 0.7
            stage.update()
            setTimeout(() => {
              bitmap.alpha = 1
              stage.update()
            }, 400)
          })
          bitmap.addEventListener('click', (event) => {
            console.log('end')
            bitmap.alpha = 1
            stage.update()
            if (!isTouch) return
            isTouch = false
            that.selectItem(value)
          })
          stage.addChild(bitmap)
          stage.update()
        }, false)
        image.src = value.content_thumbnail
      })

      jquery('.cluster-inner').panzoom('pan', -(originX - document.querySelector('.cluster').clientWidth / 2) - hexSize.w / 2, -(originY - document.querySelector('.cluster').clientHeight / 2) - hexSize.h / 2)
      this.loading = false
    },
    // selectItem
    // アイテムの選択
    selectItem (item) {
      if (selectingItem) return
      selectingItem = true
      if (item.content_type === 'keyword') {
        if (this.layer >= 2) {
          this.dialog.alert('3階層以上の移動は禁止されています')
          selectingItem = false
          return
        }
        selectingItem = false
        this.$router.push({name: 'main', query: {hexagonIndex: item.hexagon_index, layer: this.layer + 1, contentId: item.content_id}})
      } else {
        this.detail = {
          loading: true
        }
        this.loading = true

        this.$http.get(
          '/content/' + item.content_id
        ).then((response) => {
          let status = response.data.status
          let result = response.data.data
          if (status.code !== '0000') {
            window.dialog.alert('[エラーコード:' + status.code + '] ' + response.data.comment)
            return
          }

          result.content_id = item.content_id
          this.detail = result
          this.loading = false
          selectingItem = false
        })
      }
    },
    openUrl (url) {
      window.open(url, '_system', 'location=yes')
    },
    openImage (image) {
      var pswpElement = document.querySelectorAll('.pswp')[0]

      var items = [
        {
          src: image,
          w: 0,
          h: 0
        }
      ]
      var options = {
        history: false,
        focus: false,
        showAnimationDuration: 0,
        hideAnimationDuration: 0
      }

      if (window.pswpGallery) {
        window.pswpGallery.close()
        delete window.pswpGallery
      }

      window.pswpGallery = new PhotoSwipe(pswpElement, PhotoSwipeUI, items, options)

      let loaded = false
      window.pswpGallery.listen('imageLoadComplete', (index, item) => {
        if (loaded) return
        loaded = true
        console.log(item)
        var img = item.container.children[1]
        item.w = img.naturalWidth
        item.h = img.naturalHeight
        window.pswpGallery.invalidateCurrItems()
        window.pswpGallery.updateSize(true)
      })

      window.pswpGallery.init()
    },
    deleteContent (contentId) {
      let deleteAction = () => {
        this.deleteContentId = contentId
        this.detail = null
        this.refreshCluster()
      }

      if (window.wrapMode) {
        window.plugins.actionsheet.show({
          subtitle: 'STARMINEから削除されますが、コンテンツ取得先から削除されることはありません。',
          addDestructiveButtonWithLabel: 'STARMINEから削除',
          addCancelButtonWithLabel: 'キャンセル'
        }, (label) => {
          console.log(label)
          if (label === 1) {
            deleteAction()
          }
        })
      } else {
        if (window.confirm('コンテンツを削除しますか?')) {
          deleteAction()
        }
      }
    },
    // refreshCluster
    // クラスタの再読み込み
    refreshCluster () {
      this.load()
    },
    // backCluster
    // 上位レイヤに戻る
    backCluster () {
      if (this.detail) {
        this.detail = null
        return
      }

      if (this.layer === 0) return
      this.$router.back()
    },
    // logout
    // ログアウト処理を行う
    logout () {
      if (window.debugMode && window.confirm('デバッグコマンド: ログアウトを行いますか?')) {
        this.auth.logout(() => {
          this.$router.push({name: 'welcome'})
        })
      }
    }
  },
  watch: {
    // watch $route
    // パラメータ変動時に再読み込みする
    $route () {
      this.load()
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  font-size: 4.3vw;
}
.button-effect:active {
  opacity: 0.5;
}
.toolbar {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  font-size: 30px;
  background: rgba(24,77,163, 0.6);
  padding-top: 20px;
  height: 60px;
}
.toolbar .title {
  font-size: 6.5vw;
}
.toolbar .refresh-icon {
  width: 7vw;
}
.toolbar .refresh-blank {
  width: 7vw;
}

.cluster {
  position: fixed;
  height: inherit;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.cluster-inner {
  // position: relative;
  width: 1500px;
  height: 1500px;
}
.cluster-inner .cluster-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.hex {
  // border: 1px solid pink;
  cursor: pointer;
  text-align: center;
  position: absolute;
  display: block;
  background-size: 100%;
  filter: drop-shadow(1px 1px 0 white);
  overflow: hidden;
}
.hex img {
  // display: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
.hex svg {
  transform: scale(0.874);
  transform-origin: top left;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
}

.pswp {
  height: 100vh;
}

.content-detail {
  background: white;
  // background: url(../assets/page-detail.png);
  background-size: 100%;
  background-position-y: 60px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  padding-top: 60px;
  overflow: scroll;

  .content-detail-inner {
    padding: 8vh 7vw 5vh;
  }

  .image {
    display: block;
    margin: 0 auto;
    height: 36vh;
    width: 100%;
    object-fit: contain;
    margin-bottom: 1.5vh;
  }
  .title {
    padding-left: 2vw;
    line-height: 1.3;
  }
  .created-time {
    padding-left: 2vw;
    line-height: 1.3;
    margin-bottom: 1.7vh;
  }
  .note {
    padding-left: 2vw;
    line-height: 1.3;
    margin-bottom: 5vh;
  }
  .open-detail {
    color: white;
    background: #DE7682;
    padding: 1.5vh 0;
    width: 80%;
    text-align: center;
    font-size: 4.5vw;
    line-height: 1;
    margin: 0 auto;
    margin-bottom: 3vh;
  }
  .delete {
    color: white;
    background: #CCCCCC;
    padding: 1.5vh 0;
    width: 80%;
    text-align: center;
    font-size: 4.5vw;
    line-height: 1;
    margin: 0 auto;
  }
}
</style>
