import{_ as d}from"./PicoStyle.vue_vue_type_script_setup_true_lang.DKhuZFY3.js";import{d as b,h as l,k as w,o as v,b as _,w as h,m as y,t as D,n as F,_ as g,p as c}from"./framework.CTjf6bD_.js";async function S(t,n){await fetch(t,{method:"POST",body:n})}async function x(t,n){try{const e=n.map(a=>S(t,a));await Promise.all(e)}catch(e){throw console.error("An error occurred:",e),e instanceof Error?e:new Error("Something went wrong!")}}const B=["aria-busy","disabled"],k=b({__name:"SubmitButton",props:{webhook:{},formDataArray:{},isIncomplete:{type:Boolean},isBusy:{type:Boolean},text:{}},emits:["success","fail"],setup(t,{emit:n}){const e=t,a=n,o=l(!1),r=l(!1),i=l(!1),u=l(!1);async function f(){try{if(e.isIncomplete)throw u.value=!0,new Error("incomplete");o.value=!0,await x(e.webhook,e.formDataArray),i.value=!0,a("success")}catch(s){console.warn("caught error:",s),a("fail"),r.value=!0}finally{o.value=!1,setTimeout(()=>{i.value=!1,r.value=!1,u.value=!1},1500)}}const p=w(()=>e.text?e.text:u.value?"Please fill out all fields":o.value?"Sending...":r.value?"Failed!":i.value?"Sent!":"Submit");return(s,C)=>(v(),_(d,null,{default:h(()=>[y("button",{"aria-busy":o.value||s.isBusy,class:F({"is-error":r.value,"is-success":i.value}),disabled:o.value||s.isBusy,onClick:f},D(p.value),11,B)]),_:1}))}}),N=g(k,[["__scopeId","data-v-b31b72cf"]]),m=t=>t.replaceAll(/['"[\]{} ]/g,"_");function P(t,n){const e=new File([t],`${m(n)}.md`,{type:"text/plain"}),a=new FormData;return a.append("file",e),a.append("payload_json",JSON.stringify({content:`Category: ${n}`,allowed_mentions:{parse:[]}})),a}function T(t){const n=new FormData;for(let e=0;e<((t==null?void 0:t.length)??0);e++){const a=t==null?void 0:t[e];a&&n.append(`image${e}`,a)}return n}function E({requestType:t,requestText:n,contact:e}){const a=new FormData;return a.append("payload_json",JSON.stringify({allowed_mentions:{parse:[]},embeds:[{title:c(t),fields:[{name:"Message",value:c(n)},{name:"Contact",value:c(e)}]}]})),a}function O(t,n,e){const a=new File([n],`${m(t)}.md`,{type:"text/plain"}),o=new FormData;return o.append("content",a),o.append("image",e),o}export{N as S,T as a,O as b,P as c,E as d,m as e};