import{b as k,u as w,j as e,r as f}from"./vendor-544b9a11.js";import{u as b,p as x}from"./index-56f9d259.js";import{L as N,a as P,I as j,B as S,b as h}from"./Button-914e0214.js";import{P as F}from"./PageHead-0272f252.js";import{d as K}from"./debounce-1252dfff.js";function A(){const o=k(),{state:n}=w(),{setUser:t}=b(),m=async()=>{try{const s=await x.collection("user").authWithOAuth2({provider:"kakao"}),{id:r,username:l,email:u,accessToken:i}=s.meta;console.log(s.meta);const c={username:r,nickname:l,email:u,token:i};if(t({userId:r,username:l,email:u,token:i,isKakao:!0}),await x.collection("user").update(s.record.id,c),!n)o("/");else{const{wishLocationPath:a}=n;o(a==="/login"?"/":a,{replace:!0})}}catch(s){throw new Error(s.message)}};return e.jsx(e.Fragment,{children:e.jsx("button",{className:"w-[400px] h-[50px] font-semibold text-black bg-KakaoYellow rounded-md",type:"button",onClick:m,children:"카카오로 로그인"})})}function V(){const o=k(),{state:n}=w(),[t,m]=f.useState({userId:"",password:""}),[s,r]=f.useState("empty"),{setUser:l}=b(),u=async c=>{c.preventDefault();const{userId:a,password:p}=t;try{const d=await x.collection("user").authWithPassword(a,p);r("success");const{nickname:L,email:I,username:y,id:v}=d.record,C=d.token;if(l({userId:y,username:L,email:I,token:C,id:v,isKakao:!1}),!n)o("/");else{const{wishLocationPath:g}=n;o(g==="/login"?"/":g,{replace:!0})}}catch(d){r("fail"),console.log(`로그인 실패
`,d)}},i=K(c=>{const{name:a,value:p}=c.target;m({...t,[a]:p})},400);return e.jsxs(e.Fragment,{children:[e.jsx(F,{title:"Jeju All in One - 로그인"}),e.jsxs(N,{children:[e.jsx(P,{}),e.jsxs("form",{className:"flex flex-col gap-3",onSubmit:u,children:[e.jsx(j,{name:"userId",type:"text",placeholder:"아이디",defaultValue:t.userId,onChange:i}),e.jsx(j,{name:"password",type:"password",placeholder:"비밀번호",defaultValue:t.password,onChange:i}),s==="fail"&&e.jsx("div",{className:"text-center text-red-600 my-2",children:"아이디 혹은 비밀번호를 잘못 입력했습니다."}),e.jsx(S,{type:"submit",txtColor:"white",bgColor:"bg-blue",children:"로그인"}),e.jsx(A,{})]}),e.jsxs("div",{className:"m-8",children:[e.jsx(h,{link:"/findid",children:"아이디 찾기"})," | ",e.jsx(h,{link:"/findpw",children:"비밀번호 찾기"})]}),e.jsxs("p",{children:["아직 회원이 아니신가요? ",e.jsx(h,{link:"/join",className:"font-extrabold text-blue",children:"회원가입 하기"})]})]})]})}export{V as default};
