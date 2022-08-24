# Todo list

- 프로젝트의 실행 방법 : `yarn start`
- 데모 영상 : https://drive.google.com/file/d/14BdZcVQ11TlMCBc_1xuDJfXufk7IAtLv/view?usp=sharing
- 사용한 툴 :
  - Create React App
  - React Router
  - PostCSS

---

### 로그인 화면

- 이메일조건 : @ 이 포함
- 비밀번호 8자리 이상
- 위조건이 모두 만족될때만 제출버튼 활성화
- 네트워크 로직 만들기
- 토큰값 가져오는 방법 : fetch실행 이후 바로 response를 가져오면 여러 응답들 목록이 나오고, response를 json()처리 한 후 보면 토큰값이 보인다.
  - 요청 보낼때 body에 `JSON.stringify()` 해주는 이유와, response를 `response.json()` 해주는 이유 :
    - Content-Type : api 연동시에 보내는 자원을 명시하기 위해
    - application/json : RESTFul API사용, request가 json
    - body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함 → `JSON.stringify()`
       메서드는 JavaScript 값이나 객체를 JSON 문자열로 변환한다.
    - `response.json()` : JSON 응답을 네이티브 JavaScript 객체로 파싱
- 응답받은 JWT는 로컬스토리지 저장
- 로컬스토리지란? : 데이터를 ‘브라우저’에 반영구적으로 저장하고, 브라우저를 종료후 다시 시작해도 데이터가 남아있다. 개발자도구-Application-Local Storage에서 확인할수 있다.
  - 웹 스토리지 객체(web storage object)인 `localStorage`와 `sessionStorage`는 브라우저 내에 키-값 쌍을 저장할 수 있게 한다. 쿠키와 다르게 웹 스토리지 객체는 네트워크 요청 시 서버로 전송되지 않는다.
  - 참고 : [https://ko.javascript.info/localstorage](https://ko.javascript.info/localstorage)
- 회원가입인지 로그인인지 따지기 → url과 수행하는 함수가 달라지기 때문에
- 회원가입,로그인 로직이 모두 프로미스 이므로 login.jsx에서 onSubmit함수 내부에서 함수를 불러올때 async-await
- 로그아웃 → clearToken
- 로그인 API 호출하고 올바른 응답시 `/todo` 경로로 이동 (with react router)
- 200번대가 아닌 응답이라면 에러처리 하기

---

### 투두 화면

- 로컬 스토리지에 토큰이 있는 상태로 `/` 페이지에 접속한다면 `/todo` 경로로 리다이렉트
- 로컬 스토리지에 토큰이 없는 상태로 `/todo`페이지에 접속한다면 `/` 경로로 리다이렉트
- `/todo`경로에 접속하면 투두 리스트의 목록을 볼 수 있도록 하기
- 투두 리스트는 useEffect로 가져와 state에 저장한다.
- 리스트 페이지에는 투두 리스트의 내용과 완료 여부가 표시
- 리스트 페이지에는 입력창과 추가 버튼이 있고, 추가 버튼을 누르면 입력창의 내용이 새로운 투두 리스트로 추가되도록
- 추가 항목이 바로 반영되려면? → 추가 버튼을 누르는 submit 함수에서 create을 한 뒤, getTodos함수도 그다음에 바로 불러준다.
- 투두 리스트의 수정, 삭제 기능을 구현
  - 투두 리스트의 개별 아이템 우측에 수정버튼이 존재하고 해당 버튼을 누르면 수정모드가 활성화되고 투두 리스트의 내용을 수정할 수 있도록 한다.
  - 수정모드에서는 개별 아이템의 우측에 제출버튼과 취소버튼이 표시되며 해당 버튼을 통해서 수정 내용을 제출하거나 수정을 취소할 수 있도록 한다.
  - 투두 리스트의 개별 아이템 우측에 삭제버튼이 존재하고 해당 버튼을 누르면 투두 리스트가 삭제되도록 한다.
  - deleteTodo 함수 에서는 return data를 하지 않는다. 즉 data인 res.json()을 하게되면 에러가 생긴다.
