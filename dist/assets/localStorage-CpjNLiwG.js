import{r as e}from"./main-BY9beTCi.js";function t({lineWidth:e=80,lineHeight:t=3,reverse:n=!1,shift:r=0,rotate:i=0}){return`
    <div class="figure1" style="width: calc(${e}px + 15px); transform: translateX(${r}px) rotate(${i}deg);">
      <div class="figure1__line" style="order:${n?1:2}; width:${e}px; height:${t}px;"></div>
      <div class="figure1__square" style="order:${n?2:1};"></div>
    </div>
  `}function n(e,t){return`<button class="card" type="button" aria-label="Memory card, face down" data-card-name="${t.split(`/`).pop()?.replace(/\.[^.]+$/,``).replace(/[-_]/g,` `)??`symbol`}">
          <img class="card__front" src="${e}" alt="" aria-hidden="true" />
          <img class="card__back" src="${t}" alt="" aria-hidden="true" />
                </button>`}var r=e((()=>{}));function i(e,t){localStorage.setItem(e,JSON.stringify(t))}function a(e){let t=localStorage.getItem(e);return t===null?void 0:JSON.parse(t)}var o=e((()=>{}));export{t as a,n as i,o as n,r as o,i as r,a as t};