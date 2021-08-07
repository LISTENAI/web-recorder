(function(e){function t(t){for(var n,s,c=t[0],o=t[1],u=t[2],h=0,d=[];h<c.length;h++)s=c[h],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&d.push(r[s][0]),r[s]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n]);l&&l(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],n=!0,c=1;c<a.length;c++){var o=a[c];0!==r[o]&&(n=!1)}n&&(i.splice(t--,1),e=s(s.s=a[0]))}return e}var n={},r={app:0},i=[];function s(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=n,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(a,n,function(t){return e[t]}.bind(null,n));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/web-recorder/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],o=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var l=o;i.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("cd49")},"034f":function(e,t,a){"use strict";a("85ec")},7881:function(e,t,a){"use strict";(function(e,n){a.d(t,"a",(function(){return O}));var r=a("b85c"),i=a("1da1"),s=a("d4ec"),c=a("bee2"),o=a("257e"),u=a("262e"),l=a("2caf"),h=a("ade3"),d=(a("96cf"),a("99af"),a("fb6a"),a("faa1")),f=a.n(d),p=navigator.usb,b=18008,v=12611,y=3,m=10,O=function(t){Object(u["a"])(r,t);var a=Object(l["a"])(r);function r(){var t;Object(s["a"])(this,r);for(var n=arguments.length,i=new Array(n),c=0;c<n;c++)i[c]=arguments[c];return t=a.call.apply(a,[this].concat(i)),Object(h["a"])(Object(o["a"])(t),"device",null),Object(h["a"])(Object(o["a"])(t),"samplesPerMs",16),Object(h["a"])(Object(o["a"])(t),"bytesPerSample",4),Object(h["a"])(Object(o["a"])(t),"channels",6),Object(h["a"])(Object(o["a"])(t),"buffer",e.alloc(0)),t}return Object(c["a"])(r,[{key:"opened",get:function(){return!!this.device}},{key:"open",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t,a,r){var i,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.requestDevice({filters:[{vendorId:b,productId:v}]});case 3:return this.device=e.sent,e.next=6,this.device.open();case 6:if(i=j(this.device,255,1,255),i){e.next=10;break}return this.device=null,e.abrupt("return");case 10:return e.next=12,this.device.selectConfiguration(i.conf.configurationValue);case 12:return e.next=14,this.device.claimInterface(i.intf.interfaceNumber);case 14:return e.next=16,this.device.selectAlternateInterface(i.intf.interfaceNumber,i.alt.alternateSetting);case 16:this.samplesPerMs=t/1e3,this.bytesPerSample=a/8,this.channels=r,s=this.samplesPerMs*this.bytesPerSample*this.channels*m,n.nextTick(this.read.bind(this,s)),e.next=26;break;case 23:e.prev=23,e.t0=e["catch"](0),this.device=null;case 26:return e.prev=26,this.emit("stateChanged",this.opened),e.finish(26);case 29:case"end":return e.stop()}}),e,this,[[0,23,26,29]])})));function t(t,a,n){return e.apply(this,arguments)}return t}()},{key:"close",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.device&&(this.device.close(),this.device=null),n.nextTick((function(){t.emit("stateChanged",t.opened)}));case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"read",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a){var n,r,i,s,c,o,u,l,h,d,f;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!this.device||!this.device.opened){t.next=22;break}return t.next=3,this.device.transferIn(y,a);case 3:if(n=t.sent,r=n.data,i=e.from(r.buffer),s=[],c=this.bytesPerSample*this.channels,o=g(this.buffer,i,this.bytesPerSample,this.channels),-1!=o){t.next=12;break}return console.error("Cannot find first channel"),t.abrupt("continue",0);case 12:for(u=e.concat([this.buffer,i.slice(0,o)]),u.length==c&&s.push(u),l=Math.floor((i.length-o)/c)*c,s.push(i.slice(o,o+l)),this.buffer=i.slice(o+l),h=e.concat(s),d=0;d<h.length;d+=this.bytesPerSample){for(f=0;f<this.bytesPerSample-1;f++)h[d+f]=h[d+f+1];h[d+this.bytesPerSample]=0}this.emit("samples",h),t.next=0;break;case 22:case"end":return t.stop()}}),t,this)})));function a(e){return t.apply(this,arguments)}return a}()}]),r}(f.a);function j(e,t,a,n){var i,s=Object(r["a"])(e.configurations||[]);try{for(s.s();!(i=s.n()).done;){var c,o=i.value,u=Object(r["a"])(o.interfaces);try{for(u.s();!(c=u.n()).done;){var l,h=c.value,d=Object(r["a"])(h.alternates);try{for(d.s();!(l=d.n()).done;){var f=l.value;if(t==f.interfaceClass&&a==f.interfaceSubclass&&n==f.interfaceProtocol)return{conf:o,intf:h,alt:f}}}catch(p){d.e(p)}finally{d.f()}}}catch(p){u.e(p)}finally{u.f()}}}catch(p){s.e(p)}finally{s.f()}return null}function g(e,t,a,n){var r=a*n;if(1==t[0])return 0;if(1==t[r-e.length])return r-e.length;for(var i=0;i<r;i+=a)if(1==t[i])return i;return-1}}).call(this,a("b639").Buffer,a("4362"))},"85ec":function(e,t,a){},cd49:function(e,t,a){"use strict";a.r(t);a("cf0b");var n=a("8f58"),r=a.n(n),i=(a("12eb"),a("257f")),s=a.n(i),c=(a("2990"),a("b025")),o=a.n(c),u=(a("0c4c"),a("fed8")),l=a.n(u),h=(a("95d1"),a("c4c6")),d=a.n(h),f=(a("e260"),a("e6cf"),a("cca6"),a("a79d"),a("2b0e")),p=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{style:{padding:"16px"}},[a("a-row",{attrs:{type:"flex",gutter:16}},[a("a-col",[e.opened?a("a-button",{attrs:{icon:"disconnect",loading:e.busy},on:{click:e.close}},[e._v(" 关闭设备 ")]):a("a-button",{attrs:{icon:"usb",loading:e.busy,type:"primary"},on:{click:e.open}},[e._v(" 打开设备 ")])],1),a("a-col",{staticClass:"hidden-feature"},[e.recording?a("a-button",{attrs:{type:"danger"},on:{click:e.stopRecord}},[e._v("停止")]):a("a-button",{attrs:{disabled:!e.opened},on:{click:e.startRecord}},[e._v(" 录制 ")])],1),a("a-col",[a("a-select",{style:{width:"100px"},attrs:{disabled:e.opened},model:{value:e.sampleRate,callback:function(t){e.sampleRate=t},expression:"sampleRate"}},[a("a-select-option",{attrs:{value:16e3}},[e._v("16 kHz")])],1)],1),a("a-col",[a("a-select",{style:{width:"100px"},attrs:{disabled:e.opened},model:{value:e.bitDepth,callback:function(t){e.bitDepth=t},expression:"bitDepth"}},[a("a-select-option",{attrs:{value:32}},[e._v("32 bit")])],1)],1),a("a-col",[a("a-select",{style:{width:"100px"},attrs:{disabled:e.opened},model:{value:e.channels,callback:function(t){e.channels=t},expression:"channels"}},[a("a-select-option",{attrs:{value:1}},[e._v("1 ch")]),a("a-select-option",{attrs:{value:2}},[e._v("2 ch")]),a("a-select-option",{attrs:{value:3}},[e._v("3 ch")]),a("a-select-option",{attrs:{value:4}},[e._v("4 ch")]),a("a-select-option",{attrs:{value:5}},[e._v("5 ch")]),a("a-select-option",{attrs:{value:6}},[e._v("6 ch")])],1)],1)],1),a("div",{style:{width:"300px",marginTop:"32px"}},e._l(e.tracks,(function(t,n){return a("a-row",{key:n,style:{marginTop:"8px"},attrs:{type:"flex",gutter:16}},[a("a-col",[a("a-button",{attrs:{size:"small",icon:"sound",shape:"circle",type:t.muted?"default":"primary"},on:{click:function(){return e.toggleTrackMuted(n)}}})],1),a("a-col",{attrs:{flex:"auto"}},[a("a-progress",{attrs:{size:"small",status:"normal","show-info":!1,percent:e.peaks[n],"stroke-color":t.muted?"lightgrey":void 0}})],1)],1)})),1)],1)},b=[],v=a("5530"),y=a("1da1"),m=a("d4ec"),O=a("bee2"),j=a("257e"),g=a("262e"),k=a("2caf"),w=a("ade3"),x=(a("96cf"),a("9ab4")),C=a("1b40"),R=a("9d32"),P=a("7881"),S=(a("d3b7"),a("8b09"),a("9a8c"),a("a975"),a("735e"),a("c1ac"),a("d139"),a("3a7b"),a("d5d6"),a("82f8"),a("e91f"),a("60bd"),a("5f96"),a("3280"),a("3fcc"),a("ca91"),a("25a1"),a("cd26"),a("3c5d"),a("2954"),a("649e"),a("219c"),a("170b"),a("b39a"),a("72f7"),a("143c"),a("cfc3"),function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:16e3,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:32,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:6;Object(m["a"])(this,e),Object(w["a"])(this,"sampleRate",void 0),Object(w["a"])(this,"bitDepth",void 0),Object(w["a"])(this,"channels",void 0),Object(w["a"])(this,"base",void 0),Object(w["a"])(this,"inputType",void 0),Object(w["a"])(this,"audioCtx",void 0),Object(w["a"])(this,"gainNode",void 0),Object(w["a"])(this,"muted",[]),Object(w["a"])(this,"startTime",void 0),this.sampleRate=t,this.bitDepth=a,this.channels=n,this.base={16:32768,32:2147483648}[a],this.inputType={16:Int16Array,32:Int32Array}[a],this.audioCtx=new AudioContext,this.gainNode=this.audioCtx.createGain(),this.gainNode.gain.value=10,this.gainNode.connect(this.audioCtx.destination),this.startTime=this.audioCtx.currentTime}return Object(O["a"])(e,[{key:"feed",value:function(e){for(var t=this.bitDepth/8,a=e.length/t,n=new this.inputType(e.buffer),r=new Float32Array(a),i=0;i<a;i++)r[i]=n[i]/this.base;for(var s=r.length/this.channels,c=this.audioCtx.createBufferSource(),o=this.audioCtx.createBuffer(1,s,this.sampleRate),u=o.getChannelData(0),l=0;l<s;l++){u[l]=0;for(var h=0;h<this.channels;h++)this.muted[h]||(u[l]+=r[l*this.channels+h]/this.channels)}this.startTime<this.audioCtx.currentTime&&(this.startTime=this.audioCtx.currentTime),c.buffer=o,c.connect(this.gainNode),c.start(this.startTime),this.startTime+=o.duration}},{key:"destroy",value:function(){this.audioCtx.close()}},{key:"setMute",value:function(e,t){this.muted[e]=t}}]),e}()),_=a("3717"),T=a.n(_);T.a.mitm="https://listenai.github.io/web-recorder/mitm.html";var D=function(){function e(t,a,n){Object(m["a"])(this,e),Object(w["a"])(this,"sampleRate",void 0),Object(w["a"])(this,"bitDepth",void 0),Object(w["a"])(this,"channels",void 0),Object(w["a"])(this,"writer",null),this.sampleRate=t,this.bitDepth=a,this.channels=n}return Object(O["a"])(e,[{key:"request",value:function(){var e=Object(_["createWriteStream"])("out.pcm");this.writer=e.getWriter()}},{key:"feed",value:function(e){var t;null===(t=this.writer)||void 0===t||t.write(e.buffer)}},{key:"finish",value:function(){var e;null===(e=this.writer)||void 0===e||e.close()}}]),e}(),M=100,I=function(e){Object(g["a"])(a,e);var t=Object(k["a"])(a);function a(){var e;return Object(m["a"])(this,a),e=t.call(this),Object(w["a"])(Object(j["a"])(e),"opened",!1),Object(w["a"])(Object(j["a"])(e),"busy",!1),Object(w["a"])(Object(j["a"])(e),"recording",!1),Object(w["a"])(Object(j["a"])(e),"recorder",new P["a"]),Object(w["a"])(Object(j["a"])(e),"sampleRate",16e3),Object(w["a"])(Object(j["a"])(e),"bitDepth",32),Object(w["a"])(Object(j["a"])(e),"channels",6),Object(w["a"])(Object(j["a"])(e),"tracks",[]),Object(w["a"])(Object(j["a"])(e),"peaks",[]),Object(w["a"])(Object(j["a"])(e),"player",null),Object(w["a"])(Object(j["a"])(e),"writer",null),e.updatePeaks=Object(R["a"])(M,e.updatePeaks.bind(Object(j["a"])(e))),e}return Object(O["a"])(a,[{key:"mounted",value:function(){this.recorder.on("stateChanged",this.handleStateChange),this.recorder.on("samples",this.handleSamples),this.onChannelsChanged(this.channels)}},{key:"beforeDestroy",value:function(){this.recorder.off("stateChanged",this.handleStateChange),this.recorder.off("samples",this.handleSamples)}},{key:"handleStateChange",value:function(){this.opened=this.recorder.opened,this.busy=!1}},{key:"onChannelsChanged",value:function(e){for(var t=[],a=0;a<e;a++)t[a]=this.tracks[a]||{muted:!1};this.tracks=t}},{key:"open",value:function(){var e=Object(y["a"])(regeneratorRuntime.mark((function e(){var t,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(this.busy=!0,this.player=new S(this.sampleRate,this.bitDepth,this.channels),t=0;t<this.channels;t++)this.player.setMute(t,null===(a=this.tracks[t])||void 0===a?void 0:a.muted);return e.next=5,this.recorder.open(this.sampleRate,this.bitDepth,this.channels);case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"close",value:function(){var e=Object(y["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.busy=!0,this.player&&(this.player.destroy(),this.player=null),e.next=4,this.recorder.close();case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"startRecord",value:function(){var e=Object(y["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.writer=new D(this.sampleRate,this.bitDepth,this.channels),e.next=3,this.writer.request();case 3:this.recording=!0;case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"stopRecord",value:function(){var e;this.recording=!1,null===(e=this.writer)||void 0===e||e.finish()}},{key:"toggleTrackMuted",value:function(e){this.tracks=Object(v["a"])(Object(v["a"])({},this.tracks),{},Object(w["a"])({},e,Object(v["a"])(Object(v["a"])({},this.tracks[e]),{},{muted:!this.tracks[e].muted}))),this.player&&this.player.setMute(e,this.tracks[e].muted)}},{key:"handleSamples",value:function(e){this.player&&this.player.feed(e),this.writer&&this.writer.feed(e),this.updatePeaks(e)}},{key:"updatePeaks",value:function(e){for(var t=this.bitDepth/8,a=[],n=0;n<this.channels;n++){var r=e.readInt32LE(n*t)/4294967295;a[n]=100*Math.abs(r)*20}this.peaks=a}}]),a}(C["b"]);Object(x["a"])([Object(C["c"])("channels")],I.prototype,"onChannelsChanged",null),I=Object(x["a"])([C["a"]],I);var N=I,A=N,q=(a("034f"),a("2877")),z=Object(q["a"])(A,p,b,!1,null,null,null),B=z.exports;f["default"].use(d.a),f["default"].use(l.a),f["default"].use(o.a),f["default"].use(s.a),f["default"].use(r.a),new f["default"]({render:function(e){return e(B)}}).$mount("#app")}});
//# sourceMappingURL=app.e007567d.js.map