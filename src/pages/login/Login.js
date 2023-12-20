import React, { useState } from "react";
import { postUserLogin } from "../../api/user/userloginapi";
import { useNavigate } from "react-router-dom";
import {
  IdForm,
  LoginButton,
  LoginContent,
  LoginError,
  LoginBt,
  LoginForm,
  LoginLabel,
  LoginLogo,
  LoginWrapper,
  PasswordForm,
  SigninButton,
} from "../../styles/diarystyles/login/loginstyle";

const Login = () => {
  const navigate = useNavigate();
  const [uid, setUid] = useState("");
  const [upw, setUpw] = useState("");
  const [errorMg, setErrorMg] = useState("");

  const handleChangeUid = e => {
    setUid(e.target.value);
  };

  const handleChangeUpw = e => {
    setUpw(e.target.value);
  };

  // 비밀번호 형식 조건 (특수문자 포함, 4~8자)
  const usersPassword = upw => {
    const passwordRegex = /^(?=.*[!@#$%^&*()])(?=.{4,8}$)/;
    return passwordRegex.test(upw);
  };

  // 비밀번호 조건 (아이디 공백 금지)
  const handleClickLogin = () => {
    if (uid === "") {
      setErrorMg("아이디는 필수 입력 사항입니다.");
      return false;
    }

    // 비밀번호 조건 (비밀번호 공백 금지)
    if (upw === "") {
      setErrorMg("비밀번호는 필수 입력 사항입니다.");
      return false;
    }

    if (usersPassword(upw) === false) {
      setErrorMg("비밀번호는 특수문자 포함, 4~8자여야 합니다.");
      return false;
    }

    // 서버로 로그인 유저 정보 전달
    postUserLogin({ uid, upw }, successFN, failFN);
  };

  const successFN = () => {
    console.log("로그인 성공!");
    // 메인페이지 이동
    navigate("/");
  };

  const failFN = () => {
    console.log("서버 에러");
  };

  return (
    <LoginWrapper>
      <LoginContent>
        <LoginLogo>
          <img src={`${process.env.PUBLIC_URL}/images/logo.svg`}></img>
        </LoginLogo>
        <LoginForm>
          <div>
            <IdForm>
              <LoginLabel>ID</LoginLabel>
              <input
                type="text"
                name="id"
                value={uid}
                onChange={e => {
                  handleChangeUid(e);
                }}
              />
            </IdForm>
            <PasswordForm>
              <LoginLabel>PASSWORD</LoginLabel>
              <input
                type="password"
                name="password"
                value={upw}
                onChange={e => {
                  handleChangeUpw(e);
                }}
              ></input>
            </PasswordForm>
          </div>
        </LoginForm>
        <LoginError>{errorMg}</LoginError>
        <LoginBt>
          <LoginButton
            onClick={() => {
              handleClickLogin();
            }}
          >
            로그인
          </LoginButton>
          <SigninButton>회원가입</SigninButton>
        </LoginBt>
      </LoginContent>
    </LoginWrapper>
  );
};

export default Login;
