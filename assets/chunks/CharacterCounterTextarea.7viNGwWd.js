import{d as c,al as i,am as p,h as r,o as h,c as v,a4 as l,a5 as x,j as n,n as _,k as g,ad as f,t as C,F as w,_ as S}from"./framework.5nJcpXOx.js";import{m as d,h as V}from"./createFormData.RLJxoQIz.js";const M=["id","maxlength"],k=c({__name:"CharacterCounterTextarea",props:i({textareaId:{}},{modelValue:{type:String},modelModifiers:{}}),emits:["update:modelValue"],setup(u){const a=p(u,"modelValue"),t=r(()=>{var e;return d-(((e=a.value)==null?void 0:e.length)??0)}),s=r(()=>t.value<=V);return(e,o)=>(h(),v(w,null,[l(n("textarea",{"onUpdate:modelValue":o[0]||(o[0]=m=>a.value=m),class:_({"display-warning":s.value}),id:e.textareaId,maxlength:g(d)},null,10,M),[[x,a.value]]),l(n("div",{class:"counter"},C(t.value)+" characters left ",513),[[f,s.value]])],64))}}),I=S(k,[["__scopeId","data-v-44929302"]]);export{I as C};