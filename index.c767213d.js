function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},a={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in a){var t=a[e];delete a[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){a[e]=t},t.parcelRequired7c6=r);var o=r("kJc72"),l=r("NIOgM"),i=r("lkrYr"),c=r("fb9GJ");l=r("NIOgM"),o=r("kJc72");let s,d;function u(t,n,a){s=t.page,d=t.total_pages;let r=5;window.screen.width>=768&&(r=9);const i=document.getElementById("tui-pagination-container"),u={totalItems:d,itemsPerPage:20,visiblePages:r,page:s,centerAlign:!0,template:{page:'<a href="#" class="page-btn">{{page}}</a>',currentPage:'<a href="#" class="page-btn is-selected">{{page}}</a>',moveButton:'<a href="#" class="page-btn page-{{type}}"></a>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip" id="point-{{type}}"><span class="tui-ico-ellip">...</span></a>'}},p=new(e(c))(i,u);document.querySelector(".page-last").textContent=Math.round(d/20),p.on("afterMove",(e=>{const t=e.page;if("TRENDING"===n?(0,l.fetchData)("TRENDING",{page:t}).then((e=>{(0,o.onRenderGallery)(e.data.results)})):"SEARCH_MOVIES"===n&&(0,l.fetchData)("SEARCH_MOVIES",{page:t,query:a}).then((e=>{(0,o.onRenderGallery)(e.data.results)})),e.page>1){document.querySelector(".page-first").textContent="1"}}))}const p=async e=>{document.querySelector(".film-selection").innerHTML=i.loading;const t=await(0,l.fetchData)(l.TRENDING,{page:1});(0,o.onRenderGallery)(t.data.results),u(t.data,"TRENDING")},f=document.querySelector(".header__form");document.querySelector(".header-logo__link").addEventListener("click",(()=>{p(),f.reset()})),document.querySelector("[data-home]").addEventListener("click",(()=>{p(),f.reset()})),p();o=r("kJc72"),l=r("NIOgM"),i=r("lkrYr");(()=>{const e=document.querySelector(".header__form");let t;const n=document.querySelector(".header-error__text");e.addEventListener("submit",(async function(e){e.preventDefault(),n.textContent="";const{searchQuery:a}=e.currentTarget;if(t===a.value)return;const r=document.querySelector(".film-selection");t=a.value;const c=await(0,l.fetchData)(l.SEARCH_MOVIES,{page:1,query:t});if(0===c.data.results.length)return void(n.textContent="There is no films with such name. Please, try again.");r.innerHTML=i.loading,(0,o.onRenderGallery)(c.data.results),u(c.data,"SEARCH_MOVIES",t)}))})(),r("dBD8k"),r("kGSd4"),r("iThid"),r("9t81w"),r("60Tue");
//# sourceMappingURL=index.c767213d.js.map
