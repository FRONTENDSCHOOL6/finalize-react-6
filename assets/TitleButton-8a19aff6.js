import{j as s,L as a,a as t}from"./vendor-d0eccd61.js";function c({title:o,link:i,count:r=1,section:n,onClick:l,showMore:p}){let e=0;return n==="게시글"&&(e=3),n==="댓글"&&(e=5),s.jsxs("div",{className:"flex justify-between mb-2",children:[s.jsx("h2",{className:"text-lg font-bold",children:o}),r>e&&s.jsx("button",{type:"button",onClick:l,children:s.jsx(a,{to:i,children:p?"줄여보기":"더보기"})})]})}c.propTypes={title:t.string,link:t.string,count:t.number,section:t.string,onClick:t.func,showMore:t.bool};export{c as T};