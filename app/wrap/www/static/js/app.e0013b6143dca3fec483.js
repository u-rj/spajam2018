webpackJsonp([1],{"+nwc":function(t,e){},J93j:function(t,e){},KSNH:function(t,e){},KnE8:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("7+uW"),a=n("mjDs"),s=n.n(a),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var r=n("VU/8")({name:"app",data:function(){return{transitionName:null}},watch:{$route:function(t,e){}}},i,!1,function(t){n("gz8q")},null,null).exports,c=n("Zrlr"),u=n.n(c),d=n("wxAW"),l=n.n(d),p=n("mvHQ"),f=n.n(p),w=n("//Fk"),m=n.n(w),h=n("mtWM"),j=n.n(h),v=n("Y4FN"),g=n.n(v),k={install:function(t){t.prototype.storage=window.storage=g.a,t.prototype.$mock=window.$http=function(t,e){return new m.a(function(n,o){console.log("Request",e),"/api/user/create"===t&&n({type:"success",user_id:4582956710410583}),o(new Error("something bad happened"))})},t.prototype.$http=window.$http=j.a.create({validateStatus:function(t){return!(t>=500)||(window.dialog.alert("[エラーコード:"+t+"] 通信エラーが発生しました"),!1)},transformRequest:[function(t,e){return window.log("Service Log: $http Request",{data:t,headers:e}),e.options={},e.options["Content-Type"]="application/json",e.post["Content-Type"]="application/json",e.put["Content-Type"]="application/json",e.patch["Content-Type"]="application/json",f()(t)}],transformResponse:[function(t,e){return t=JSON.parse(t),window.log("Service Log: $http Response",{data:t,headers:e}),t}],withCredentials:!0}),t.prototype.$http.defaults.withCredentials=!0;var e=function(){function t(){u()(this,t)}return l()(t,[{key:"getHexSize",value:function(t){var e=t/2/Math.cos(Math.PI/180*30),n=t/2*Math.tan(Math.PI/180*30);return{w:t,h:2*n+e,ts:e,th:n}}},{key:"getPosition",value:function(t){for(var e={r:[t.w,0],rb:[t.w/2,t.h-t.th],lb:[-t.w/2,t.h-t.th],l:[-t.w,0],lt:[-t.w/2,-t.h+t.th],rt:[t.w/2,-t.h+t.th]},n=["r","rb","lb","l","lt","rt"],o=[[0,0,0]],a=function(t){o.push([o[o.length-1][0]+e.rt[0],o[o.length-1][1]+e.rt[1]]),n.forEach(function(n,a){if(0!==t||"r"!==n)for(var s=0;s<t+1;s++)0===s&&"r"===n||o.push([o[o.length-1][0]+e[n][0],o[o.length-1][1]+e[n][1]])})},s=0;s<50;s++)a(s);return o}}]),t}();t.prototype.cluster=window.cluster=new e;var n=function(){function t(){u()(this,t)}return l()(t,[{key:"facebook",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){},e="http://ryoju.jpn.ph/active/starmine/facebook-access-token.html",n=Math.random().toString(36).slice(-8),o="https://www.facebook.com/dialog/oauth?client_id="+window.facebookAppId+"&redirect_uri="+encodeURIComponent(e)+"&response_type=token&state="+n+"&scope=public_profile,user_posts";if(window.wrapMode){var a=window.open(o,"_blank","location=no,toolbar=no,clearcache=yes");setTimeout(function(){a.addEventListener("loadstart",function(o){var s=o.url;if(-1!==s.indexOf(e+"?#state="+n)){var i=function(t){t=t.replace(/\+/g," ");for(var e={},n=/[?&]?([^=]+)=([^&]*)/g,o=null;o=n.exec(t);)e[decodeURIComponent(o[1])]=decodeURIComponent(o[2]);return e}(s);if(!i.access_token)return window.dialog.alert("アクセストークンがありません"),void a.close();a.close(),t(i.access_token)}})},1e3)}else{var s=window.prompt("ブラウザモードではクロスオリジンのため、アクセストークンの取得ができません。アクセストークンを入力してください: "+o);if(console.log(o),!s)return void window.dialog.alert("アクセストークンが正しくありません。再度実行してください");t(s)}}}]),t}();t.prototype.oAuth=window.oAuth=new n;var o=function(){function t(){u()(this,t)}return l()(t,[{key:"alert",value:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};window.wrapMode?navigator.notification.alert(t,e,"","OK"):(alert(t),e())})},{key:"errorAlert",value:function(t){this.alert(t,function(){window.auth.logout(function(){location.href="/"})})}}]),t}();t.prototype.dialog=window.dialog=new o;var a=function(){function t(){u()(this,t)}return l()(t,[{key:"login",value:function(t,e){var n=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};window.$http.post("/user/login",{email:t,password:e}).then(function(t){var e=t.data.status,a=t.data.result;"0000"===e.code?(n.setLoginData(a.code),n.getToken(function(){o(!0)})):"1C04"===e.code?o(!1):(window.dialog.alert("[エラーコード:"+e.code+"] "+t.data.comment),o(!1))})}},{key:"createUser",value:function(t,e){var n=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};window.$http.post("/user/id",{email:t,password:e}).then(function(t){var e=t.data.status,a=t.data.result;"0000"===e.code?(n.setLoginData(a.code),n.getToken(function(){o(!0)})):"1C07"===e.code?o(!1):(window.dialog.alert("[エラーコード:"+e.code+"] "+t.data.comment),o(!1))})}},{key:"facebookLogin",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};window.oAuth.facebook(function(n){window.$http.post("/sns/facebook/login",{access_token:n}).then(function(n){var o=n.data.status,a=n.data.result;"0000"===o.code?(t.setLoginData(a.code),t.getToken(function(){e(!0)})):(window.dialog.alert("[エラーコード:"+o.code+"] "+n.data.comment),e(!1))})})}},{key:"facebookCreateUser",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};window.oAuth.facebook(function(n){window.$http.post("/sns/facebook/id",{access_token:n}).then(function(n){var o=n.data.status,a=n.data.result;"0000"===o.code?(t.setLoginData(a.code),t.getToken(function(){e(!0)})):(window.dialog.alert("[エラーコード:"+o.code+"] "+n.data.comment),e(!1))})})}},{key:"getToken",value:function(t){var e=window.storage.get("code");window.$http.get("/token?code="+e).then(function(e){"0000"===e.data.status.code?t(!0):t(!1)})}},{key:"setLoginData",value:function(t){if(window.wrapMode){var e=window.plugins.appPreferences.suite("group.jp.starmine.starmine");e.store(function(){window.log("prefs.store code success")},function(){window.log("prefs.store code failure")},"code",t),e.store(function(){window.log("prefs.store api_url success")},function(){window.log("prefs.store api_url failure")},"api_mode",window.apiMode),console.log("prefs end")}window.storage.set("code",t),window.storage.set("api_mode",window.apiMode)}},{key:"logout",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};window.storage.remove("code"),window.storage.remove("facebookAccessToken"),t()}}]),t}();t.prototype.auth=window.auth=new a}},y=n("/ocq"),b={data:function(){return{data:{user_name:"",email:"",password:""}}},mounted:function(){this.initializeWrap()},methods:{initializeWrap:function(){window.wrapMode&&setTimeout(function(){window.navigator&&window.navigator.splashscreen&&window.navigator.splashscreen.hide()},1e3)},createUser:function(){var t=this;this.$mock("/api/user/create",this.data).then(function(e){console.log(e),t.storage.set("user_id",e.user_id),t.$router.push({name:"main"})}).catch(function(t){console.log(t)})}}},z={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v("\n  SignUp\n  "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.data.user_name,expression:"data.user_name"}],attrs:{type:"text"},domProps:{value:t.data.user_name},on:{input:function(e){e.target.composing||t.$set(t.data,"user_name",e.target.value)}}}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.data.email,expression:"data.email"}],attrs:{type:"email"},domProps:{value:t.data.email},on:{input:function(e){e.target.composing||t.$set(t.data,"email",e.target.value)}}}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.data.password,expression:"data.password"}],attrs:{type:"password"},domProps:{value:t.data.password},on:{input:function(e){e.target.composing||t.$set(t.data,"password",e.target.value)}}}),t._v(" "),n("button",{attrs:{disabled:!t.data.user_name||!t.data.email||!t.data.password},on:{click:t.createUser}},[t._v("ユーザ作成")])])},staticRenderFns:[]};var _=n("VU/8")(b,z,!1,function(t){n("J93j")},"data-v-8bdb8682",null).exports,x={data:function(){return{position:"",count:0}},mounted:function(){this.initializeWrap(),alert("ready0");var t=window.BackgroundGeolocation;t.on("location",function(e,n){console.log(e),t.finish(n)},function(){alert("geolocation error")}),t.ready({desiredAccuracy:0,distanceFilter:10,stationaryRadius:50,locationUpdateInterval:1e3,fastestLocationUpdateInterval:5e3,activityType:"AutomotiveNavigation",activityRecognitionInterval:5e3,stopTimeout:5,debug:!0,stopOnTerminate:!1,startOnBoot:!0},function(e){alert("ready"),console.log("BackgroundGeolocation ready: ",e),e.enabled||t.start()})},methods:{initializeWrap:function(){window.wrapMode&&setTimeout(function(){window.navigator&&window.navigator.splashscreen&&window.navigator.splashscreen.hide()},1e3)},getGeo:function(){var t=this;navigator.geolocation.getCurrentPosition(function(e){console.log(e),t.position="lat:"+e.coords.latitude+" long"+e.coords.longitude,t.count++},function(){t.position="error!!"})}}},R={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v("\n  "+t._s(t.position)+"\n  "+t._s(t.count)+"\n  "),n("button",{on:{click:function(e){t.getGeo()}}},[t._v("getGeo")])])},staticRenderFns:[]};var U=n("VU/8")(x,R,!1,function(t){n("jxaF")},"data-v-13dbdfa0",null).exports,F={data:function(){return{}},mounted:function(){},methods:{tap1:function(){var t=this;setTimeout(function(){t.$router.push({name:"welcome"})},10)}}},P={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("img",{attrs:{src:n("PYQ2")}}),this._v(" "),e("div",{staticClass:"tap tap1",on:{click:this.tap1}})])},staticRenderFns:[]};var E=n("VU/8")(F,P,!1,function(t){n("XrUB")},"data-v-578509fa",null).exports;o.a.use(y.a);var T=new y.a({routes:[{path:"/",name:"root",component:_,beforeEnter:function(t,e,n){n({name:"main"})}},{path:"/welcome",name:"welcome",component:_},{path:"/main",name:"main",component:U},{path:"/mock",name:"mock",component:E}]});T.beforeEach(function(t,e,n){console.log("router before",t.name,e.name),"welcome"!==t.name?"welcome"===t.name||window.storage.get("user_id")?n():n({name:"welcome"}):n()});var q=T,N=n("i/ub");n("L4dm"),n("hAPP"),n("trlb"),n("KnE8");o.a.config.productionTip=!1,o.a.use(k),o.a.use(s.a),o.a.use(N.default,{components:N,directives:N}),window.$http.defaults.baseURL="https://jymes7a0pa.execute-api.ap-northeast-1.amazonaws.com/api/",console.log("start"),new o.a({el:"#app",router:q,template:"<App/>",components:{App:r}}),window.handleOpenURL=function(t){setTimeout(function(){},0)}},PYQ2:function(t,e,n){t.exports=n.p+"static/img/mock.e171462.png"},R58i:function(t,e){},XrUB:function(t,e){},gz8q:function(t,e){},jxaF:function(t,e){},uslO:function(t,e,n){var o={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function a(t){return n(s(t))}function s(t){var e=o[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}a.keys=function(){return Object.keys(o)},a.resolve=s,t.exports=a,a.id="uslO"}},["NHnr"]);
//# sourceMappingURL=app.e0013b6143dca3fec483.js.map