import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ auth, token }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitBtn, setSubmitBtn] = useState(true);
  const [signup, setSignup] = useState(false);

  // 값들 감지
  const onChange = (event) => {
    const {
      target: { name, value, checked },
    } = event;
    switch (name) {
      case 'password':
        return setPassword(value);
      case 'email':
        return setEmail(value);
      case 'signup':
        return setSignup(checked);
      default:
    }
  };

  // 유효성 검사에 따른 버튼 활성화
  useEffect(() => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (emailRegex.test(email) && password.length >= 8) {
      setSubmitBtn(false);
    } else {
      setSubmitBtn(true);
    }
  }, [email, password]);

  // submit : 회원가입인지 로그인인지 판별
  const onSubmit = async (e) => {
    e.preventDefault();
    if (signup) {
      await auth.signUp(email, password);
    } else {
      await auth.signIn(email, password);
      navigate('/todo');
    }
  };

  // 토큰 있다면 /todos로 리다이렉트
  useEffect(() => {
    if (token.getToken()) {
      navigate('/todo');
    }
  });

  console.log('login.jsx');
  return (
    <form onSubmit={onSubmit}>
      <input
        name='email'
        type='email'
        placeholder='Email'
        value={email}
        onChange={onChange}
      />
      <input
        name='password'
        type='password'
        placeholder='Password'
        value={password}
        onChange={onChange}
      />
      <input
        name='signup'
        id='signup'
        type='checkbox'
        checked={signup}
        onChange={onChange}
      />
      <label htmlFor='signup'> Create a new account?</label>
      <button disabled={submitBtn}>{signup ? 'Sign Up' : 'Sign In'}</button>
    </form>
  );
};

export default Login;
