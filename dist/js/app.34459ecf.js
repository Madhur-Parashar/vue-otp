(function(t){function e(e){for(var r,s,u=e[0],a=e[1],c=e[2],l=0,f=[];l<u.length;l++)s=u[l],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&f.push(i[s][0]),i[s]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r]);p&&p(e);while(f.length)f.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,u=1;u<n.length;u++){var a=n[u];0!==i[a]&&(r=!1)}r&&(o.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},i={app:0},o=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],a=u.push.bind(u);u.push=e,u=u.slice();for(var c=0;c<u.length;c++)e(u[c]);var p=a;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("85ec"),i=n.n(r);i.a},"3f35":function(t,e,n){"use strict";var r=n("9bdf"),i=n.n(r);i.a},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("OTP",{attrs:{inputKeys:4}},[t._v("Please enter the verification code send to madhur@xyz.com")])],1)},o=[],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"otp-screen"},[n("div",{staticClass:"otp-screen__text"},[t._v(" Verification Code ")]),n("div",{staticClass:"otp-screen__sub--text"},[t._t("default")],2),n("div",{staticClass:"otp-screen__inputs-row"},[t._l(t.inputKeys,(function(e,r){return[n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.otp["inputkey"+r],expression:"otp[`inputkey${index}`]",modifiers:{number:!0}}],key:e,ref:"inputkey"+r,refInFor:!0,staticClass:"otp-screen__input",attrs:{type:"number",onkeypress:"return event.charCode >= 48 && event.charCode <= 57"},domProps:{value:t.otp["inputkey"+r]},on:{paste:function(t){t.preventDefault()},keyup:[function(e){return t.userInput(r,e)},function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;!t.isDisable&&t.submitOTPHandler()}],input:function(e){e.target.composing||t.$set(t.otp,"inputkey"+r,t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]}))],2),n("div",{staticClass:"otp-screen__resend-btn"},[n("a",{attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.resendHandler(e)}}},[t._v("Resend")])]),n("div",{staticClass:"otp-screen__btn"},[n("button",{staticClass:"otp-screen__submit-btn",attrs:{disabled:t.isDisable},on:{click:t.submitOTPHandler}},[t._v("SUBMIT")])])])},u=[],a=(n("a15b"),n("a9e3"),n("d3b7"),n("ac1f"),n("25f0"),n("466d"),n("1276"),n("96cf"),n("1da1")),c={data:function(){return{otp:{}}},mounted:function(){console.log(this.inputKeys),this.resetOTP()},props:{inputKeys:{type:Number,required:!0}},computed:{isDisable:function(){for(var t in this.otp)if(""===this.otp[t]||isNaN(this.otp[t]))return!0;return!1}},methods:{userInput:function(t,e){console.log(this.otp["inputkey".concat(t)]),"Backspace"!==e.key&&"ArrowLeft"!==e.key&&"Left"!==e.key?this.isValidInput(t,e)&&(this.otp["inputkey".concat(t)].toString().split("").length>1?this.shiftOtherDigitToForward(t):this.setFocus(t+1)):this.setFocus(t-1)},isValidInput:function(t,e){var n=/^[0-9]+$/;return!!e.key.match(n)},shiftOtherDigitToForward:function(t){for(var e=this.otp["inputkey".concat(t)].toString().split(""),n=0,i=t;i<this.inputKeys;i++)r["a"].set(this.otp,"inputkey".concat(i),Number(e[n])),n++;t+e.length>this.inputKeys?this.setFocus(this.inputKeys-1):this.setFocus(t+e.length-1)},setFocus:function(t){t>=0&&t<this.inputKeys&&this.$nextTick(this.$refs["inputkey"+t][0].focus())},submitOTPHandler:function(){var t,e=[];for(var n in this.otp)e.push(this.otp[n]);console.log(Number(e.join(""))),t=Number(e.join("")),this.validateOtpFromBackend().then((function(e){e===t?window.open("https://github.com/Madhur-Parashar/vue-otp"):console.log("Err")}))},resendHandler:function(){this.resetOTP()},resetOTP:function(){for(var t=0;t<this.inputKeys;t++)r["a"].set(this.otp,"inputkey".concat(t),"");this.setFocus(0)},validateOtpFromBackend:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(n=[],r=1;r<=t.inputKeys;r++)n.push(r);return console.log(Number(n.join(""))),e.abrupt("return",Promise.resolve(Number(n.join(""))));case 4:case"end":return e.stop()}}),e)})))()}}},p=c,l=(n("3f35"),n("2877")),f=Object(l["a"])(p,s,u,!1,null,"2012578c",null),d=f.exports,h={name:"app",data:function(){return{msg:"Welcome to Your Vue.js App"}},components:{OTP:d}},v=h,y=(n("034f"),Object(l["a"])(v,i,o,!1,null,null,null)),b=y.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(t){return t(b)}}).$mount("#app")},"85ec":function(t,e,n){},"9bdf":function(t,e,n){}});
//# sourceMappingURL=app.34459ecf.js.map