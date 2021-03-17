!function(e){function n(n){for(var t,o,i=n[0],c=n[1],a=n[2],d=0,s=[];d<i.length;d++)o=i[d],Object.prototype.hasOwnProperty.call(S,o)&&S[o]&&s.push(S[o][0]),S[o]=0;for(t in c)Object.prototype.hasOwnProperty.call(c,t)&&(e[t]=c[t]);for(C&&C(n);s.length;)s.shift()();return A.push.apply(A,a||[]),r()}function r(){for(var e,n=0;n<A.length;n++){for(var r=A[n],t=!0,o=1;o<r.length;o++){var i=r[o];0!==S[i]&&(t=!1)}t&&(A.splice(n--,1),e=M(M.s=r[0]))}return e}var t=window.webpackHotUpdate;window.webpackHotUpdate=function(e,n){!function(e,n){if(!_[e]||!O[e])return;for(var r in O[e]=!1,n)Object.prototype.hasOwnProperty.call(n,r)&&(y[r]=n[r]);0==--w&&0===m&&P()}(e,n),t&&t(e,n)};var o,i=!0,c="537b8c28ce8fdf0f5538",a={},d=[],s=[];function l(n){var r={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:o!==n,active:!0,accept:function(e,n){if(void 0===e)r._selfAccepted=!0;else if("function"==typeof e)r._selfAccepted=e;else if("object"==typeof e)for(var t=0;t<e.length;t++)r._acceptedDependencies[e[t]]=n||function(){};else r._acceptedDependencies[e]=n||function(){}},decline:function(e){if(void 0===e)r._selfDeclined=!0;else if("object"==typeof e)for(var n=0;n<e.length;n++)r._declinedDependencies[e[n]]=!0;else r._declinedDependencies[e]=!0},dispose:function(e){r._disposeHandlers.push(e)},addDisposeHandler:function(e){r._disposeHandlers.push(e)},removeDisposeHandler:function(e){var n=r._disposeHandlers.indexOf(e);n>=0&&r._disposeHandlers.splice(n,1)},invalidate:function(){switch(this._selfInvalidated=!0,p){case"idle":(y={})[n]=e[n],f("ready");break;case"ready":H(n);break;case"prepare":case"check":case"dispose":case"apply":(b=b||[]).push(n)}},check:E,apply:x,status:function(e){if(!e)return p;u.push(e)},addStatusHandler:function(e){u.push(e)},removeStatusHandler:function(e){var n=u.indexOf(e);n>=0&&u.splice(n,1)},data:a[n]};return o=void 0,r}var u=[],p="idle";function f(e){p=e;for(var n=0;n<u.length;n++)u[n].call(null,e)}var h,y,v,b,w=0,m=0,g={},O={},_={};function j(e){return+e+""===e?+e:e}function E(e){if("idle"!==p)throw new Error("check() is only allowed in idle status");return i=e,f("check"),(n=1e4,n=n||1e4,new Promise((function(e,r){if("undefined"==typeof XMLHttpRequest)return r(new Error("No browser support"));try{var t=new XMLHttpRequest,o=M.p+"hot/hot-update.json";t.open("GET",o,!0),t.timeout=n,t.send(null)}catch(e){return r(e)}t.onreadystatechange=function(){if(4===t.readyState)if(0===t.status)r(new Error("Manifest request to "+o+" timed out."));else if(404===t.status)e();else if(200!==t.status&&304!==t.status)r(new Error("Manifest request to "+o+" failed."));else{try{var n=JSON.parse(t.responseText)}catch(e){return void r(e)}e(n)}}}))).then((function(e){if(!e)return f(I()?"ready":"idle"),null;O={},g={},_=e.c,v=e.h,f("prepare");var n=new Promise((function(e,n){h={resolve:e,reject:n}}));for(var r in y={},S)D(r);return"prepare"===p&&0===m&&0===w&&P(),n}));var n}function D(e){var n;_[e]?(O[e]=!0,w++,(n=document.createElement("script")).charset="utf-8",n.src=M.p+"hot/hot-update.js",document.head.appendChild(n)):g[e]=!0}function P(){f("ready");var e=h;if(h=null,e)if(i)Promise.resolve().then((function(){return x(i)})).then((function(n){e.resolve(n)}),(function(n){e.reject(n)}));else{var n=[];for(var r in y)Object.prototype.hasOwnProperty.call(y,r)&&n.push(j(r));e.resolve(n)}}function x(n){if("ready"!==p)throw new Error("apply() is only allowed in ready status");return function n(r){var t,i,s,l,u;function p(e){for(var n=[e],r={},t=n.map((function(e){return{chain:[e],id:e}}));t.length>0;){var o=t.pop(),i=o.id,c=o.chain;if((l=k[i])&&(!l.hot._selfAccepted||l.hot._selfInvalidated)){if(l.hot._selfDeclined)return{type:"self-declined",chain:c,moduleId:i};if(l.hot._main)return{type:"unaccepted",chain:c,moduleId:i};for(var a=0;a<l.parents.length;a++){var d=l.parents[a],s=k[d];if(s){if(s.hot._declinedDependencies[i])return{type:"declined",chain:c.concat([d]),moduleId:i,parentId:d};-1===n.indexOf(d)&&(s.hot._acceptedDependencies[i]?(r[d]||(r[d]=[]),h(r[d],[i])):(delete r[d],n.push(d),t.push({chain:c.concat([d]),id:d})))}}}}return{type:"accepted",moduleId:e,outdatedModules:n,outdatedDependencies:r}}function h(e,n){for(var r=0;r<n.length;r++){var t=n[r];-1===e.indexOf(t)&&e.push(t)}}I();var w={},m=[],g={},O=function(){console.warn("[HMR] unexpected require("+D.moduleId+") to disposed module")};for(var E in y)if(Object.prototype.hasOwnProperty.call(y,E)){var D;u=j(E),D=y[E]?p(u):{type:"disposed",moduleId:E};var P=!1,x=!1,H=!1,A="";switch(D.chain&&(A="\nUpdate propagation: "+D.chain.join(" -> ")),D.type){case"self-declined":r.onDeclined&&r.onDeclined(D),r.ignoreDeclined||(P=new Error("Aborted because of self decline: "+D.moduleId+A));break;case"declined":r.onDeclined&&r.onDeclined(D),r.ignoreDeclined||(P=new Error("Aborted because of declined dependency: "+D.moduleId+" in "+D.parentId+A));break;case"unaccepted":r.onUnaccepted&&r.onUnaccepted(D),r.ignoreUnaccepted||(P=new Error("Aborted because "+u+" is not accepted"+A));break;case"accepted":r.onAccepted&&r.onAccepted(D),x=!0;break;case"disposed":r.onDisposed&&r.onDisposed(D),H=!0;break;default:throw new Error("Unexception type "+D.type)}if(P)return f("abort"),Promise.reject(P);if(x)for(u in g[u]=y[u],h(m,D.outdatedModules),D.outdatedDependencies)Object.prototype.hasOwnProperty.call(D.outdatedDependencies,u)&&(w[u]||(w[u]=[]),h(w[u],D.outdatedDependencies[u]));H&&(h(m,[D.moduleId]),g[u]=O)}var q,T=[];for(i=0;i<m.length;i++)u=m[i],k[u]&&k[u].hot._selfAccepted&&g[u]!==O&&!k[u].hot._selfInvalidated&&T.push({module:u,parents:k[u].parents.slice(),errorHandler:k[u].hot._selfAccepted});f("dispose"),Object.keys(_).forEach((function(e){!1===_[e]&&function(e){delete S[e]}(e)}));var U,C,L=m.slice();for(;L.length>0;)if(u=L.pop(),l=k[u]){var R={},J=l.hot._disposeHandlers;for(s=0;s<J.length;s++)(t=J[s])(R);for(a[u]=R,l.hot.active=!1,delete k[u],delete w[u],s=0;s<l.children.length;s++){var N=k[l.children[s]];N&&((q=N.parents.indexOf(u))>=0&&N.parents.splice(q,1))}}for(u in w)if(Object.prototype.hasOwnProperty.call(w,u)&&(l=k[u]))for(C=w[u],s=0;s<C.length;s++)U=C[s],(q=l.children.indexOf(U))>=0&&l.children.splice(q,1);f("apply"),void 0!==v&&(c=v,v=void 0);for(u in y=void 0,g)Object.prototype.hasOwnProperty.call(g,u)&&(e[u]=g[u]);var X=null;for(u in w)if(Object.prototype.hasOwnProperty.call(w,u)&&(l=k[u])){C=w[u];var G=[];for(i=0;i<C.length;i++)if(U=C[i],t=l.hot._acceptedDependencies[U]){if(-1!==G.indexOf(t))continue;G.push(t)}for(i=0;i<G.length;i++){t=G[i];try{t(C)}catch(e){r.onErrored&&r.onErrored({type:"accept-errored",moduleId:u,dependencyId:C[i],error:e}),r.ignoreErrored||X||(X=e)}}}for(i=0;i<T.length;i++){var z=T[i];u=z.module,d=z.parents,o=u;try{M(u)}catch(e){if("function"==typeof z.errorHandler)try{z.errorHandler(e)}catch(n){r.onErrored&&r.onErrored({type:"self-accept-error-handler-errored",moduleId:u,error:n,originalError:e}),r.ignoreErrored||X||(X=n),X||(X=e)}else r.onErrored&&r.onErrored({type:"self-accept-errored",moduleId:u,error:e}),r.ignoreErrored||X||(X=e)}}if(X)return f("fail"),Promise.reject(X);if(b)return n(r).then((function(e){return m.forEach((function(n){e.indexOf(n)<0&&e.push(n)})),e}));return f("idle"),new Promise((function(e){e(m)}))}(n=n||{})}function I(){if(b)return y||(y={}),b.forEach(H),b=void 0,!0}function H(n){Object.prototype.hasOwnProperty.call(y,n)||(y[n]=e[n])}var k={},S={1:0},A=[];function M(n){if(k[n])return k[n].exports;var r=k[n]={i:n,l:!1,exports:{},hot:l(n),parents:(s=d,d=[],s),children:[]};return e[n].call(r.exports,r,r.exports,function(e){var n=k[e];if(!n)return M;var r=function(r){return n.hot.active?(k[r]?-1===k[r].parents.indexOf(e)&&k[r].parents.push(e):(d=[e],o=r),-1===n.children.indexOf(r)&&n.children.push(r)):(console.warn("[HMR] unexpected require("+r+") from disposed module "+e),d=[]),M(r)},t=function(e){return{configurable:!0,enumerable:!0,get:function(){return M[e]},set:function(n){M[e]=n}}};for(var i in M)Object.prototype.hasOwnProperty.call(M,i)&&"e"!==i&&"t"!==i&&Object.defineProperty(r,i,t(i));return r.e=function(e){return"ready"===p&&f("prepare"),m++,M.e(e).then(n,(function(e){throw n(),e}));function n(){m--,"prepare"===p&&(g[e]||D(e),0===m&&0===w&&P())}},r.t=function(e,n){return 1&n&&(e=r(e)),M.t(e,-2&n)},r}(n)),r.l=!0,r.exports}M.m=e,M.c=k,M.d=function(e,n,r){M.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},M.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},M.t=function(e,n){if(1&n&&(e=M(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(M.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)M.d(r,t,function(n){return e[n]}.bind(null,t));return r},M.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return M.d(n,"a",n),n},M.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},M.p="/resources/themes/sdlt/dist/img/",M.h=function(){return c};var q=window.webpackJsonp=window.webpackJsonp||[],T=q.push.bind(q);q.push=n,q=q.slice();for(var U=0;U<q.length;U++)n(q[U]);var C=T;A.push([463,0]),r()}({463:function(e,n,r){r(209),e.exports=r(860)},860:function(e,n,r){"use strict";function t(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}r.r(n),function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}var n,r,o;return n=e,o=[{key:"init",value:function(){window.addEventListener("load",(function(e){var n=sessionStorage.getItem("SiteAlertClosed"),r=document.querySelector("#site-alert"),t=document.querySelector("body");r&&("true"!==n&&(r.style.display="flex",t.style.paddingTop=r.offsetHeight+"px"),document.querySelector("#site-alert .close-icon").addEventListener("click",(function(){sessionStorage.setItem("SiteAlertClosed","true"),r.style.display="none",t.style.paddingTop=0})))}))}}],(r=null)&&t(n.prototype,r),o&&t(n,o),e}().init()}});
//# sourceMappingURL=common.bundle.js.map