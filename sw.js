try{self["workbox:core:5.1.3"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.1.3"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}}class i extends n{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}const r=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),"");class o{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const{params:n,route:i}=this.findMatchingRoute({url:s,request:e,event:t});let r,o=i&&i.handler;if(!o&&this.s&&(o=this.s),o){try{r=o.handle({url:s,request:e,event:t,params:n})}catch(e){r=Promise.reject(e)}return r instanceof Promise&&this.i&&(r=r.catch(n=>this.i.handle({url:s,request:e,event:t}))),r}}findMatchingRoute({url:e,request:t,event:s}){const n=this.t.get(t.method)||[];for(const i of n){let n;const r=i.match({url:e,request:t,event:s});if(r)return n=r,(Array.isArray(r)&&0===r.length||r.constructor===Object&&0===Object.keys(r).length||"boolean"==typeof r)&&(n=void 0),{route:i,params:n}}return{}}setDefaultHandler(e){this.s=s(e)}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let c;const a=()=>(c||(c=new o,c.addFetchListener(),c.addCacheListener()),c);const u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},l=e=>[u.prefix,e,u.suffix].filter(e=>e&&e.length>0).join("-"),h=e=>e||l(u.precache),f=e=>e||l(u.runtime),d=new Set;const w=(e,t)=>e.filter(e=>t in e),p=async({request:e,mode:t,plugins:s=[]})=>{const n=w(s,"cacheKeyWillBeUsed");let i=e;for(const e of n)i=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:i}),"string"==typeof i&&(i=new Request(i));return i},g=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:i=[]})=>{const r=await self.caches.open(e),o=await p({plugins:i,request:t,mode:"read"});let c=await r.match(o,n);for(const t of i)if("cachedResponseWillBeUsed"in t){const i=t.cachedResponseWillBeUsed;c=await i.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:c,request:o})}return c},y=async({cacheName:e,request:s,response:n,event:i,plugins:o=[],matchOptions:c})=>{const a=await p({plugins:o,request:s,mode:"write"});if(!n)throw new t("cache-put-with-no-response",{url:r(a.url)});const u=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let i=t,r=!1;for(const t of n)if("cacheWillUpdate"in t){r=!0;const n=t.cacheWillUpdate;if(i=await n.call(t,{request:e,response:i,event:s}),!i)break}return r||(i=i&&200===i.status?i:void 0),i||null})({event:i,plugins:o,response:n,request:a});if(!u)return;const l=await self.caches.open(e),h=w(o,"cacheDidUpdate"),f=h.length>0?await g({cacheName:e,matchOptions:c,request:a}):null;try{await l.put(a,u)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of d)await e()}(),e}for(const t of h)await t.cacheDidUpdate.call(t,{cacheName:e,event:i,oldResponse:f,newResponse:u,request:a})},m=g,v=async({request:e,fetchOptions:s,event:n,plugins:i=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const r=w(i,"fetchDidFail"),o=r.length>0?e.clone():null;try{for(const t of i)if("requestWillFetch"in t){const s=t.requestWillFetch,i=e.clone();e=await s.call(t,{request:i,event:n})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const c=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of i)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:n,request:c,response:t}));return t}catch(e){for(const t of r)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:o.clone(),request:c.clone()});throw e}};try{self["workbox:strategies:5.1.3"]&&_()}catch(e){}const q={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};let R;async function b(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},i=t?t(n):n,r=function(){if(void 0===R){const e=new Response("");if("body"in e)try{new Response(e.body),R=!0}catch(e){R=!1}R=!1}return R}()?s.body:await s.blob();return new Response(r,i)}try{self["workbox:precaching:5.1.3"]&&_()}catch(e){}function U(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const i=new URL(n,location.href),r=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",s),{cacheKey:i.href,url:r.href}}class L{constructor(e){this.o=h(e),this.u=new Map,this.l=new Map,this.h=new Map}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:i}=U(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this.u.has(i)&&this.u.get(i)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.u.get(i),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.h.has(e)&&this.h.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:i});this.h.set(e,n.integrity)}if(this.u.set(i,e),this.l.set(i,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],i=await self.caches.open(this.o),r=await i.keys(),o=new Set(r.map(e=>e.url));for(const[e,t]of this.u)o.has(t)?n.push(e):s.push({cacheKey:t,url:e});const c=s.map(({cacheKey:s,url:n})=>{const i=this.h.get(s),r=this.l.get(n);return this.p({cacheKey:s,cacheMode:r,event:e,integrity:i,plugins:t,url:n})});await Promise.all(c);return{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this.o),t=await e.keys(),s=new Set(this.u.values()),n=[];for(const i of t)s.has(i.url)||(await e.delete(i),n.push(i.url));return{deletedURLs:n}}async p({cacheKey:e,url:s,cacheMode:n,event:i,plugins:r,integrity:o}){const c=new Request(s,{integrity:o,cache:n,credentials:"same-origin"});let a,u=await v({event:i,plugins:r,request:c});for(const e of r||[])"cacheWillUpdate"in e&&(a=e);if(!(a?await a.cacheWillUpdate({event:i,request:c,response:u}):u.status<400))throw new t("bad-precaching-response",{url:s,status:u.status});u.redirected&&(u=await b(u)),await y({event:i,plugins:r,response:u,request:e===s?c:new Request(e),cacheName:this.o,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.u}getCachedURLs(){return[...this.u.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.u.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.o)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.o,url:s instanceof Request?s.url:s})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),i=new Request(e);return()=>n({request:i})}}let x;const N=()=>(x||(x=new L),x);const T=(e,t)=>{const s=N().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:i}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const o=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(r,t);if(yield o.href,s&&o.pathname.endsWith("/")){const e=new URL(o.href);e.pathname+=s,yield e.href}if(n){const e=new URL(o.href);e.pathname+=".html",yield e.href}if(i){const e=i({url:r});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let j=!1;function P(e){j||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const i=h();self.addEventListener("fetch",r=>{const o=T(r.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!o)return;let c=self.caches.open(i).then(e=>e.match(o)).then(e=>e||fetch(o));r.respondWith(c)})})(e),j=!0)}const E=[],M={get:()=>E,add(e){E.push(...e)}},O=e=>{const t=N(),s=M.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},K=e=>{const t=N();e.waitUntil(t.activate())};var C;self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),C={},function(e){N().addToCacheList(e),e.length>0&&(self.addEventListener("install",O),self.addEventListener("activate",K))}([{url:"assets/favicon.png",revision:"17dfd6b57818f34bcae2ef29bf6564f4"},{url:"assets/imgs/Astronaut_thumbnail.jpg",revision:"d33a93d3c6d77ccc5d1f766abc39f96c"},{url:"assets/imgs/Corset_thumbnail.jpg",revision:"f3a8e1cac6c340382e86cb19f376626d"},{url:"assets/imgs/Duck_thumbnail.jpg",revision:"b2e2893d0b2aafd571a10a94453a4a55"},{url:"assets/imgs/glTF_Viewer192x192.png",revision:"98115ebe3086533e3679ded6a0f6f5a8"},{url:"assets/imgs/glTF_Viewer512x512.png",revision:"ff6b1a45c3cdfd79deb2bcfa2156b43a"},{url:"assets/imgs/Horse_thumbnail.jpg",revision:"f3eb8ecd7d48060c6a42295d318484ea"},{url:"assets/imgs/spruit_sunrise.jpg",revision:"26a92dd26f765c9e9750bf4ef918cbaf"},{url:"assets/imgs/whipple_creek_regional_park.jpg",revision:"74c830d311fbb318067f94f155712f4d"},{url:"bundle.css",revision:"311964ed293de1a18e04c125f06b2c18"},{url:"bundle.js",revision:"6dc8345c2f9b1f6ee3dcf638163a3698"},{url:"favicon.png",revision:"c64beab291de80970aa4887a5a1c9135"},{url:"global.css",revision:"3f0f4c886e9559fcdf46e0482f4cd201"},{url:"index.html",revision:"dd6d4c2299319cfadff24a3f38f9b0c4"},{url:"manifest.json",revision:"bccd0e79a395920dc435ff49451bdd18"}]),P(C),self.addEventListener("activate",e=>{const t=h();e.waitUntil((async(e,t="-precache-")=>{const s=(await self.caches.keys()).filter(s=>s.includes(t)&&s.includes(self.registration.scope)&&s!==e);return await Promise.all(s.map(e=>self.caches.delete(e))),s})(t).then(e=>{}))}),function(e,s,r){let o;if("string"==typeof e){const t=new URL(e,location.href);o=new n(({url:e})=>e.href===t.href,s,r)}else if(e instanceof RegExp)o=new i(e,s,r);else if("function"==typeof e)o=new n(e,s,r);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});o=e}a().registerRoute(o)}(/\.(?:png|jpg|jpeg|html|css|js|json)$/,new class{constructor(e={}){if(this.o=f(e.cacheName),e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this.g=t?e.plugins:[q,...e.plugins]}else this.g=[q];this.m=e.networkTimeoutSeconds||0,this.v=e.fetchOptions,this.q=e.matchOptions}async handle({event:e,request:s}){const n=[];"string"==typeof s&&(s=new Request(s));const i=[];let r;if(this.m){const{id:t,promise:o}=this.R({request:s,event:e,logs:n});r=t,i.push(o)}const o=this.U({timeoutId:r,request:s,event:e,logs:n});i.push(o);let c=await Promise.race(i);if(c||(c=await o),!c)throw new t("no-response",{url:s.url});return c}R({request:e,logs:t,event:s}){let n;return{promise:new Promise(t=>{n=setTimeout(async()=>{t(await this.L({request:e,event:s}))},1e3*this.m)}),id:n}}async U({timeoutId:e,request:t,logs:s,event:n}){let i,r;try{r=await v({request:t,event:n,fetchOptions:this.v,plugins:this.g})}catch(e){i=e}if(e&&clearTimeout(e),i||!r)r=await this.L({request:t,event:n});else{const e=r.clone(),s=y({cacheName:this.o,request:t,response:e,event:n,plugins:this.g});if(n)try{n.waitUntil(s)}catch(e){}}return r}L({event:e,request:t}){return m({cacheName:this.o,request:t,event:e,matchOptions:this.q,plugins:this.g})}}({networkTimeoutSeconds:3,plugins:[]}),"GET");
