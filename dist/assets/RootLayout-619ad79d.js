import{j as e,a as m,l as f,u,r as h,N as o,O as p}from"./vendor-87dae68f.js";import{u as b}from"./index-dddebd04.js";function n({menu:l,logout:a}){return e.jsx(e.Fragment,{children:e.jsx("li",{onClick:a,className:"py-3 cursor-pointer text-base text-center leading-8 hover:text-darkblue hover:border-b-[3px] hover:border-darkblue",children:l})})}n.propTypes={menu:m.string.isRequired,logout:m.func};var j={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(l){(function(){var a={}.hasOwnProperty;function i(){for(var r=[],d=0;d<arguments.length;d++){var s=arguments[d];if(s){var c=typeof s;if(c==="string"||c==="number")r.push(s);else if(Array.isArray(s)){if(s.length){var t=i.apply(null,s);t&&r.push(t)}}else if(c==="object"){if(s.toString!==Object.prototype.toString&&!s.toString.toString().includes("[native code]")){r.push(s.toString());continue}for(var x in s)a.call(s,x)&&s[x]&&r.push(x)}}}return r.join(" ")}l.exports?(i.default=i,l.exports=i):window.classNames=i})()})(j);var g=j.exports;const v=f(g);function N(){const{pathname:l}=u(),[a,i]=h.useState(""),[r,d]=h.useState(!1),{user:s,logout:c}=b();h.useEffect(()=>i(l==="/"?"bg-white/50":"bg-white/90"),[l]);const t=({isActive:x})=>({fontWeight:x?"bold":"",borderBottom:x?"3px solid #013F4E":""});return e.jsxs("header",{className:`${a} fixed z-10 h-20 w-full mx-auto`,children:[e.jsxs("nav",{className:"flex items-center h-20 justify-between space-x-4 px-8",children:[e.jsx("h1",{children:e.jsxs(o,{to:"/",className:"flex items-center",children:[e.jsx("img",{src:"https://frontendschool6.github.io/finalize-react-6/logo.png",alt:"로고",className:"w-24"}),e.jsx("span",{className:"sr-only",children:"Jeju - All in One"})]})}),e.jsxs("ul",{className:"hidden mobile:flex mobile:items-center px-4 mx-auto font-semibold font-heading space-x-12 text-gray-600",children:[e.jsx(o,{to:"content/list",style:t,className:"hover:font-bold",children:e.jsx(n,{menu:"🍊 우리 제주"})}),e.jsx(o,{to:"content/create",style:t,className:"hover:font-bold",children:e.jsx(n,{menu:"🏝️ 나만의 제주"})}),e.jsx(o,{to:"weather",style:t,className:"hover:font-bold",children:e.jsx(n,{menu:"🌦️ 제주 날씨"})}),e.jsx(o,{to:"traffic",style:t,className:"hover:font-bold",children:e.jsx(n,{menu:"🚙 제주 교통"})})]}),e.jsx("ul",{className:"hidden mobile:flex items-center space-x-4 font-semibold text-blue",children:s&&s.token?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"font-bold text-gray-600",children:[s.username," 님"]}),e.jsx(o,{to:`profile/${s.id}`,style:t,children:e.jsx(n,{menu:"프로필"})}),e.jsx(n,{menu:"로그아웃",logout:c})]}):e.jsxs(e.Fragment,{children:[e.jsx(o,{to:"login",style:t,children:e.jsx(n,{menu:"로그인"})}),e.jsx(o,{to:"join",style:t,children:e.jsx(n,{menu:"회원가입"})})]})}),e.jsx("div",{className:"mobile:hidden flex items-center",href:"#",children:e.jsx("button",{onClick:()=>d(!r),children:r?e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-8 w-8",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})}):e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-8 w-8",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h16"})})})})]}),e.jsx("div",{className:v("mobile:hidden",{hidden:!r}),children:e.jsxs("ul",{className:`${a} mobile:flex justify-center bg-slate-100 font-semibold font-heading list-none text-gray-600`,children:[e.jsxs("li",{className:`text-center text-lg py-3 text-darkblue font-bold ${s.token?"block":"hidden"}`,children:[s.username,"님 어서오세요!"]}),e.jsx(o,{to:"content/list",style:t,className:"hover:font-bold",children:e.jsx(n,{menu:"🍊 우리 제주"})}),e.jsx(o,{to:"content/create",style:t,className:"hover:font-bold",children:e.jsx(n,{menu:"🏝️ 나만의 제주"})}),e.jsx(o,{to:"weather",style:t,className:"hover:font-bold",children:e.jsx(n,{menu:"🌦️ 제주 날씨"})}),e.jsx(o,{to:"traffic",style:t,className:"hover:font-bold",children:e.jsx(n,{menu:"🚙 제주 교통"})}),s&&s.token?e.jsxs(e.Fragment,{children:[e.jsx(o,{to:`profile/${s.id}`,style:t,children:e.jsx(n,{menu:"프로필"})}),e.jsx(n,{menu:"로그아웃",logout:c})]}):e.jsxs(e.Fragment,{children:[e.jsx(o,{to:"login",style:t,children:e.jsx(n,{menu:"로그인"})}),e.jsx(o,{to:"join",style:t,children:e.jsx(n,{menu:"회원가입"})})]})]})})]})}function y(){return e.jsx("footer",{className:"w-full h-[150px] flex flex-row items-center px-5 justify-center bg-darkblue",children:e.jsx("p",{className:"text-sand",children:"Copyright 2023 🥫 hotsix"})})}function w(){const{pathname:l}=u();return h.useEffect(()=>{window.scrollTo(0,0)},[l]),null}function S(){const{pathname:l}=u();return e.jsxs(e.Fragment,{children:[e.jsx(N,{}),e.jsxs("main",{className:l!=="/"?"py-28 ":"",children:[e.jsx(p,{}),e.jsx(w,{})]}),e.jsx(y,{})]})}export{S as default};
