import{a as p,S as y,i as l}from"./assets/vendor-C4-ZuMk8.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const i of e.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function n(t){if(t.ep)return;t.ep=!0;const e=a(t);fetch(t.href,e)}})();const h="https://pixabay.com/api/",w="46857118-7428ce3c72e98dd3525ce7abc",L=15;async function b(r,s=1){const a={key:w,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:L,page:s},t=(await p.get(h,{params:a})).data;if(t.hits.length===0)throw new Error("Sorry, there are no images matching your search query. Please try again!");return t.hits.map(e=>({webformatURL:e.webformatURL,largeImageURL:e.largeImageURL,tags:e.tags,likes:e.likes,views:e.views,comments:e.comments,downloads:e.downloads}))}let d;const v=({webformatURL:r,largeImageURL:s,tags:a,likes:n,views:t,comments:e,downloads:i})=>`<li class="image-card">
        <a href="${s}">
        <img src="${r}" alt="${a}">
        </a>
        <div class="image-info">
                <span> Likes: ${n}</span>
                <span> Comments: ${e}</span>
                <span> Views: ${t}</span>
                <span> Downloads: ${i}</span>
</div>
        </li>`,E=(r,s)=>{r.insertAdjacentHTML("beforeend",s.map(a=>v(a)).join("")),d?d.refresh():d=new y(".gallery a")},P=document.querySelector(".search-form"),q=document.querySelector(".loader"),u=document.querySelector(".gallery"),o=document.querySelector(".btn-load");let m="",c=1,g=15;P.addEventListener("submit",r=>{if(r.preventDefault(),m=r.currentTarget.elements.searchRequest.value.trim(),!m){l.warning({title:"Warning",message:"Please enter a valid search term.",position:"topRight"});return}c=1,u.innerHTML="",o.style.display="none",f()});const f=async()=>{try{q.style.display="none";const r=await b(m,c);if(r.length===0){l.info({message:"Sorry, there are no images matching your search query."}),o.style.display="none";return}E(u,r),c+=1,r.length<g||c>Math.ceil(r.totalHits/g)?(o.style.display="none",l.info({message:"We are sorry, but you have reached the end of search results."})):o.style.display="block"}catch(r){o.style.display="none",l.error({title:"Error",message:r.message})}};o.addEventListener("click",async()=>{await f();const r=u.lastElementChild.getBoundingClientRect().height;window.scrollBy({left:0,top:r*2,behavior:"smooth"})});
//# sourceMappingURL=index.js.map
