//영문 3자리 이상 20 미만 아이디 정규식
export function idReg(text){
  const reg = /^[a-z]+[a-z0-9]{2,19}$/g;;
  return reg.test(String(text).toLowerCase())
}

//특수문자포함 최소 8자이상~16자이하 비밀번호정규식
export function pwReg(text){
  const reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-]).{8,16}$/;
  return reg.test(String(text).toLowerCase());
}
