import{ag as E}from"./entry.x_za3h5z.js";const z="memory",$=()=>{const n=new Map;return{name:z,options:{},hasItem(t){return n.has(t)},getItem(t){return n.get(t)??null},getItemRaw(t){return n.get(t)??null},setItem(t,u){n.set(t,u)},setItemRaw(t,u){n.set(t,u)},removeItem(t){n.delete(t)},getKeys(){return Array.from(n.keys())},clear(){n.clear()},dispose(){n.clear()}}};function Y(n){return!n||typeof n.then!="function"?Promise.resolve(n):n}function c(n,...t){try{return Y(n(...t))}catch(u){return Promise.reject(u)}}function P(n){const t=typeof n;return n===null||t!=="object"&&t!=="function"}function U(n){const t=Object.getPrototypeOf(n);return!t||t.isPrototypeOf(Object)}function A(n){if(P(n))return String(n);if(U(n)||Array.isArray(n))return JSON.stringify(n);if(typeof n.toJSON=="function")return A(n.toJSON());throw new Error("[unstorage] Cannot stringify value!")}function j(){if(typeof Buffer===void 0)throw new TypeError("[unstorage] Buffer is not supported!")}const K="base64:";function W(n){if(typeof n=="string")return n;j();const t=Buffer.from(n).toString("base64");return K+t}function D(n){return typeof n!="string"||!n.startsWith(K)?n:(j(),Buffer.from(n.slice(K.length),"base64"))}const N=["hasItem","getItem","getItemRaw","setItem","setItemRaw","removeItem","getMeta","setMeta","removeMeta","getKeys","clear","mount","unmount"];function x(n,t){if(t=w(t),!t)return n;const u={...n};for(const h of N)u[h]=(m="",...d)=>n[h](t+m,...d);return u.getKeys=(h="",...m)=>n.getKeys(t+h,...m).then(d=>d.map(f=>f.slice(t.length))),u}function l(n){return n?n.split("?")[0].replace(/[/\\]/g,":").replace(/:+/g,":").replace(/^:|:$/g,""):""}function B(...n){return l(n.join(":"))}function w(n){return n=l(n),n?n+":":""}const L="memory",J=()=>{const n=new Map;return{name:L,options:{},hasItem(t){return n.has(t)},getItem(t){return n.get(t)??null},getItemRaw(t){return n.get(t)??null},setItem(t,u){n.set(t,u)},setItemRaw(t,u){n.set(t,u)},removeItem(t){n.delete(t)},getKeys(){return Array.from(n.keys())},clear(){n.clear()},dispose(){n.clear()}}};function G(n={}){const t={mounts:{"":n.driver||J()},mountpoints:[""],watching:!1,watchListeners:[],unwatch:{}},u=e=>{for(const r of t.mountpoints)if(e.startsWith(r))return{base:r,relativeKey:e.slice(r.length),driver:t.mounts[r]};return{base:"",relativeKey:e,driver:t.mounts[""]}},h=(e,r)=>t.mountpoints.filter(i=>i.startsWith(e)||r&&e.startsWith(i)).map(i=>({relativeBase:e.length>i.length?e.slice(i.length):void 0,mountpoint:i,driver:t.mounts[i]})),m=(e,r)=>{if(t.watching){r=l(r);for(const i of t.watchListeners)i(e,r)}},d=async()=>{if(!t.watching){t.watching=!0;for(const e in t.mounts)t.unwatch[e]=await M(t.mounts[e],m,e)}},f=async()=>{if(t.watching){for(const e in t.unwatch)await t.unwatch[e]();t.unwatch={},t.watching=!1}},v=(e,r,i)=>{const a=new Map,o=s=>{let g=a.get(s.base);return g||(g={driver:s.driver,base:s.base,items:[]},a.set(s.base,g)),g};for(const s of e){const g=typeof s=="string",I=l(g?s:s.key),p=g?void 0:s.value,O=g||!s.options?r:{...r,...s.options},S=u(I);o(S).items.push({key:I,value:p,relativeKey:S.relativeKey,options:O})}return Promise.all([...a.values()].map(s=>i(s))).then(s=>s.flat())},y={hasItem(e,r={}){e=l(e);const{relativeKey:i,driver:a}=u(e);return c(a.hasItem,i,r)},getItem(e,r={}){e=l(e);const{relativeKey:i,driver:a}=u(e);return c(a.getItem,i,r).then(o=>E(o))},getItems(e,r){return v(e,r,i=>i.driver.getItems?c(i.driver.getItems,i.items.map(a=>({key:a.relativeKey,options:a.options})),r).then(a=>a.map(o=>({key:B(i.base,o.key),value:E(o.value)}))):Promise.all(i.items.map(a=>c(i.driver.getItem,a.relativeKey,a.options).then(o=>({key:a.key,value:E(o)})))))},getItemRaw(e,r={}){e=l(e);const{relativeKey:i,driver:a}=u(e);return a.getItemRaw?c(a.getItemRaw,i,r):c(a.getItem,i,r).then(o=>D(o))},async setItem(e,r,i={}){if(r===void 0)return y.removeItem(e);e=l(e);const{relativeKey:a,driver:o}=u(e);o.setItem&&(await c(o.setItem,a,A(r),i),o.watch||m("update",e))},async setItems(e,r){await v(e,r,async i=>{i.driver.setItems&&await c(i.driver.setItems,i.items.map(a=>({key:a.relativeKey,value:A(a.value),options:a.options})),r),i.driver.setItem&&await Promise.all(i.items.map(a=>c(i.driver.setItem,a.relativeKey,A(a.value),a.options)))})},async setItemRaw(e,r,i={}){if(r===void 0)return y.removeItem(e,i);e=l(e);const{relativeKey:a,driver:o}=u(e);if(o.setItemRaw)await c(o.setItemRaw,a,r,i);else if(o.setItem)await c(o.setItem,a,W(r),i);else return;o.watch||m("update",e)},async removeItem(e,r={}){typeof r=="boolean"&&(r={removeMeta:r}),e=l(e);const{relativeKey:i,driver:a}=u(e);a.removeItem&&(await c(a.removeItem,i,r),(r.removeMeta||r.removeMata)&&await c(a.removeItem,i+"$",r),a.watch||m("remove",e))},async getMeta(e,r={}){typeof r=="boolean"&&(r={nativeOnly:r}),e=l(e);const{relativeKey:i,driver:a}=u(e),o=Object.create(null);if(a.getMeta&&Object.assign(o,await c(a.getMeta,i,r)),!r.nativeOnly){const s=await c(a.getItem,i+"$",r).then(g=>E(g));s&&typeof s=="object"&&(typeof s.atime=="string"&&(s.atime=new Date(s.atime)),typeof s.mtime=="string"&&(s.mtime=new Date(s.mtime)),Object.assign(o,s))}return o},setMeta(e,r,i={}){return this.setItem(e+"$",r,i)},removeMeta(e,r={}){return this.removeItem(e+"$",r)},async getKeys(e,r={}){e=w(e);const i=h(e,!0);let a=[];const o=[];for(const s of i){const I=(await c(s.driver.getKeys,s.relativeBase,r)).map(p=>s.mountpoint+l(p)).filter(p=>!a.some(O=>p.startsWith(O)));o.push(...I),a=[s.mountpoint,...a.filter(p=>!p.startsWith(s.mountpoint))]}return e?o.filter(s=>s.startsWith(e)&&!s.endsWith("$")):o.filter(s=>!s.endsWith("$"))},async clear(e,r={}){e=w(e),await Promise.all(h(e,!1).map(async i=>{if(i.driver.clear)return c(i.driver.clear,i.relativeBase,r);if(i.driver.removeItem){const a=await i.driver.getKeys(i.relativeBase||"",r);return Promise.all(a.map(o=>i.driver.removeItem(o,r)))}}))},async dispose(){await Promise.all(Object.values(t.mounts).map(e=>R(e)))},async watch(e){return await d(),t.watchListeners.push(e),async()=>{t.watchListeners=t.watchListeners.filter(r=>r!==e),t.watchListeners.length===0&&await f()}},async unwatch(){t.watchListeners=[],await f()},mount(e,r){if(e=w(e),e&&t.mounts[e])throw new Error(`already mounted at ${e}`);return e&&(t.mountpoints.push(e),t.mountpoints.sort((i,a)=>a.length-i.length)),t.mounts[e]=r,t.watching&&Promise.resolve(M(r,m,e)).then(i=>{t.unwatch[e]=i}).catch(console.error),y},async unmount(e,r=!0){e=w(e),!(!e||!t.mounts[e])&&(t.watching&&e in t.unwatch&&(t.unwatch[e](),delete t.unwatch[e]),r&&await R(t.mounts[e]),t.mountpoints=t.mountpoints.filter(i=>i!==e),delete t.mounts[e])},getMount(e=""){e=l(e)+":";const r=u(e);return{driver:r.driver,base:r.base}},getMounts(e="",r={}){return e=l(e),h(e,r.parents).map(a=>({driver:a.driver,base:a.mountpoint}))}};return y}function M(n,t,u){return n.watch?n.watch((h,m)=>t(h,u+m)):()=>{}}async function R(n){typeof n.dispose=="function"&&await c(n.dispose)}var T=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},C={exports:{}};(function(n,t){(function(u,h,m){n.exports=m(),n.exports.default=m()})("slugify",T,function(){var u=JSON.parse(`{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","Ə":"E","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","ə":"e","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","Ա":"A","Բ":"B","Գ":"G","Դ":"D","Ե":"E","Զ":"Z","Է":"E'","Ը":"Y'","Թ":"T'","Ժ":"JH","Ի":"I","Լ":"L","Խ":"X","Ծ":"C'","Կ":"K","Հ":"H","Ձ":"D'","Ղ":"GH","Ճ":"TW","Մ":"M","Յ":"Y","Ն":"N","Շ":"SH","Չ":"CH","Պ":"P","Ջ":"J","Ռ":"R'","Ս":"S","Վ":"V","Տ":"T","Ր":"R","Ց":"C","Փ":"P'","Ք":"Q'","Օ":"O''","Ֆ":"F","և":"EV","ء":"a","آ":"aa","أ":"a","ؤ":"u","إ":"i","ئ":"e","ا":"a","ب":"b","ة":"h","ت":"t","ث":"th","ج":"j","ح":"h","خ":"kh","د":"d","ذ":"th","ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"dh","ط":"t","ظ":"z","ع":"a","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"w","ى":"a","ي":"y","ً":"an","ٌ":"on","ٍ":"en","َ":"a","ُ":"u","ِ":"e","ْ":"","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","پ":"p","چ":"ch","ژ":"zh","ک":"k","گ":"g","ی":"y","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ṣ":"S","ṣ":"s","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","–":"-","‘":"'","’":"'","“":"\\"","”":"\\"","„":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial","ﻵ":"laa","ﻷ":"laa","ﻹ":"lai","ﻻ":"la"}`),h=JSON.parse('{"bg":{"Й":"Y","Ц":"Ts","Щ":"Sht","Ъ":"A","Ь":"Y","й":"y","ц":"ts","щ":"sht","ъ":"a","ь":"y"},"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue","ß":"ss","%":"prozent","&":"und","|":"oder","∑":"summe","∞":"unendlich","♥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","¢":"centavos","£":"libras","¤":"moneda","₣":"francos","∑":"suma","∞":"infinito","♥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","¢":"centime","£":"livre","¤":"devise","₣":"franc","∑":"somme","∞":"infini","♥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","¢":"centavo","∑":"soma","£":"libra","∞":"infinito","♥":"amor"},"uk":{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"},"vi":{"Đ":"D","đ":"d"},"da":{"Ø":"OE","ø":"oe","Å":"AA","å":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"større end"},"nb":{"&":"og","Å":"AA","Æ":"AE","Ø":"OE","å":"aa","æ":"ae","ø":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","Å":"AA","Ä":"AE","Ö":"OE","å":"aa","ä":"ae","ö":"oe"}}');function m(d,f){if(typeof d!="string")throw new Error("slugify: string argument expected");f=typeof f=="string"?{replacement:f}:f||{};var v=h[f.locale]||{},y=f.replacement===void 0?"-":f.replacement,e=f.trim===void 0?!0:f.trim,r=d.normalize().split("").reduce(function(i,a){var o=v[a];return o===void 0&&(o=u[a]),o===void 0&&(o=a),o===y&&(o=" "),i+o.replace(f.remove||/[^\w\s$*_+~.()'"!\-:@]+/g,"")},"");return f.strict&&(r=r.replace(/[^A-Za-z0-9\s]/g,"")),e&&(r=r.trim()),r=r.replace(/\s+/g,y),f.lower&&(r=r.toLowerCase()),r}return m.extend=function(d){Object.assign(u,d)},m})})(C);export{G as c,$ as m,x as p};
