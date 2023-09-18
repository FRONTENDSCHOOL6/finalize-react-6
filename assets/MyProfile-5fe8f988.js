import{j as e,a as j,r as c,m as C,L as y}from"./vendor-3895efa4.js";import{u as b,p as q}from"./index-45914327.js";import{P as A}from"./PageHead-886db70f.js";import{g as P}from"./getPbImageURL-68fee321.js";import{T as S}from"./TitleButton-ef057cee.js";import{C as $}from"./ContentItem-724966f9.js";function f({src:n,alt:o,comment:l,date:a}){return e.jsx(e.Fragment,{children:e.jsxs("li",{className:"flex justify-between items-center mb-2",children:[e.jsx("img",{src:n,alt:o,className:"w-12 min-w-12"}),e.jsx("p",{className:"w-20 text-center",children:"⭐"}),e.jsx("p",{className:"w-4/5 overflow-hidden text-ellipsis whitespace-nowrap",children:l}),e.jsx("time",{className:"w-1/6 text-end overflow-hidden text-ellipsis whitespace-nowrap",children:a})]})})}f.propTypes={src:j.string,alt:j.string,comment:j.string,date:j.string};async function E(n){let o="";return o=`?sort=${n.sort}&filter=${n.filter}&expand=contentId&page=${n.page}&perPage=${n.perPage}`,await(await fetch(`https://react-mission.pockethost.io/api/collections/${n.collection}/records${o}`)).json()}function F({showMore:n,setShowMore:o}){var x,p,g,h;const{user:l}=b(),[a,w]=c.useState("comment"),[r,i]=c.useState(1),[m,u]=c.useState(9),[d,k]=c.useState("-created"),{isLoading:N,data:t,isError:I,error:T}=C({queryKey:["comment",d,l,r,m,a],queryFn:()=>E({sort:d,filter:`userId='${l.id}'`,page:r,perPage:m,collection:a}),keepPreviousData:!0});return e.jsxs("section",{className:"mx-10 mb-12",children:[e.jsx(S,{title:"나의 제주의 별",link:"#",count:(x=t==null?void 0:t.items)==null?void 0:x.length,section:"댓글",onClick:()=>o(!n),showMore:n}),e.jsx("hr",{}),e.jsxs("ul",{className:"w-11/12 mx-auto my-10",children:[((p=t==null?void 0:t.items)==null?void 0:p.length)===0&&e.jsx(e.Fragment,{children:e.jsx(y,{to:"/content",children:e.jsx(f,{src:"/jejuImage5.jpg",alt:"제주 바다",date:"2023-09-06",comment:"제주를 향한 당신의 별을 우리에게 나누어주세요"})})}),!n&&((g=t==null?void 0:t.items)==null?void 0:g.slice(0,5).map(s=>e.jsx(y,{to:`/content/${s.contentId}`,children:e.jsx(f,{src:P(s.expand.contentId,"photo"),alt:s.title,date:s.created.split(" ")[0],comment:s.comment})},s.id))),n&&((h=t==null?void 0:t.items)==null?void 0:h.map(s=>e.jsx(y,{to:`/content/${s.contentId}`,children:e.jsx(f,{src:P(s.expand.contentId,"photo"),alt:s.title,date:s.created.split(" ")[0],comment:s.comment})},s.id)))]}),n&&e.jsxs("section",{className:"flex justify-center gap-5 my-10",children:[e.jsx("button",{onClick:()=>{i(s=>Math.max(s-1,0)),window.scrollTo(0,0)},disabled:r===1,className:"disabled:font-extralight font-bold",children:"<"}),e.jsxs("span",{children:[`${r}`,t.totalPages!==1&&t.totalPages!==0&&` / ${t.totalPages}`]}),e.jsx("button",{onClick:()=>{i(s=>s+1),window.scrollTo(0,0)},disabled:r===t.totalPages||t.totalPages===0,className:"disabled:font-extralight font-bold",children:">"})]})]})}async function L(n){let o="";return o=`?sort=${n.sort}&filter=${n.filter}&page=${n.page}&perPage=${n.perPage}`,await(await fetch(`https://react-mission.pockethost.io/api/collections/${n.collection}/records${o}`)).json()}function v({showMore:n,setShowMore:o}){var x,p,g,h;const{user:l}=b(),[a,w]=c.useState("content"),[r,i]=c.useState(1),[m,u]=c.useState(9),[d,k]=c.useState("-created"),{isLoading:N,data:t,isError:I,error:T}=C({queryKey:["contents",d,l,r,m,a],queryFn:()=>L({sort:d,filter:`userId='${l.id}'`,page:r,perPage:m,collection:a}),keepPreviousData:!0});return e.jsxs("section",{className:"mx-10 pt-10",children:[e.jsx(S,{title:"나의 제주",link:"#",count:(x=t==null?void 0:t.items)==null?void 0:x.length,section:"게시글",onClick:()=>o(!n),showMore:n}),e.jsx("hr",{}),e.jsxs("ul",{className:"my-10 w-11/12 mx-auto contentContainer",children:[((p=t==null?void 0:t.items)==null?void 0:p.length)===0&&e.jsx($,{}),!n&&((g=t==null?void 0:t.items)==null?void 0:g.slice(0,3).map(s=>e.jsx($,{content:s.id,title:s.title,count:s.commentId.length,src:P(s,"photo")},s.id))),n&&((h=t==null?void 0:t.items)==null?void 0:h.map(s=>e.jsx($,{content:s.id,title:s.title,count:s.commentId.length,src:P(s,"photo")},s.id)))]}),n&&e.jsxs("section",{className:"flex justify-center gap-5 my-10",children:[e.jsx("button",{onClick:()=>{i(s=>Math.max(s-1,0)),window.scrollTo(0,0)},disabled:r===1,className:"disabled:font-extralight font-bold",children:"<"}),e.jsxs("span",{children:[`${r}`,t.totalPages!==1&&t.totalPages!==0&&` / ${t.totalPages}`]}),e.jsx("button",{onClick:()=>{i(s=>s+1),window.scrollTo(0,0)},disabled:r===t.totalPages||t.totalPages===0,className:"disabled:font-extralight font-bold",children:">"})]})]})}function J(){const{user:n}=b(),[o,l]=c.useState(""),[a,w]=c.useState(!1),[r,i]=c.useState(!1);return c.useEffect(()=>{async function m(){try{const u=await q.collection("user").getOne(n.id),{nickname:d}=u;l(d)}catch(u){console.error(u)}}m()},[n.id]),e.jsxs(e.Fragment,{children:[e.jsx(A,{title:"Jeju All in One - 내 프로필"}),e.jsxs("section",{className:"pt-10 font-bold text-lg text-center",children:[o," 님 환영합니다."]}),e.jsx(v,{showMore:a,setShowMore:w}),e.jsx(F,{showMore:r,setShowMore:i})]})}export{J as default};
