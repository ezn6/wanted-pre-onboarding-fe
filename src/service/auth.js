//1. auth
//2. 로컬스토리지 저장
class Auth {
  constructor(tokenStorage, fetchClient) {
    this.tokenStorage = tokenStorage;
    this.fetchClient = fetchClient;
    this.url = process.env.REACT_APP_BASE_URL;
  }

  async signOptions(value, email, password) {
    const data = await this.fetchClient.fetch(`/auth/${value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return data;
  }

  async signUp(value, email, password) {
    return this.signOptions(value, email, password);
  }

  async signIn(value, email, password) {
    const data = await this.signOptions(value, email, password);
    this.tokenStorage.saveToken(data.access_token);
    return data;
  }

  logout() {
    this.tokenStorage.clearToken();
  }
}

export default Auth;
