import{d as i,s as p,h as a,y as d,o as m,c as _,j as h,_ as b}from"./framework.5nJcpXOx.js";const f={class:"youtube"},w=["src","title"],y=i({__name:"YouTube",props:{src:{}},setup(c){const n=c,s=p(""),o=a(()=>{try{const e=new URL(n.src),l=new URLSearchParams(e.search).get("v"),u=e.pathname.split("/").filter(Boolean).at(-1);return l??u??""}catch{return""}}),r=a(()=>`https://www.youtube.com/embed/${o.value}`);return d(async()=>{const t=await(await fetch(`https://www.youtube.com/oembed?url=https://youtu.be/${o.value}`)).json();t&&typeof t=="object"&&"title"in t&&typeof t.title=="string"&&(s.value=t.title)}),(e,t)=>(m(),_("div",f,[h("iframe",{src:r.value,title:s.value,loading:"lazy",allowfullscreen:""},null,8,w)]))}}),j=b(y,[["__scopeId","data-v-b8d242bb"]]);export{j as Y};