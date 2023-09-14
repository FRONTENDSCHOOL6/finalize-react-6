//영문 3자리 이상 20 미만 아이디 정규식
export function idReg(text){
  const reg = /^[a-z]+[a-z0-9]{2,19}$/g;;
  return reg.test(String(text).toLowerCase())
}

//특수문자포함 최소 8자이상~16자이하 비밀번호정규식
export function pwReg(text){
  const reg = /^(?=.*[a-zA-Z])(?=.*[,~!@#$%^*+=-]).{8,16}$/;
  return reg.test(String(text).toLowerCase());
}

//이메일 형식 검증 정규식
export function emailReg(text) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase());
}