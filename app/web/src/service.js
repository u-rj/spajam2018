import Axios from 'axios'
import Store from 'store'

export default {
  install: (Vue) => {
    // Common
    // Object.prototype.forEach = function(f){var s=this;Object.keys(s).forEach(function(v){f(s[v],v)})}
    /* eslint-disable no-extend-native */
    /*
    Object.prototype.forEach = (f) => {
      Object.keys(this).forEach((v) => {
        f(this[v], v)
      })
    }
    */

    window.log = (...arg) => {
      console.log(...arg)
      window.displayLog.set(...arg)
    }

    window.displayLogElement = document.createElement('div')
    // window.displayLogElement.style = 'background:black; opacity:0; position:fixed; left: 0; bottom:0; width:100%; height:10px; overflow:scroll; padding: 10px'

    window.displayLogInputElement = document.createElement('input')
    // window.displayLogInputElement.style = 'display:block; width:100%; background: black; color:white'
    window.displayLogInputElement.addEventListener('keypress', (event) => {
      if (event.keyCode !== 13) {
        return false
      }
      /* eslint-disable no-eval */
      window.log(eval(window.displayLogInputElement.value))
      window.displayLogInputElement.value = ''
    }, false)
    window.displayLogElement.appendChild(window.displayLogInputElement)

    window.displayLogMessageElement = document.createElement('div')
    // window.displayLogMessageElement.style = 'color:white; font-size:11px;'
    window.displayLogMessageElement.addEventListener('click', () => {
      window.displayLog.close()
    }, false)
    window.displayLogElement.addEventListener('click', () => {
      window.displayLog.open()
    }, false)
    window.displayLogElement.appendChild(window.displayLogMessageElement)

    window.displayLogButtonElement = document.createElement('button')
    window.displayLogButtonElement.innerHTML = 'Clear'
    window.displayLogButtonElement.addEventListener('click', () => {
      window.displayLog.clear()
    }, false)
    window.displayLogElement.appendChild(window.displayLogButtonElement)
    // document.body.appendChild(window.displayLogElement)
    window.displayLog = {
      set (...arg) {
        let text = ''
        arg.forEach((value) => {
          if (typeof value === 'function') {
            text += value.toString().replace(/\r?\n/g, '<br>').replace(/\s/g, '&nbsp;') + ' '
            return
          }
          let cache = []
          text += JSON.stringify(value, (key, value) => {
            if (typeof value === 'object' && value !== null) {
              if (cache.indexOf(value) !== -1) {
                return
              }
              cache.push(value)
            }
            return value
          }) + ' '
        })
        window.displayLogMessageElement.insertAdjacentHTML('afterbegin', text + '<br>')
      },
      setError (...arg) {
        let text = ''
        arg.forEach((value) => {
          text += JSON.stringify(value) + ' '
        })
        window.displayLogMessageElement.insertAdjacentHTML('afterbegin', '<span style="color:red">' + text + '</span><br>')
      },
      open () {
        window.displayLogElement.style.opacity = 1
        window.displayLogElement.style.height = '200px'
      },
      close () {
        window.displayLogElement.style.opacity = 0
        window.displayLogElement.style.height = '10px'
      },
      clear () {
        window.displayLogMessageElement.innerHTML = ''
      }
    }

    window.onerror = function (msg, url, linenumber) {
      // alert('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber)
      return false
    }

    // Storage
    Vue.prototype.storage = window.storage = Store

    // Axios
    Vue.prototype.$http = window.$http = Axios.create({
      validateStatus: (status) => {
        if (status >= 500) {
          window.dialog.alert('[エラーコード:' + status + '] 通信エラーが発生しました')
          return false
        }
        return true
      },
      transformRequest: [(data, headers) => {
        window.log('Service Log: $http Request', {data: data, headers: headers})
        headers.options = {}
        headers.options['Content-Type'] = 'application/json'
        headers.post['Content-Type'] = 'application/json'
        headers.put['Content-Type'] = 'application/json'
        headers.patch['Content-Type'] = 'application/json'

        // let formatedData = test
        // data.forEach((value, index) => {
        //  if (value === null) {}
        // })

        return JSON.stringify(data)
      }],
      transformResponse: [(data, headers) => {
        data = JSON.parse(data)

        /*
        if (data.status.type !== 'success') {
          window.dialog.alert('通信エラーが発生しました')
        }
        */

        window.log('Service Log: $http Response', {data: data, headers: headers})
        return data
      }],
      withCredentials: true
    })
    // Vue.prototype.$http.defaults.headers['content-type'] = 'application/json'
    Vue.prototype.$http.defaults.withCredentials = true

    // Cluster
    class Cluster {
      getHexSize (hexW) {
        let hexTS = (hexW / 2) / Math.cos(30 * (Math.PI / 180)) // 三角形の辺の長さ
        let hexTH = (hexW / 2) * Math.tan(30 * (Math.PI / 180)) // 三角形の高さ
        let hexH = hexTH * 2 + hexTS

        return {
          w: hexW,
          h: hexH,
          ts: hexTS,
          th: hexTH
        }
      }

      getPosition (hexSize) {
        let transitDef = {
          r: [hexSize.w, 0],
          rb: [hexSize.w / 2, hexSize.h - hexSize.th],
          lb: [-hexSize.w / 2, hexSize.h - hexSize.th],
          l: [-hexSize.w, 0],
          lt: [-hexSize.w / 2, -hexSize.h + hexSize.th],
          rt: [hexSize.w / 2, -hexSize.h + hexSize.th]
        }

        let hexTransit = [
          'r',
          'rb',
          'lb',
          'l',
          'lt',
          'rt'
        ]

        let hexPosition = [
          [0, 0, 0]
        ]

        for (let i = 0; i < 50; i++) {
          hexPosition.push([
            hexPosition[hexPosition.length - 1][0] + transitDef['rt'][0],
            hexPosition[hexPosition.length - 1][1] + transitDef['rt'][1]
          ])

          hexTransit.forEach((value, index) => {
            if (i === 0 && value === 'r') return
            for (let j = 0; j < i + 1; j++) {
              if (j === 0 && value === 'r') continue
              hexPosition.push([
                hexPosition[hexPosition.length - 1][0] + transitDef[value][0],
                hexPosition[hexPosition.length - 1][1] + transitDef[value][1]
              ])
            }
          })
        }
        return hexPosition
      }
    }
    Vue.prototype.cluster = window.cluster = new Cluster()

    // OAuth
    class OAuth {
      facebook (callback = () => {}) {
        let getQueryParams = (qs) => {
          qs = qs.replace(/\+/g, ' ')
          let params = {}
          let re = /[?&]?([^=]+)=([^&]*)/g
          let tokens = null

          while ((tokens = re.exec(qs))) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2])
          }
          return params
        }

        // let redirectUrl = 'https://front-api-dot-big-unison-174302.appspot.com'
        let redirectUrl = 'http://ryoju.jpn.ph/active/starmine/facebook-access-token.html'
        let state = Math.random().toString(36).slice(-8)
        let url = 'https://www.facebook.com/dialog/oauth?client_id=' + window.facebookAppId + '&redirect_uri=' + encodeURIComponent(redirectUrl) + '&response_type=token' + '&state=' + state + '&scope=public_profile,user_posts'
        if (window.wrapMode) {
          let cb = window.open(url, '_blank', 'location=no,toolbar=no,clearcache=yes')
          setTimeout(() => {
            cb.addEventListener('loadstart', (e) => {
              // cb.insertCSS({code: 'body{padding-top: 20px;}body{padding-top: 20px;}'})
              let url = e.url
              if (url.indexOf(redirectUrl + '?#state=' + state) !== -1) {
                let params = getQueryParams(url)
                if (!params.access_token) {
                  window.dialog.alert('アクセストークンがありません')
                  cb.close()
                  return
                }
                // this.storage.set('facebookAccessToken', params.access_token)
                cb.close()
                callback(params.access_token)
              }
            })
          }, 1000)
        } else {
          let accessToken = window.prompt('ブラウザモードではクロスオリジンのため、アクセストークンの取得ができません。アクセストークンを入力してください: ' + url)
          console.log(url)
          if (!accessToken) {
            window.dialog.alert('アクセストークンが正しくありません。再度実行してください')
            return
          }
          // this.storage.set('facebookAccessToken', accessToken)
          callback(accessToken)
        }
      }
    }
    Vue.prototype.oAuth = window.oAuth = new OAuth()

    // dialog
    class Dialog {
      alert (text, callback = () => {}) {
        if (window.wrapMode) {
          navigator.notification.alert(text, callback, '', 'OK')
        } else {
          alert(text)
          callback()
        }
      }

      errorAlert (text) {
        this.alert(text, () => {
          window.auth.logout(() => {
            location.href = '/'
          })
        })
      }
    }
    Vue.prototype.dialog = window.dialog = new Dialog()

    // auth
    class Auth {
      login (email, password, callback = () => {}) {
        window.$http.post(
          '/user/login',
          {
            email: email,
            password: password
          }
        ).then((response) => {
          let status = response.data.status
          let result = response.data.result
          if (status.code === '0000') {
            this.setLoginData(result.code)
            this.getToken(() => {
              // eslint-disable-next-line
              callback(true)
            })
          } else if (status.code === '1C04') {
            // eslint-disable-next-line
            callback(false)
          } else {
            window.dialog.alert('[エラーコード:' + status.code + '] ' + response.data.comment)
            // eslint-disable-next-line
            callback(false)
          }
        })
      }

      createUser (email, password, callback = () => {}) {
        window.$http.post(
          '/user/id',
          {
            email: email,
            password: password
          }
        ).then((response) => {
          let status = response.data.status
          let result = response.data.result
          if (status.code === '0000') {
            this.setLoginData(result.code)
            this.getToken(() => {
              // eslint-disable-next-line
              callback(true)
            })
          } else if (status.code === '1C07') {
            // eslint-disable-next-line
            callback(false)
          } else {
            window.dialog.alert('[エラーコード:' + status.code + '] ' + response.data.comment)
            // eslint-disable-next-line
            callback(false)
          }
        })
      }

      facebookLogin (callback = () => {}) {
        window.oAuth.facebook((accessToken) => {
          window.$http.post(
            '/sns/facebook/login',
            {
              access_token: accessToken
            }
          ).then((response) => {
            let status = response.data.status
            let result = response.data.result
            if (status.code === '0000') {
              this.setLoginData(result.code)
              this.getToken(() => {
                // eslint-disable-next-line
                callback(true)
              })
            /*
            } else if (status.code === '1C07') {
              // eslint-disable-next-line
              callback(false)
              return
            */
            } else {
              window.dialog.alert('[エラーコード:' + status.code + '] ' + response.data.comment)
              // eslint-disable-next-line
              callback(false)
            }
          })
        })
      }

      facebookCreateUser (callback = () => {}) {
        window.oAuth.facebook((accessToken) => {
          window.$http.post(
            '/sns/facebook/id',
            {
              access_token: accessToken
            }
          ).then((response) => {
            let status = response.data.status
            let result = response.data.result
            if (status.code === '0000') {
              this.setLoginData(result.code)
              this.getToken(() => {
                // eslint-disable-next-line
                callback(true)
              })
            /*
            } else if (status.code === '1C07') {
              // eslint-disable-next-line
              callback(false)
              return
            */
            } else {
              window.dialog.alert('[エラーコード:' + status.code + '] ' + response.data.comment)
              // eslint-disable-next-line
              callback(false)
            }
          })
        })
      }

      getToken (callback) {
        let code = window.storage.get('code')
        window.$http.get(
          '/token?code=' + code
        ).then((response) => {
          let status = response.data.status
          // let result = response.data.result
          if (status.code !== '0000') {
            // eslint-disable-next-line
            callback(false)
            return
          }
          // eslint-disable-next-line
          callback(true)
        })
      }

      setLoginData (code) {
        if (window.wrapMode) {
          let prefs = window.plugins.appPreferences
          let suitePrefs = prefs.suite('group.jp.starmine.starmine')

          suitePrefs.store(() => {
            window.log('prefs.store code success')
          }, () => {
            window.log('prefs.store code failure')
          }, 'code', code)

          suitePrefs.store(() => {
            window.log('prefs.store api_url success')
          }, () => {
            window.log('prefs.store api_url failure')
          }, 'api_mode', window.apiMode)
          console.log('prefs end')
        }
        window.storage.set('code', code)
        window.storage.set('api_mode', window.apiMode)
      }

      logout (callback = () => {}) {
        // window.storage.remove('login_email')
        // window.storage.remove('login_password')
        window.storage.remove('code')
        window.storage.remove('facebookAccessToken')
        callback()
      }
    }
    Vue.prototype.auth = window.auth = new Auth()
  }
}
