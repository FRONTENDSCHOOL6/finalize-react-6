import{r as t,j as e,a as C,P as M,n as J,b as K,L as U,_ as S}from"./vendor-544b9a11.js";import{p as v,u as _}from"./index-56f9d259.js";import{P as z}from"./PageHead-0272f252.js";import{d as B}from"./debounce-1252dfff.js";import{g as G}from"./getPbImageURL-68fee321.js";const{kakao:i}=window;function T({address:s="제주특별자치도 제주시 공항로 2",location:a="제주국제공항"}){return t.useEffect(()=>{var o=document.getElementById("map"),d={center:new i.maps.LatLng(33.450701,126.570667),level:3},l=new i.maps.Map(o,d),u=new i.maps.services.Geocoder;u.addressSearch(s,function(m,b){if(b===i.maps.services.Status.OK){var c=new i.maps.LatLng(m[0].y,m[0].x),f=new i.maps.Marker({map:l,position:c}),g=new i.maps.InfoWindow({content:`<div style="width:150px;text-align:center;padding:6px 0;">${a}</div>`});g.open(l,f),l.setCenter(c)}})},[s,a]),e.jsx(e.Fragment,{children:e.jsx("article",{id:"map",className:"h-96 mx-[15%] my-10"})})}T.propTypes={address:C.string,location:C.string};const H="/finalize-react-6/assets/more-5d1bd5d3.svg";function V({writer:s="작성자",comment:a="댓글입니다"}){return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"shadow-comment w-full h-fit flex justify-between gap-4 py-3 px-4",children:[e.jsx("span",{children:"⭐"}),e.jsx("div",{className:"text-darkblue font-semibold",children:s}),e.jsx("p",{className:"grow text-start",children:a}),e.jsx("button",{className:"",children:e.jsx("img",{src:H,alt:"more"})})]})})}function k({contentId:s}){const[a,o]=t.useState(),[d,l]=t.useState(),u=t.useRef(""),m=localStorage.getItem("user"),c=JSON.parse(m).state.user.userId,f=async()=>(await v.collection("user").getList(1,50,{filter:`(username = '${c}')`})).items[0].id,g=B(x=>{o(x.target.value)},500),j=async x=>{x.preventDefault();const n=await f();l(n);try{const h={star:!0,comment:a,contentId:s,userId:n};if(!c){alert("로그인 후 이용 가능합니다.");return}const w=await v.collection("comment").create(h);console.log("성공"),o(""),u.current.value=""}catch(h){console.error(h)}};return e.jsx(e.Fragment,{children:e.jsxs("form",{onSubmit:j,className:"grow w-full flex",children:[e.jsxs("div",{className:"flex-grow mr-2",children:[e.jsx("label",{htmlFor:"comment",className:"sr-only",children:"댓글"}),e.jsx("input",{type:"text",id:"comment",name:"comment",ref:u,defaultValue:a,placeholder:"별과 함께 이 제주에 대한 마음을 입력해주세요.",onChange:g,required:!0,className:"w-full py-3 px-4 border-2 rounded-md border-lightblue focus:outline-none focus:border-blue"})]}),e.jsx("button",{type:"submit",className:"min-w-fit px-4 py-3 bg-lightblue hover:bg-blue border-2 text-white font-bold border-lightsand rounded-md",children:"⭐ 마음 등록"})]})})}k.propTypes={contentId:M.string.isRequired};function te(){const{id:s}=J(),a=K(),{user:o}=_(),[d,l]=t.useState(),[u,m]=t.useState(),[b,c]=t.useState(),[f,g]=t.useState(),[j,x]=t.useState(),[n,h]=t.useState([]),[w,L]=t.useState(),[N,q]=t.useState(),I=t.useRef(null),[W,O]=t.useState();t.useEffect(()=>{async function r(){try{const p=await v.collection("content").getOne(s,{expand:"commentId,commentId.userId,userId"},{requestKey:"string"}),{title:R,content:E,tag:F,customTag:$,expand:y,location:A,address:D}=p;c(G(p,"photo")),m(E),g(F),l(R),L(A),q(D),x($),O(s),y&&h(y.commentId),y&&(I.current=y.userId.username)}catch(p){console.error(p)}}r()},[s]);const P=async()=>{S.custom(r=>e.jsx("div",{className:`${r.visible?"animate-enter":"animate-leave"} max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`,children:e.jsxs("div",{className:"w-full flex flex-col p-5 text-center gap-10",children:[e.jsx("p",{className:"font-semibold text-lg mt-4",children:"게시물을 삭제하시겠습니까 ?"}),e.jsxs("div",{className:"flex justify-center items-center gap-5",children:[e.jsx("button",{onClick:async()=>{try{await v.collection("content").delete(s),S.remove(r.id),a("/content/list")}catch(p){console.error(p)}},className:"bg-lightblue focus:bg-blue text-center text-white rounded-lg px-4 py-3 leading-none",children:"삭제"}),e.jsx("button",{onClick:()=>S.remove(r.id),className:"bg-lightblue focus:bg-blue text-center text-white rounded-lg px-4 py-3 leading-none",children:"취소"})]})]})}),{duration:1/0})};return e.jsxs(e.Fragment,{children:[e.jsx(z,{title:"Jeju All in One - 나만의 제주"}),e.jsxs("section",{className:"shadow-content mt-5 mb-20 px-20 py-20 gap-5 flex flex-col items-center mx-[15%] min-h-full rounded-md",children:[e.jsx("h2",{className:"sr-only",children:d}),e.jsx("article",{className:"min-w-[400px] ",children:e.jsx("img",{src:b,alt:d,className:"w-full h-full object-cover"})}),e.jsxs("article",{className:"w-full py-2 px-4 rounded-md border border-gray-500",children:[e.jsxs("p",{className:"pb-2 font-bold flex justify-between",children:[d,e.jsxs("span",{className:"font-light",children:["#",f," ",j&&`#${j}`]})]}),u]}),I.current!==null&&I.current===(o==null?void 0:o.userId)&&e.jsxs("div",{className:"flex gap-2",children:[e.jsx(U,{to:`/content/edit/${s}`,children:e.jsx("button",{className:"bg-blue text-white py-2 px-4 rounded-lg",children:"수정"})}),e.jsx("button",{className:"bg-blue text-white py-2 px-4 rounded-lg",onClick:P,children:"삭제"})]})]}),e.jsx("hr",{className:"hr h-2 border-2"}),e.jsxs("section",{className:"py-20 flex flex-col justify-center text-center items-center mx-auto min-h-full max-w-[1200px]",children:[e.jsx("div",{className:"w-full flex flex-row gap-4 justify-between items-center px-[15%]",children:e.jsx(k,{contentId:s})}),(n==null?void 0:n.length)!==0&&e.jsx("div",{className:"w-full flex flex-col pt-10 px-[15%]",children:n==null?void 0:n.map(r=>e.jsx(V,{writer:r.expand.userId.nickname,comment:r.comment},r.id))})]}),e.jsx("hr",{}),e.jsx(T,{address:N&&N!=="null"?N:"제주특별자치도 제주시 공항로 2",location:w&&w!=="null"?w:"제주국제공항"})]})}export{te as default};
