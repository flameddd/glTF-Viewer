try{self["workbox:core:5.1.3"]&&_()}catch(e){}const e={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},t=t=>[e.prefix,t,e.suffix].filter(e=>e&&e.length>0).join("-"),n=n=>n||t(e.precache),s=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),""),i=(e,...t)=>{let n=e;return t.length>0&&(n+=" :: "+JSON.stringify(t)),n};class c extends Error{constructor(e,t){super(i(e,t)),this.name=e,this.details=t}}const a=new Set;const r=(e,t)=>e.filter(e=>t in e),o=async({request:e,mode:t,plugins:n=[]})=>{const s=r(n,"cacheKeyWillBeUsed");let i=e;for(const e of s)i=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:i}),"string"==typeof i&&(i=new Request(i));return i},l=async({cacheName:e,request:t,event:n,matchOptions:s,plugins:i=[]})=>{const c=await self.caches.open(e),a=await o({plugins:i,request:t,mode:"read"});let r=await c.match(a,s);for(const t of i)if("cachedResponseWillBeUsed"in t){const i=t.cachedResponseWillBeUsed;r=await i.call(t,{cacheName:e,event:n,matchOptions:s,cachedResponse:r,request:a})}return r},f=async({cacheName:e,request:t,response:n,event:i,plugins:f=[],matchOptions:u})=>{const h=await o({plugins:f,request:t,mode:"write"});if(!n)throw new c("cache-put-with-no-response",{url:s(h.url)});const d=await(async({request:e,response:t,event:n,plugins:s=[]})=>{let i=t,c=!1;for(const t of s)if("cacheWillUpdate"in t){c=!0;const s=t.cacheWillUpdate;if(i=await s.call(t,{request:e,response:i,event:n}),!i)break}return c||(i=i&&200===i.status?i:void 0),i||null})({event:i,plugins:f,response:n,request:h});if(!d)return;const w=await self.caches.open(e),p=r(f,"cacheDidUpdate"),g=p.length>0?await l({cacheName:e,matchOptions:u,request:h}):null;try{await w.put(h,d)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of a)await e()}(),e}for(const t of p)await t.cacheDidUpdate.call(t,{cacheName:e,event:i,oldResponse:g,newResponse:d,request:h})},u=async({request:e,fetchOptions:t,event:n,plugins:s=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const i=r(s,"fetchDidFail"),a=i.length>0?e.clone():null;try{for(const t of s)if("requestWillFetch"in t){const s=t.requestWillFetch,i=e.clone();e=await s.call(t,{request:i,event:n})}}catch(e){throw new c("plugin-error-request-will-fetch",{thrownError:e})}const o=e.clone();try{let i;i="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of s)"fetchDidSucceed"in e&&(i=await e.fetchDidSucceed.call(e,{event:n,request:o,response:i}));return i}catch(e){for(const t of i)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:a.clone(),request:o.clone()});throw e}};let h;async function d(e,t){const n=e.clone(),s={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},i=t?t(s):s,c=function(){if(void 0===h){const e=new Response("");if("body"in e)try{new Response(e.body),h=!0}catch(e){h=!1}h=!1}return h}()?n.body:await n.blob();return new Response(c,i)}try{self["workbox:precaching:5.1.3"]&&_()}catch(e){}function w(e){if(!e)throw new c("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:n}=e;if(!n)throw new c("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const s=new URL(n,location.href),i=new URL(n,location.href);return s.searchParams.set("__WB_REVISION__",t),{cacheKey:s.href,url:i.href}}class p{constructor(e){this.t=n(e),this.s=new Map,this.i=new Map,this.o=new Map}addToCacheList(e){const t=[];for(const n of e){"string"==typeof n?t.push(n):n&&void 0===n.revision&&t.push(n.url);const{cacheKey:e,url:s}=w(n),i="string"!=typeof n&&n.revision?"reload":"default";if(this.s.has(s)&&this.s.get(s)!==e)throw new c("add-to-cache-list-conflicting-entries",{firstEntry:this.s.get(s),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.o.has(e)&&this.o.get(e)!==n.integrity)throw new c("add-to-cache-list-conflicting-integrities",{url:s});this.o.set(e,n.integrity)}if(this.s.set(s,e),this.i.set(s,i),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const n=[],s=[],i=await self.caches.open(this.t),c=await i.keys(),a=new Set(c.map(e=>e.url));for(const[e,t]of this.s)a.has(t)?s.push(e):n.push({cacheKey:t,url:e});const r=n.map(({cacheKey:n,url:s})=>{const i=this.o.get(n),c=this.i.get(s);return this.l({cacheKey:n,cacheMode:c,event:e,integrity:i,plugins:t,url:s})});await Promise.all(r);return{updatedURLs:n.map(e=>e.url),notUpdatedURLs:s}}async activate(){const e=await self.caches.open(this.t),t=await e.keys(),n=new Set(this.s.values()),s=[];for(const i of t)n.has(i.url)||(await e.delete(i),s.push(i.url));return{deletedURLs:s}}async l({cacheKey:e,url:t,cacheMode:n,event:s,plugins:i,integrity:a}){const r=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});let o,l=await u({event:s,plugins:i,request:r});for(const e of i||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:s,request:r,response:l}):l.status<400))throw new c("bad-precaching-response",{url:t,status:l.status});l.redirected&&(l=await d(l)),await f({event:s,plugins:i,response:l,request:e===t?r:new Request(e),cacheName:this.t,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.s}getCachedURLs(){return[...this.s.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.s.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n){return(await self.caches.open(this.t)).match(n)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new c("missing-precache-entry",{cacheName:this.t,url:t instanceof Request?t.url:t})}catch(n){if(e)return fetch(t);throw n}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new c("non-precached-url",{url:e});const n=this.createHandler(t),s=new Request(e);return()=>n({request:s})}}let g;const y=()=>(g||(g=new p),g);const v=(e,t)=>{const n=y().getURLsToCacheKeys();for(const s of function*(e,{ignoreURLParametersMatching:t,directoryIndex:n,cleanURLs:s,urlManipulation:i}={}){const c=new URL(e,location.href);c.hash="",yield c.href;const a=function(e,t=[]){for(const n of[...e.searchParams.keys()])t.some(e=>e.test(n))&&e.searchParams.delete(n);return e}(c,t);if(yield a.href,n&&a.pathname.endsWith("/")){const e=new URL(a.href);e.pathname+=n,yield e.href}if(s){const e=new URL(a.href);e.pathname+=".html",yield e.href}if(i){const e=i({url:c});for(const t of e)yield t.href}}(e,t)){const e=n.get(s);if(e)return e}};let R=!1;function m(e){R||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:i}={})=>{const c=n();self.addEventListener("fetch",n=>{const a=v(n.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:i});if(!a)return;let r=self.caches.open(c).then(e=>e.match(a)).then(e=>e||fetch(a));n.respondWith(r)})})(e),R=!0)}const q=[],U={get:()=>q,add(e){q.push(...e)}},L=e=>{const t=y(),n=U.get();e.waitUntil(t.install({event:e,plugins:n}).catch(e=>{throw e}))},b=e=>{const t=y();e.waitUntil(t.activate())};var x;self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),x={},function(e){y().addToCacheList(e),e.length>0&&(self.addEventListener("install",L),self.addEventListener("activate",b))}([{url:"assets/favicon.png",revision:"17dfd6b57818f34bcae2ef29bf6564f4"},{url:"assets/imgs/glTF_Viewer192x192.png",revision:"98115ebe3086533e3679ded6a0f6f5a8"},{url:"assets/imgs/glTF_Viewer512x512.png",revision:"ff6b1a45c3cdfd79deb2bcfa2156b43a"},{url:"bundle.css",revision:"315424a6525d656298feb847ed5ed183"},{url:"bundle.js",revision:"7e70459cbafa057ae3992ce70ae98643"},{url:"favicon.png",revision:"c64beab291de80970aa4887a5a1c9135"},{url:"global.css",revision:"3f0f4c886e9559fcdf46e0482f4cd201"},{url:"index.html",revision:"dd6d4c2299319cfadff24a3f38f9b0c4"},{url:"manifest.json",revision:"bccd0e79a395920dc435ff49451bdd18"}]),m(x),self.addEventListener("activate",e=>{const t=n();e.waitUntil((async(e,t="-precache-")=>{const n=(await self.caches.keys()).filter(n=>n.includes(t)&&n.includes(self.registration.scope)&&n!==e);return await Promise.all(n.map(e=>self.caches.delete(e))),n})(t).then(e=>{}))});
