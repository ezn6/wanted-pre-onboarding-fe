//1. auth
//2. 로컬스토리지 저장
class Auth {
  constructor(tokenStorage) {
    this.tokenStorage = tokenStorage;
    this.url = process.env.REACT_APP_BASE_URL;
  }

  async signUp(email, password) {
    const res = await fetch(`${this.url}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status > 299 || res.status < 200) {
      alert(`${data.message}`);
      throw new Error(`${data.message}`);
    }
    console.log(data);
    this.tokenStorage.saveToken(data.access_token);
  }

  async signIn(email, password) {
    const res = await fetch(`${this.url}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    // .then((response) => response.json())
    // .then((response) => console.log(response));

    const data = await res.json();
    if (res.status > 299 || res.status < 200) {
      alert(`${data.message}`);
      throw new Error(`${data.message}`);
    }
    console.log(data);
    console.log(res);
    this.tokenStorage.saveToken(data.access_token);
  }

  logout() {
    this.tokenStorage.clearToken();
  }
}

export default Auth;
